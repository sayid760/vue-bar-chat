<template>
  <div id="app" >
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less" >
@import './assets/css/reset.css'; 
@import './assets/css/icon.css'; 
@import './assets/css/base.less'; 
#app {
  font-family: "helvetica neue",arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
}

</style>
