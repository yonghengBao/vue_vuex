<template>
  <div class="myApp">
    <drawer :show="drawerShow" :pos="pos" :tran="tran" @change-show="changeDrawerShow">
      <div class="layout" slot="drawer" >
        <div class="portrait" :style="{backgroundImage: 'url(' + require('../assets/'+userUrl) + ')'}">
          <!--<img :src="require('../assets/'+userUrl)" alt="">-->
          {{userName}}
        </div>
        <!--侧边导航栏-->
        <ul class="aside-menus">
          <li @click="goRegister">
            <img src="../assets/mainpage/setting.png" alt="">
            <span>修改密码</span>
          </li>
          <li>
            <img src="../assets/mainpage/send.png" alt="">
            <span>内容推送</span>
            <inline-x-switch v-model="switchValue" class="switch" @click.native="toggleSwitch"></inline-x-switch>
          </li>
          <li @click="goSuggestion">
            <img src="../assets/mainpage/email.png" alt="">
            <span>意见反馈</span>
          </li>
          <li v-if="isMerchant" @click="goSeller">
            <img src="../assets/mainpage/merchant.png" alt="">
            <span>我是商家</span>
          </li>
          <li @click="goIdentity">
            <img src="../assets/mainpage/merchant.png" alt="">
            <span>身份绑定</span>
          </li>
        </ul>
        <!--用餐说明-->
        <div class="eat-descripte">
          <ul>
            <li>用餐时间</li>
            <li v-for="(tmp,index) in allTicketTime" :key="index">{{tmp.timeName}}（{{tmp.startTime}}-{{tmp.endTime}}）</li>
          </ul>
        </div>
        <!--退出登录-->
        <div class="quit" >
          <span @click="goLogin">退出登录</span>
        </div>
      </div>
      <!--导航头部-->
      <div class="bar">
        <img src="../assets/mainpage/bar.png" alt="" @click="drawerToggle">
        <span>万千校园</span>
      </div>
      <!--菜单栏-->
      <div class="tab-menus">
        <ul>
          <li @click="toScan">
            <img src="../assets/mainpage/scan-in.png" alt="" style="width: 1.5rem">
            <p style="position: relative;top: .2rem;">扫一扫</p>
          </li>
          <li @click="toPayment">
            <img src="../assets/mainpage/paycode.png" alt="">
            <p>付款</p>
          </li>
          <li @click="toCoupon">
            <img src="../assets/mainpage/coupon.png" alt="" >
            <p>餐券</p>
          </li>
          <li @click="toApply">
            <img src="../assets/mainpage/dinner.png" alt="">
            <p>用餐申请</p>
          </li>
        </ul>
      </div>
      <!--最新动态-->
      <div class="new-status">
        <p>
          <i></i>
          <span>最新动态</span>
        </p>
            <ul>
              <li v-for="(item,index) in newStatusList" :key="index">
                <p>
                  {{item.content}}
              <span class="createTime">
                {{FormatMsgTime(item.createdTime)}}
              </span>
                </p>
              </li>
            </ul>
      </div>
      <!--用餐历史-->
      <div class="new-status">
        <p>
          <i></i>
          <span>用餐历史</span>
        </p>
        <ul>
          <li v-for="(item,index) in mealHistoryList" :key="index">
            <span>{{item.createdTime|dateFormat('YYYY-MM-DD hh:mm:ss')}}</span>
            <p class="detail">
              {{item.content}}
            </p>
          </li>
        </ul>
      </div>
    </drawer>
  </div>
</template>

<script type="text/ecmascript-6">
  import { InlineXSwitch ,cookie,dateFormat,Scroller,LoadMore } from 'vux'
  import Drawer from './drawer.vue'
  export default {
    components: { Drawer,InlineXSwitch,Scroller,LoadMore},
    filters: {
      dateFormat,
    },
    data(){
      return {
        pos: 'left',
        tran: 'overlay',
        switchValue:false,
        drawerShow: false,
        isMerchant:false,//是否具有商家身份
        userName:"",
        userUrl:"",
        allTicketTime:[],
        newStatusList:[],
        mealHistoryList:[],
        pullupStatus: 'default',
      }
    },
    created: function () {
      this.$parent.isFlag = true;
      this.userName = cookie.get("name");
      //判断是否有用户图像
      if(cookie.get("picUrl")!="" && cookie.get("picUrl")!="null" && cookie.get("picUrl")!="undefined"){
        this.userUrl = cookie.get("picUrl");
      }else{
        this.userUrl = 'person.png';
      }
      //获取用餐时段
      this.getData('diningTicket/getAllTicketTime', (response)=>{
        this.allTicketTime = response.data;
      });
      //判断用户身份
      var type = cookie.get("type")
      if(type.indexOf('2')!=-1){
        this.isMerchant = true;
      }else {
        this.isMerchant = false;
      }
      //获取会员就餐记录
      this.getData('campus/mealsHistory/getCurrent?page=1&pageSize=10', (response)=>{
        this.mealHistoryList=response.data.list;
      });
      //获取会员操作动态
      this.getData('campus/memberOperationDynamics/getCurrent?page=1&pageSize=10', (response)=>{
        this.newStatusList=response.data.list;
      });


    },
    methods: {
      drawerToggle() {
        this.drawerShow=!this.drawerShow
      },
      changeDrawerShow(state) {
        this.drawerShow=state;
      },
      toScan: function () {
        //调用扫一扫获取商家信息
        //调用/order/createOrderWaiting2Paid接口，生成未支付订单，完成后进入到/scan页面
        this.$router.push("/scan")
      },
      toPayment: function () {
        this.$router.push("/payment");
      },
      toApply: function () {
        this.$router.push("/apply");
      },
      toCoupon: function () {
        this.$router.push("/coupon");
      },
      goRegister: function () {
        this.$router.push("/register/change");
      },
      goIdentity: function () {
        this.$router.push("/identity");
      },
      goSuggestion: function () {
        this.$router.push("/suggestion");
      },
      goSeller: function () {
        this.$router.push("/seller");
      },
      goLogin: function () {
        cookie.remove('isLogin')
        cookie.remove('name')
        cookie.remove('picUrl')
        cookie.remove('type')
        cookie.remove('token')
        cookie.remove('id')
        this.$router.push("/login");
      },
      toggleSwitch:function () {
        this.switchValue=!this.switchValue;
        console.log(this.switchValue);
      }
    },
    destroyed:function(){
      this.$parent.isFlag = false;
    }
  }
</script>

<style scoped>
  @import "../css/mainpage.css";
</style>
