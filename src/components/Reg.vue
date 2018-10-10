<template>
    <div class="reg">
        <div class="head">
            <img src="../assets/person.png">
        </div>
        <ul class="form">
            <li>
              <label><img src="../assets/tel.png" /></label>
              <input class="input" type="tel" name="tel" placeholder="输入手机号码" v-model="valueTel" @blur="checkTel">
            </li>
            <li class="inputMsg">
              <label><img src="../assets/msg.png" /></label>
              <input class="input" type="tel" name="msg" placeholder="短信验证码" @blur="checkCode" v-model="user_code">
              <!--<div class="sendMsg" @click="sendMsg" @click.native="showPosition('middle')">发送验证码</div>-->
              <div class="sendMsg" @click="getcode">获取验证码</div>
            </li>
            <li class="inputPwd">
              <label><img src="../assets/psw.png" /></label>
              <input class="input" :type="inputType" name="pwd" maxlength="16" v-model="user_pwd" @blur="checkPwd" :placeholder="fromType=='reg'?'设置登录密码':'请输入新密码'">
              <span class="open" v-if="switchValue==true">123</span>
              <inline-x-switch v-model="switchValue"></inline-x-switch>
            </li>
            <button v-if="fromType=='reg'" class="confirm" @click="register">确认</button>
            <button v-else-if="fromType=='change'" class="confirm" @click="changePsw">确认</button>
            <button v-else-if="fromType=='forget'" class="confirm" @click="forgetPsw">确认</button>
        </ul>
    </div>
</template>

<style scoped>
  @import '../css/reg.css';
</style>

<script type="text/ecmascript-6">
    import {InlineXSwitch,Toast,cookie} from 'vux'
    import {regPhone,validateTel,validateLoginPassWord,validateID,} from '../js/formValidate'
    export default{
        components:{
          InlineXSwitch,
          Toast
        },
        data () {
          return{
            switchValue:false,
            inputType:'password',
            valueTel:'',
            fromType:'',
            user_code:'',
            user_pwd:'',
            timer:null
          }
        },
        created: function () {
          var fromType=this.$route.params.type;
          if(this.$route.params.type){
            this.fromType=this.$route.params.type;
          }
        },
        methods:{
          checkTel: function () {
            this.$http.get('/checkMobile?mobile='+ this.valueTel).then((response) => {
              console.log(response.data.code);
              if(response.data.code=="0301003"){
                this.$vux.toast.text('此手机号已绑定');
              }
            }).catch(function(error){
              console.log(error)
            });
            var msg = validateTel(this.valueTel)
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
            if(this.user_pwd.length<6 || this.user_pwd.length>=16){
              this.$vux.toast.text('密码长度6到16位！', 'middle')
              return false;
            }
            return true;
          },
          checkCode: function () {
            if(!this.user_code){
              this.$vux.toast.text('请输入验证码', 'middle')
              return false;
            }
            return true;
          },
          getcode: function () {//获取短信验证码
            if(!this.checkTel())return;
            this.$http.get('/mobile/code?mobile='+this.valueTel).then((response) => {
              if(response.status == "200"){
                console.log("获取到的验证码是"+response.data.data.verifyCode);
              }
            }).catch(function(error){
                console.log(error)
              })
          },
          register: function () {
            if(!(this.checkTel() && this.checkPwd() && this.checkCode())){
              return ;
            }
            var regForm = {
              "regpsw": this.user_pwd,
              "tel": this.valueTel,
              "validCode": this.user_code,
//              "key":cookie.get('token'),
            }
            console.log(regForm)
            this.$http.post('/register',regForm).then((response) => {
              console.log(response)
              if(response.data.code == "000000"){
                cookie.set('isLogin',true);
                cookie.set('token',response.data.data.token)
                this.$vux.toast.text('注册成功,请继续进行身份绑定！', 'middle')
                console.log(response.data);
                this.timer = setTimeout(()=>{
                  this.$router.push("/identity")
                },2000)
              }else{
                this.$vux.toast.text(response.data.msg, 'middle')
              }
            }).catch(function(error){
              console.log(error)
            })
          },
          changePsw:function () {
            if(!(this.checkTel() && this.checkPwd() && this.checkCode())){
              return ;
            }
            var changeForm = {
              "newPsw": this.user_pwd,
              "mobile": this.valueTel,
              "verCode": this.user_code
            }
            console.log(changeForm)
            this.$http.post('/changePassword',changeForm).then((response) => {
              console.log(response)
              if(response.data.code == "000000"){
                this.$vux.toast.text('密码修改成功', 'middle')
                console.log(response.data);
                this.timer = setTimeout(()=>{
                  cookie.remove('isLogin')
                  this.$router.push("/login")
                },2000)
              }else{
                this.$vux.toast.text(response.data.msg, 'middle')
              }
            }).catch(function(error){
              console.log(error)
            })
          },
          forgetPsw:function () {
            if(!(this.checkTel() && this.checkPwd() && this.checkCode())){
              return ;
            }
            var forgetForm = {
              "newPsw": this.user_pwd,
              "mobile": this.valueTel,
              "verCode": this.user_code
            }
            console.log(forgetForm)
            this.$http.post('/forgetPassword',forgetForm).then((response) => {
              console.log(response)
              if(response.data.code == "000000"){
                this.$vux.toast.text('密码重置成功', 'middle')
                console.log(response.data);
                this.timer = setTimeout(()=>{
                  cookie.remove('isLogin')
                  this.$router.push("/login")
                },2000)
              }else{
                this.$vux.toast.text(response.data.msg, 'middle')
              }
            }).catch(function(error){
              console.log(error)
            })
          }
        },
        watch:{
          switchValue:function(val){
            if(val){
              this.inputType='text';
            }else{
              this.inputType='password';
            }
          }
        },
      destroyed: function () {
        clearTimeout(this.timer);
        this.timer = null;
      }
    }
</script>
