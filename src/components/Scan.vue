<template>
    <div>
      <header-top backTitle="付款给商家"></header-top>
      <div class="sell-con">
        <span class="seller">
          <img :src="sellerForm.headPic">
        </span>
        <p>
          <span class="selNumber">{{sellerForm.selNumber}}</span>
          <span class="selName">{{sellerForm.selName}}</span>
        </p>
      </div>
      <div class="pay-con">
        <p class="pay-money">付款金额</p>
        <div class="money-con">
          <span class="money-icon">￥</span>
          <input class="mon" placeholder="请输入付款金额" type="number"/>
        </div>
      </div>
      <div class="way-con">
        <p class="wayT">付款方式</p>
        <ul>
          <li class="guest-li" v-for="(item,index) in wayList" :key="index" @click="toggle(index)">
            <popup-picker v-if="item.list!= ''" class="guest-picker" :data="item.list" v-model="item.value" :popup-title="item.title" confirm-text="确认" @on-show="onShow" @on-hide="onHide" @on-change="onChange" value-text-align="left"></popup-picker>
            <p class="type">{{item.type}}
              <span class="tip">{{item.tip}}</span>
            </p>
            <p class="time-p">
              <span class="time">{{item.time}}</span>
              <span class="picked" v-bind:class="{ opacity:index==current}"></span>
            </p>
          </li>
        </ul>
      </div>
      <button class="payBtn">确认付款</button>
    </div>
</template>

<script type="text/ecmascript-6">
    import HeaderTop from './HeaderTop'
    import headPic from '../assets/headPic.png'
    import {PopupPicker} from 'vux'
    export default{
      components:{
        HeaderTop,
        PopupPicker
      },
      data () {
        return {
          current:0,
          sellerForm:{headPic,selNumber:'一食堂', selName:'绝味鸭脖'},
          wayList:[
            {type:'标餐券',tip:'您有一张面额10元的午餐券(消费时段11:30-13:30)可使用',time:'有效期至 2018-07-12 13:30:00',list:[['']],value:[''],title:'选择标餐券'},
            {type:'客餐券',tip:'您有两张面额10元的午餐券(消费时段11:30-13:30)可使用',time:'有效期至 2018-07-12 13:30:00',list:[['xxx有限公司  张三', 'xxx有限公司  李四','xxx有限公司  王五','xxx有限公司  张六']],value: ['xxx有限公司  张三'],title:'选择客餐券'},
            {type:'加班券',tip:'无加班券可用',time:'',list:[['']],value:[''],title:'选择加餐券'}
          ]
        }
      },
      methods: {
        onChange (val) {
          console.log('val change', val)
        },
        onShow () {
          console.log('on show')
        },
        onHide (type) {
          console.log('on hide', type)
        },
        toggle:function(index){
          this.current=index;
          console.log(index);
        }
      }
    }
</script>

<style scoped>
  @import "../css/scan.css";
</style>

