import path from 'node:path'
import dayjs from 'dayjs'
import { defineConfig, loadEnv } from 'vite'
import Uni from '@dcloudio/vite-plugin-uni'
// @see https://uni-helper.js.org/vite-plugin-uni-pages
import UniPages from '@uni-helper/vite-plugin-uni-pages'
// @see https://uni-helper.js.org/vite-plugin-uni-layouts
import UniLayouts from '@uni-helper/vite-plugin-uni-layouts'
// @see https://github.com/uni-helper/vite-plugin-uni-platform
// 需要与 @uni-helper/vite-plugin-uni-pages 插件一起使用
// import UniPlatform from '@uni-helper/vite-plugin-uni-platform'
// @see https://github.com/uni-helper/vite-plugin-uni-manifest
import UniManifest from '@uni-helper/vite-plugin-uni-manifest'
// @see https://unocss.dev/
import UnoCSS from 'unocss/vite'
// import autoprefixer from 'autoprefixer'
import AutoImport from 'unplugin-auto-import/vite'
// import viteCompression from 'vite-plugin-compression'
import ViteRestart from 'vite-plugin-restart'

// https://vitejs.dev/config/
export default ({ command, mode }) => {
  // console.log(mode === process.env.NODE_ENV) // true

  // mode: 区分生产环境还是开发环境
  console.log('command, mode -> ', command, mode)
  // dev 和 build 命令可以分别使用 .env.development 和 .env.production 的环境变量

  // process.env.VITE_ROOT_DIR: 获取当前文件的目录跟地址
  // loadEnv(): 返回当前环境env文件中额外定义的变量
  const env = loadEnv(mode, path.resolve(process.env.VITE_ROOT_DIR, 'env'))
  const { VITE_ROOT_DIR, VITE_APP_PORT, VITE_DELETE_CONSOLE, VITE_SHOW_SOURCEMAP } = env
  console.log('环境变量 env -> ', env)
  const { UNI_PLATFORM } = process.env
  console.log('UNI_PLATFORM -> ', UNI_PLATFORM) // 得到 mp-weixin, h5, app 等

  return defineConfig({
    // root: VITE_ROOT_DIR,
    envDir: './env', // 自定义env目录
    plugins: [
      UniPages({
        dts: path.join(VITE_ROOT_DIR, 'types/uni-pages.d.ts'),
        homePage: 'pages/index/index', // 设置默认路由入口
        dir: 'pages', // 主目录
        subPackages: ['pages-sub'], // 子目录，是个数组，可以配置多个，但是不能为pages里面的目录
        outDir: './',
        exclude: ['**/components/**/**.*'],
        routeBlockLang: 'json5', // 虽然设了默认值，但是vue文件还是要加上 lang="json5", 这样才能很好地格式化
      }),
      UniLayouts({
        layoutDir: 'layouts',
        layout: '',
        cwd: VITE_ROOT_DIR,
      }),
      // UniPlatform(),
      UniManifest(),
      // UniXXX 需要在 Uni 之前引入
      Uni(),
      UnoCSS(),
      AutoImport({
        imports: ['vue', 'uni-app'],
        dts: 'types/auto-import.d.ts',
        dirs: ['hooks'], // 自动导入 hooks
        eslintrc: { enabled: true },
        vueTemplate: true, // default false
      }),

      // viteCompression(),
      ViteRestart({
        // 通过这个插件，在修改vite.config.js文件则不需要重新运行也生效配置
        restart: ['vite.config.js'],
      }),
      // h5环境增加编译时间
      UNI_PLATFORM === 'h5' && {
        name: 'html-transform',
        transformIndexHtml(html) {
          return html.replace('%BUILD_DATE%', dayjs().format('YYYY-MM-DD HH:mm:ss'))
        },
      },
    ],
    define: {
      __UNI_PLATFORM__: JSON.stringify(UNI_PLATFORM),
    },
    css: {
      postcss: {
        plugins: [
          // autoprefixer({
          //   // 指定目标浏览器
          //   overrideBrowserslist: ['> 1%', 'last 2 versions'],
          // }),
        ],
      },
    },

    resolve: {
      alias: {
        '@': path.join(VITE_ROOT_DIR, ''),
      },
    },
    server: {
      host: '0.0.0.0',
      hmr: true,
      port: Number.parseInt(VITE_APP_PORT, 10),
    },
    build: {
      // 方便非h5端调试
      sourcemap: VITE_SHOW_SOURCEMAP === 'true', // 默认是false
      target: 'es6',
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: VITE_DELETE_CONSOLE === 'true',
          drop_debugger: true,
        },
      },
    },
  })
}
