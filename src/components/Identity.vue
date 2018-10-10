<template>
  <div class="con">
    <header-top backTitle="身份绑定"></header-top>
    <div class="login-con">
      <span class="person-icon"></span>
    </div>
    <form class="iden-form">
      <p>真实姓名 <input type="text" name="name" v-model="realName" placeholder="请输入真实姓名" @blur="checkName"/></p>
      <p>证件号<input type="text" name="number" v-model="idNumber" placeholder="请输入身份证件号、学生证号" @blur="checkId"/></p>
    </form>
    <x-button plain type="primary" class="idBtn" @click.native="sureBtn">确认</x-button>
  </div>
</template>

<script type="text/ecmascript-6">
    import { XButton,cookie,Toast} from 'vux'
    import HeaderTop from './HeaderTop.vue'
    import {validateID} from '../js/formValidate'
    export default{
        components: {
          XButton,
          HeaderTop,
          Toast
        },
        data () {
            return {
              realName:'',
              idNumber:'',
              timer:null
            }
        },
        methods:{
          checkName:function () {
             if(!this.realName){
                this.$vux.toast.text('请输入真实姓名','middle');
                return false;
             }
             return true;
          },
          checkId: function () {
              var msg = validateID(this.idNumber);
              if(msg){
                this.$vux.toast.text(msg, 'middle');
                return false;
              }
              return true;
          },
          back(){
              this.$router.go(-1);//返回上一层
          },
          sureBtn:function () {
            if(!(this.checkName() && this.checkId())){
              return ;
            }
            var bindIdData = {
              "name": this.realName,
              "idCard": this.idNumber,
              "id":cookie.get('id')
            }
            console.log(bindIdData);
            this.$http.post('/bindingUser',bindIdData).then((response)=>{
              console.log(response);
              if(response.data.code == "000000") {
                this.$vux.toast.text('绑定成功！',' middle');
                this.timer = setTimeout(()=>{
                  this.$router.push("/mainpage")
                },2000)
              }
              else if(response.data.code == "010205"){
                this.$vux.toast.text('操作失败,身份证号码已绑定！',' middle');
              }
            }).catch(function(error){
              console.log(error)
            })
          }
        },
        destroyed: function () {
          clearTimeout(this.timer);
          this.timer = null;
        }

    }
</script>

<style scoped>
  @import "../css/identity.css";
</style>
