<template xmlns="Icon">
  <!--theme="dark" :style="{minHeight: '100vh'}"-->
  <div class="layout">
    <Layout class="navColor" :style="{minHeight: '100vh'}">
      <Sider collapsible :collapsed-width="78" v-model="isCollapsed">
        <Menu  theme="dark" width="auto" :class="menuitemClasses" accordion>
          <Submenu name="1">
            <template slot="title">
              <Icon type="logo-buffer"></Icon> 品质管理
            </template>
            <MenuItem name="1-1" to="/customer">客户关系管理</MenuItem>
            <MenuItem name="1-2" to="/equipment">设备管理</MenuItem>
            <MenuItem name="1-3" to="/inspection">巡检中心</MenuItem>
            <MenuItem name="1-4" to="/center">投诉管理</MenuItem>
          </Submenu>
          <Submenu name="2">
            <template slot="title">
              <Icon type="ios-grid"></Icon> 成本综合管理
            </template>
            <MenuItem name="2-1" to="/people">人力资源管理</MenuItem>
            <MenuItem name="2-2" to="/verify">物料管理</MenuItem>
            <MenuItem name="2-3" to="/materiel">能耗管理</MenuItem>
            <!--<MenuItem name="2-4" to="/subcontract">分包管理</MenuItem>-->
          </Submenu>
          <Submenu name="3">
            <template slot="title">
              <Icon type="logo-yen"></Icon> 收入管理
            </template>
            <MenuItem name="3-1" to="/charge">收费管理</MenuItem>
            <MenuItem name="3-2" to="/stop">停车管理</MenuItem>
            <!--<MenuItem name="3-3" to="/lease">租赁管理</MenuItem>-->
            <MenuItem name="3-4" to="/contract">合同管理</MenuItem>
          </Submenu>
          <Submenu name="4">
            <template slot="title">
              <Icon type="md-information-circle"></Icon> 小区公告管理
            </template>
            <MenuItem name="4-1" to="/staff">物业在职员工公告 </MenuItem>
            <MenuItem name="4-2" to="/owner">小区业主公告</MenuItem>
          </Submenu>
          <Submenu name="5">
            <template slot="title">
              <Icon type="md-contact" /> 个人信息
            </template>
            <MenuItem name="5-1" to="/people2">个人中心 </MenuItem>
            <MenuItem name="5-2" to="/Password">修改密码 </MenuItem>
          </Submenu>
        </Menu>
      </Sider>
      <Layout style="width: 1500px">
        <router-view style="color: white"></router-view>
      </Layout>
    </Layout>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isCollapsed: false
    }
  },
  methods: {
    info (nodesc) {
      this.$Notice.info({
        title: '消息',
        desc: nodesc ? '' : '推荐使用谷歌浏览器或IE11浏览器！'
      })
    }
  },
  computed: {
    menuitemClasses: function () {
      return [
        'menu-item',
        this.isCollapsed ? 'collapsed-menu' : ''
      ]
    }
  },
  mounted () {
    this.info()
  }
}
</script>

<style scoped>
  .menu-item span{
    display: inline-block;
    overflow: hidden;
    width: 69px;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
    transition: width .2s ease .2s;
  }
  .menu-item i{
    transform: translateX(0px);
    transition: font-size .2s ease, transform .2s ease;
    vertical-align: middle;
    font-size: 16px;
  }
  .collapsed-menu span{
    width: 0px;
    transition: width .2s ease;
  }
  .collapsed-menu i{
    transform: translateX(5px);
    transition: font-size .2s ease .2s, transform .2s ease .2s;
    vertical-align: middle;
    font-size: 22px;
  }
  .layout{
    width: 100%;
    z-index: -1;
    color: white;
    position:absolute;
    padding-top: 0.5%;
  }
  /*.navColor{*/
    /*background-color: blue;*/

  /*}*/
</style>
