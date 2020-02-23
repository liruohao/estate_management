<template>
  <div class="bglogin">
      <div>
        <div class="titleStyle">
          sunshine物业管理系统
        </div>
        <div class="btnlogin">
          <div>
            <Input prefix="ios-contact" placeholder="账号" type="text" name="username" v-model="formInline.username" style="width: 300px;color: blue;margin-top: 1%;" />
          </div>
          <div style="margin:0px auto">
            <Input id="passw" prefix="ios-lock" type="password" name="password" @keydown.enter.native="search($event)" v-model="formInline.password" placeholder="密码" style="width: 300px;margin-top: 1%;margin: 5% 0;" />
          </div>
          <div>
            <Button type="info"  id="yanzheng" @click="btnLoginClick" style="width: 300px;margin-top: 1%;align-content: center ;">登录</Button>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formInline: {
        username: '',
        password: ''
      }
    }
  },
  mounted () {

  },
  methods: {
    btnLoginClick () {
      if (this.formInline.username === '') {
        return this.$Message.warning('账号不能为空')
      }
      if (this.formInline.password === '') {
        return this.$Message.warning('密码不能为空')
      }
      this.$http.get('user/login', {
        account: this.formInline.username,
        password: this.formInline.password
      }, res => {
        if (res.code === 1000) {
          this.$router.push({
            name: 'Customer'
          })
          res.data.passwd = ''
          res.data.passwdCheck = ''
          sessionStorage.setItem('user', JSON.stringify(res.data))
        } else {
          this.$Message.warning(res.message)
        }
      })
    },
    search (ev) {
      this.btnLoginClick()
    },
    checkUser (uList) {
      var that = this
      return uList.filter(function (item) {
        return item.username === that.formInline.username && item.password === that.formInline.password
      }).length > 0
    }
    // btnLoginClick:function(){
    //   var url="http://192.168.3.24:8083/login";
    //   var _self=this;
    //   $.get(url,function(data){
    //     _self.data=eval("(" + data +")");
    //   })
    // }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .bglogin {
    background-image:url("../assets/login.jpg");
    background-repeat: no-repeat;
    margin: 0 auto 0;
    background-size: 100%;
    height: 101%;
    width: 101%;
    margin: -8px;
    position: fixed;
  }
  .titleStyle{
    text-align: center;
    margin-top: 15%;
    font-size: 40px;
  }
  .btnlogin{
    margin: 0 auto;
    margin-top: 15px;
    height:300px;
    width: 309px;
    /*border: 1px solid;*/
    position: relative
  }
</style>
