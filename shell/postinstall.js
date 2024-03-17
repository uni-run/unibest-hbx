/**
 * 本文件会在依赖包安装时执行，用以生成 `src/manifest.json`
 * 如果不存在 `src/manifest.json` 会运行报错，提示找不到 `src/manifest.json`
 * 如果中途自己删除了 'src/manifest.json' 文件，记得手动执行本文件，可以右键 `Run Code` 快速执行
 *
 * 本文件是为了兼容 window 系统才生成的
 */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs')

const filePath = './manifest.json'

if (fs.existsSync(filePath)) {
  // console.log(`${filePath}存在`)
} else {
  // console.log(`${filePath}不存在，需要创建`)
  fs.writeFile(filePath, '{"vueVersion": "3"}\n', {}, () => {
    // console.log(`${filePath}已经成功创建，并写入{}`)
  })
}

const filePath2 = './pages.json'
if (fs.existsSync(filePath2)) {
  // console.log(`${filePath}存在`)
} else {
  // console.log(`${filePath}不存在，需要创建`)
  fs.writeFile(
    filePath2,
    `{
  "pages": [
    {
      "path": "pages/index/index",
      "type": "home",
      "style": {
        "navigationStyle": "custom",
        "navigationBarTitleText": "首页"
      }
    }
  ]
}\n`,
    {},
    () => {
      // console.log(`${filePath}已经成功创建，并写入{}`)
    },
  )
}
