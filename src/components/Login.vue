<template>
    <div class="con">
      <div class="login-con">
        <span class="person-icon"></span>
      </div>
      <form class="login-group">
        <p>
          <span class="phone-icon"></span>
          <input class="login-input" v-model="user_tel" name="mobile" placeholder="请输入手机号码" keyboard="number" @blur="checkTel" is-type="china-mobile"/>
        </p>
        <p>
          <span class="pwd-icon"></span>
          <input class="login-input login-psw" v-model="user_pwd" v-bind:type="inputType" placeholder="请输入登录密码" @keyup.enter="login" @blur="checkPwd"/>
        </p>
        <div class="switch-con">
          <inline-x-switch class="login-switch" v-model="switchValue"></inline-x-switch>
          <span class="open" v-if="switchValue==true">123</span>
        </div>
      </form>
      <p class="forget" @click="goRegister">忘记密码</p>
      <button type="primary" class="loginBtn" @click="login">登录</button>
      <p class="noid">没有账号?<router-link  class="goReg" to="/register/reg">立即注册</router-link></p>
    </div>
</template>

<script scoped type="text/ecmascript-6">
    import {Group, InlineXSwitch,cookie} from 'vux'
    import {regPhone,validateTel,validateLoginPassWord,validateID,} from '../js/formValidate'
    export default{
        components: {
            Group,
            InlineXSwitch
        },
        data () {
            return {
              user_tel:"",
              user_pwd:"",
              password: '123465',
              value:true,
              switchValue:false,
              mya:"123",
              inputType:"password",
            }
        },
        watch:{
            switchValue:function(val){
             if(val){
               this.inputType="text";
             }else{
               this.inputType="password";
             }
            }
        },
        methods:{
          checkTel: function () {
            var msg = validateTel(this.user_tel)
            if(msg){
              this.$vux.toast.text(msg, 'middle')
              return false;
            }
            return true;
          },
          checkPwd: function () {
            if(!this.user_pwd){
              this.$vux.toast.text('请输入密码', 'middle')
              return false;
            }
            return true;
          },
          goRegister: function () {
            this.$router.push("/register/forget");
          },
          login: function () {
            if(!(this.checkTel() && this.checkPwd())){
              return ;
            }
            var loginData = {
              "mobile": this.user_tel,
              "pwd": this.user_pwd
            }
            this.postData('/login',loginData, (response)=>{
                cookie.set('name',response.data.name)
                cookie.set('picUrl',response.data.picUrl)
                cookie.set('type',response.data.type)
                cookie.set('token',response.data.token)
                cookie.set('id',response.data.id)
                this.$router.push("/mainpage");
            })
          }
        }
    }
</script>
<style scoped>
  @import "../css/login.css";
</style>

