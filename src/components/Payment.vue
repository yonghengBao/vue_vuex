<template>
  <div class="payment">
    <!--header部分-->
    <header-top class="headerT" backTitle="向商家付款"></header-top>
    <!--<div class="codeImg">-->
      <!--<img src="../assets/qrcode.png">-->
      <qrcode class="codeImg" :value="qrcodeVal" type="img"></qrcode>
    <!--</div>-->
    <div class="way">
      <p class="wayT">付款方式</p>
      <ul>
        <li class="guest-li" v-for="(item,index) in wayList" :key="index" @click="toggle(index)">
          <popup-picker v-if="item.list!= ''" class="guest-picker" :data="item.list" v-model="item.value" popup-title="选择客餐券" confirm-text="确认" @on-show="onShow" @on-hide="onHide(item.value)" @on-change="onChange" value-text-align="left"></popup-picker>
          <p class="type">{{item.type}}
            <span class="tip">{{item.tip}}</span>
          </p>
          <p class="time-p">
            <span class="time">{{item.time}}</span>
            <span class="picked" :class="{ opacity:index==current}"></span>
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
    import HeaderTop from './HeaderTop.vue'
    import { Qrcode,PopupPicker } from 'vux'
    export default{
      components:{
        HeaderTop,
        Qrcode,
        PopupPicker
      },
      data () {
          return {
            current:0,
            qrcodeVal:'123456789',
            wayList:[
              {type:'标餐券',tip:'您有一张面额10元的午餐券(消费时段11:30-13:30)可使用',time:'有效期至 2018-07-12 13:30:00',list:[['']],value:['a']},
              {type:'客餐券',tip:'您有两张面额10元的午餐券(消费时段11:30-13:30)可使用',time:'有效期至 2018-07-12 13:30:00',list:[['xxx有限公司  张三', 'xxx有限公司  李四','xxx有限公司  王五','xxx有限公司  张六']],value: ['xxx有限公司  张三']},
              {type:'加班券',tip:'无加班券可用',time:'',list:[['']],value:['c']}
            ]
          }
      },
      created: function () {
        this.getData('/diningTicket/payWay',(response)=>{
          console.log(1)
        })
      },
      methods: {
        onChange (val) {
          this.qrcodeVal = val[0];
          console.log(val)
        },
        onShow () {
          console.log('on show')
        },
        onHide (type,value) {
          console.log('on hide', type,value)
        },
        toggle:function(index){
          this.current=index;
          console.log(index);
          //将wayList中的value值赋值给qrcodeVal
          this.qrcodeVal = this.wayList[index].value[0];
        }
      }
    }
</script>
<style scoped>
  @import "../css/payment.css";
</style>
<style>
  .vux-popup-header-right{color:#1abc9c !important;}
  .vux-popup-picker-select{width:100%;height:3.5rem;padding-top:2.5rem;margin-top:-2.5rem;}
</style>
