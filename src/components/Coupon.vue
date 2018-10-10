<template>
    <div class="coupon-box">
      <div class="header-top fix-bar" @click="goBack">
        <img class="back" src="../assets/mainpage/goback.png" alt="">
        <span class="backTitle">我的餐券</span>
      </div>
      <ul class="bar-status clear fix-bar">
        <li v-for="(item,index) in status" :class="{active:nowStatus==(index+1)}" :key="index" @click="chooseStasu(index)">
          <router-link :to="item.url" :class="{hasBorder:(index==1)}">{{item.statuName}}</router-link>
        </li>
      </ul>
      <view-box>
        <transition name="slide-fade">
          <router-view class="router-view"></router-view>
        </transition>
      </view-box>
    </div>
</template>

<script type="text/ecmascript-6">
  import { ViewBox } from 'vux'
    export default {
      components: {ViewBox},
      data(){
        return {
          nowStatus:1,//当前选中的导航菜单
          status:[
            {url:"/unused",statuName:"未使用"},
            {url:"/used",statuName:"已使用"},
            {url:"/haveExpired",statuName:"已过期"},
          ]
        }
      },
      mounted: function () {
        var app=document.getElementById("app");
        app.style.height="100%";
      },
      methods:{
        goBack: function () {
          this.$router.push("/mainpage");
        },
        chooseStasu: function (index) {
          this.nowStatus = index +1;
        }
      },
      destroyed:function(){
        var app=document.getElementById("app");
        app.style.height="inherit";
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import "../css/coupon.css";
</style>
