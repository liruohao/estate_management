<comment>
    # 组件注释
</comment>
<template>
    <div class="People">
      <div>
        <Breadcrumb class="bread">
          <BreadcrumbItem>主页</BreadcrumbItem>
          <BreadcrumbItem>品质管理管理</BreadcrumbItem>
          <BreadcrumbItem>投诉管理</BreadcrumbItem>
        </Breadcrumb>
      </div>
    </div>
</template>

<script>
export default {
  name: 'People',
  components: {},
  data () {
    return {}
  },
  props: {},
  watch: {},
  methods: {},
  computed: {},
  mounted () {
  }
}
</script>

<style scoped>
    .People {
      width: 100%;
      height: 100%;
      background: #FFFFFF;
    }
    .bread{
      border: 1px solid #C9C9CA;
      border-radius: 10px;
      padding: 8px;
      padding-left: 2%;
      background-color: #F8F8F9;
      margin: 10px;
    }
</style>
