<template xmlns="BackTop">
  <div>
    <!--返回顶端-->
    <BackTop :height="100" :bottom="40">
      <div class="top">返回顶端</div>
    </BackTop>
  </div>
</template>

<script>
  export default {
    name: 'tooLbar'
  }
</script>

<style scoped>
  .top{
    padding: 10px;
    background: rgba(0, 153, 229, .7);
    color: #fff;
    text-align: center;
    border-radius: 2px;
  }
</style>
