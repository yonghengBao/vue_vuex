<template>
    <div>
       <div class="header">
          <span>支付结果</span>
         <router-link class="finish" to="/">完成</router-link>
       </div>
       <ul class="con">
         <li>
           <span class="picBox">
             <img src="../assets/headPic.png" />
           </span>
           <p class="time"> {{resultForm.time}} </p>
           <p class="type">{{resultForm.type}}  {{resultForm.money}}元</p>
           <p>付款方：{{resultForm.payer}}</p>
           <p>收款方：{{resultForm.payee}}</p>
           <div v-if="resultForm.status==1">
             <span class="icon succ"></span>
             <p>付款成功</p>
           </div>
           <div v-if="resultForm.status==2">
             <span class="icon fail"></span>
             <p>付款失败</p>
           </div>
           <p class="dec">祝您用餐愉快!</p>
         </li>
       </ul>
    </div>
</template>

<script>
    export default{
        data () {
            return {
              resultForm:{
                time:" 2018年7月12日 12时0分0秒",
                type:"标餐券",
                money:"8",
                payer:"元宝",
                payee:"曹氏鸭脖",
                status:"1"
              }
            }
        }
    }
</script>

<style scoped>
  @import "../css/payResult.css";
</style>
