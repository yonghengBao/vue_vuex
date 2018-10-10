<template>
    <div class="item" @click="toTicketDetail(item.ticketItemId,item.memberTicketDetailId)">
      <img src="/src/assets/mainpage/couponlogo.png" alt="">
      <div class="item-box">
        <p>
          <span class="title">{{item.ticketName}}-{{item.timeName}}</span>
          <em>{{new Date()| dateFormat('YYYY/MM/DD')}}</em>
        </p>
        <span>{{item.useRange=="1" ? "指定商家可用" : item.useRange== "2" ? "超市可用" : "通用券"}}</span>
      </div>
    </div>
</template>

<script>
  import { dateFormat } from 'vux'
    export default {
        props:["item"],
        filters: {
          dateFormat
        },
        data () {
            return {}
        },
      methods:{
        toTicketDetail: function (itemId,memberTicketDetailId) {
          this.$router.push("/ticketDetail/"+itemId+"&memberTicketDetailId="+memberTicketDetailId)
        }
      }
    }
</script>

<style scoped>
  .item{
    margin-bottom: .5rem;
    border: 1px solid #ddd;
    padding: 0 .5rem;
    display:-webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    align-items:center;
    -webkit-align-items:center;
    box-align:center;
    -moz-box-align:center;
    -webkit-box-align:center;
    height: 3.7rem;
    background: #fff;
  }
  .item img{
    width: 2.5rem;
    margin-right: .5rem;
    vertical-align: middle;
  }
  .item-box{
    width: 100%;
    font-size: .65rem;
    display: inline-block;
  }
  .item-box p{
    width: 100%;
    margin-bottom: .3rem;
  }
  .item-box>span{
    color: #1ABC9C;
    font-size: .6rem;
  }
  .item-box em{
    font-style: normal;
    float: right;
    font-size: .6rem;
    color: #999;
  }
</style>
