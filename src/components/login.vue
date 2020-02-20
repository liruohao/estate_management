<template>
  <div class="bglogin">
      <div>
        <div class="titleStyle">
          世纪天城物业管理系统
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
  import $ from 'jquery'
export default {
  data () {
    return {
      formInline: {
        username: '',
        password: ''
      }
    }
  },
  mounted(){

  },
  methods: {
    btnLoginClick(){
      this.$http.get('/api/login').then((response)=>{
        response=response.body;
        console.log(response);
        const ERR_OK=0;
        if(response.errno===ERR_OK){
          if(this.checkUser(response.data)){
            this.$router.push({
              path:'/index'
            });
          }else{
            this.$Message.error('账号或密码输入错误');
          }
        }
      });
    },
    search(ev) {
      this.btnLoginClick()
    },
    checkUser(uList){
      var that=this;
      return uList.filter(function(item){
        return item.username==that.formInline.username&&item.password==that.formInline.password
      }).length>0;
    },
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
