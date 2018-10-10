<template>
    <div class="con">
      <header-top backTitle="详情"></header-top>
      <div class="card">
          <div class="card-head">
            <span class="card-icon"></span>
          </div>
          <ul class="ticket">
            <li>
              <span class="type">{{ticketForm.type}}</span>
            </li>
            <li>
              <p>{{ticketForm.name}}</p>
            </li>
            <li class="date">
              <span>有效期</span>
              <p>{{ticketForm.date}}</p>
            </li>
            <li class="dec">
              <p>{{useRange}}</p>
            </li>
          </ul>
          <button class="okBtn" @click="goUse(business)">立即使用</button>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import HeaderTop from './HeaderTop.vue'
    export default{
      components:{
        HeaderTop
      },
      data () {
          return {
            ticketForm:"",
            useRange:"",
            business:"" //餐券指定商家的Id
          }
      },
      created: function () {
        let params = this.$route.params.itemId;
        let paramsList = params.split("&memberTicketDetailId=");
        let itemId = paramsList[0];
        let memberTicketDetailId = paramsList[1];
        this.getData("/diningTicket/ticketDetial?itemId="+itemId+"&memberTicketDetailId="+memberTicketDetailId,(response)=>{
          this.ticketForm = {
            type:response.data.ticketName,
            name:response.data.timeName,
            date:response.data.startTime +"一"+response.data.endTime
          }
          this.business = response.data.business;
          //判断使用范围
          if(response.data.useRange=="1"){
            this.useRange = "仅限于 "+response.data.name+" 使用";
          }else if(response.data.useRange=="2"){
            this.useRange = "仅限于某类商家可用";
          }else {
            this.useRange = "通用券";
          }
        })
      },
      methods:{
        goUse: function (business) {
          console.log(business);
          //调用扫一扫获取商家信息
          //调用/order/createOrderWaiting2Paid接口，生成未支付订单，完成后进入到/scan页面
          this.$router.push("/scan")
        }
      }
    }
</script>

<style scoped>
  @import "../css/ticketDetail.css";
</style>
