<template>
  <div id="app">
    <h1>头条练习</h1>
    <!-- 路由匹配展示视图 -->

    <router-view />

    <!-- 图标 -->
    <i class="iconfont icon-shipin"></i>
    <van-cell-group inset>
      <van-cell title="单元格" value="内容" />
      <van-cell title="单元格" value="内容" label="描述信息" />
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>
<style lang="scss">
</style>
