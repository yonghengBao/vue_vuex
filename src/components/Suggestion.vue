<template>
    <div class="con">
      <header-top backTitle="意见反馈"></header-top>
      <div class="txt-con">
        <textarea class="sug" placeholder="请输入" maxlength="100" v-on:input="word" v-model="wordval" @blur="checkText"></textarea>
        <span class="wnum">{{wordNumber}}/100</span>
      </div>
      <button class="sugBtn" type="submit" @click="sug">提交</button>
    </div>
</template>

<script scoped type="text/ecmascript-6">
    import HeaderTop from './HeaderTop.vue'
    import { Toast } from 'vux'
    export default{
        components:{
          HeaderTop,
          Toast
        },
        data () {
            return {
              wordNumber:100,
              wordval:''
            }
        },
        methods:{
          back(){
            this.$router.go(-1);//返回上一层
          },
          word(){
            var txtval=this.wordval.length;
            this.wordNumber = 100-txtval;
          },
          checkText:function(){
            if(!this.wordval){
              this.$vux.toast.text('请输入您的建议','middle');
              return false;
            }
            return true;
          },
          sug:function(){
            if(!(this.checkText())){
              return ;
            }
            var sugData={
              'content':this.wordval
            };
            console.log(sugData);
            this.postData('/submitSuggestion?content='+ this.wordval, sugData, (response)=> {
              this.$vux.toast.text('提交成功','middle');
            });
          }
        }
    }
</script>
<style scoped>
  @import "../css/suggestion.css";
</style>
