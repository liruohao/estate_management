<template>
  <div>
    <Affix :offset-top="0">
      <header  class="layout">
        <Row style="height: 65px;">
          <Col span="2">
            <img class="imgstyle"  src="../../../assets/logo-2.png"/>
          </Col>
          <Col span="1" offset="19" style="margin-top: 17px;">
            <Dropdown offset="7">
              <Button size="small" style="height: 120%" type="default" ghost>
                <Badge :dot="count">
                  <a href="#">
                    <Icon type="ios-notifications-outline" style="color: #FFFFFF" size="26"></Icon>
                  </a>
                </Badge>
              </Button>
              <DropdownMenu slot="list">
                <DropdownItem >
                  <MenuItem name="1-1" to="/customer">客户关系管理</MenuItem>
                </DropdownItem>
                <DropdownItem>
                  <MenuItem name="1-1" to="/verify">物料管理</MenuItem>
                  </DropdownItem>
                <DropdownItem>
                  <MenuItem name="1-1" to="/charge">人力资源管理</MenuItem>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Col>
          <Col span="1">
            <Dropdown offset="7">
              <Button type="default" ghost style="margin-top: 17px;width: 90%;">
                <Icon type="ios-contact"  style="color: #FFFFFF;font-size: large;margin-left: -5px;right: auto"/>
              </Button>
              <DropdownMenu slot="list">
                <DropdownItem >
                  <MenuItem name="1-1" to="/">退出</MenuItem>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Col>
          <Col span="1">
            <Tooltip content="版本信息" theme="light">
              <Button type="default" ghost style="margin-top: 17px;margin-left: 3%" @click="drawer=true">
                <Icon type="md-more" style="color: #FFFFFF"/>
              </Button>
            </Tooltip>

          </Col>
        </Row>
      </header>
    </Affix>
    <!--抽屉-->
    <Drawer title="版本信息" :closable="false" v-model="drawer">
      <p>当前版本：iViewAdmin-v1.2.1 pro</p>
      <p>基于框架：iView-3.x</p>
      <p class="include">关于版权</p>
      <hr style="border: 0;height: 1px;margin: 0 -7%" color="#E7F5E6" />
      <div class="bgContent">
        <div>
          iViewAdmin 受国家计算机软件著作权保护（登记号：xxxxxxxxxxxxxxx），必须经官网授权才可获得源文件使用权。不得恶意分享产品、二次转售等，违者将承担相应的法律责任。
        </div>
        <div>
          详见：《iView 付费产品服务条款》
        </div>
      </div>
      <div>
        © 2018 iView.com 版权所有
      </div>
    </Drawer>
  </div>
</template>

<script>
  export default {
    name: 'sidebar',
    data(){
      return{
        count:true,
        drawer:false
      }
    }
  }
</script>

<style scoped>
  .layout{
    margin-bottom: -0.2%;
    background-color: #5eb2ff;
    box-shadow:0 3px 10px rgba(0,0,0,.28);
  }
  .imgstyle{
    /*margin-left:2%;*/
    height:57px;
  }
  p{
    margin: 3% 0;
  }
  .include{
    margin-top: 25px;
    font-weight:bold;
  }
  .bgContent{
    background-color: #e4e9e4;
    padding: 3%;
    margin-top: 5%;
    color: #6a6a6a;
  }
  .hrCss{
    color: #f0feef;
  }
</style>
