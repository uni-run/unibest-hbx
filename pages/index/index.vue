<template>
  <view class="content">
    <image class="logo" src="/static/logo.png"></image>
    <view class="text-area">
      <text class="title">{{ title }}</text>
    </view>
    <button type="primary" @click="gotoPage('pinia')" class="mt-4">pinia 页面</button>
    <button type="primary" @click="gotoPage('unocss')" class="mt-4">unocss 页面</button>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const title = ref('Hello')

const gotoPage = (path: string) => {
  wx.navigateTo({
    url: `/pages/demo/${path}`,
  })
}
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  width: 200rpx;
  height: 200rpx;
  margin: 200rpx auto 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
