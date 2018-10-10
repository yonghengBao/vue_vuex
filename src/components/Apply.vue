<template>
  <div class="apply">
    <!--header部分-->
    <div class="header">
      <header-top class="headerT" backTitle="用餐申请"></header-top>
      <span class="approve" @click="toApproval">审批<badge></badge></span>
    </div>
    <ul class="applies">
      <li v-for="(item,index) in appliesList" :key="index" @click="toApplyDetail(item.id)">
        <div class="left">
          <p class="name">{{item.name}}<span class="tips" :class="[item.tips==='0'? 'pass': '', item.tips==='2'? 'return': '',item.tips==='1'? 'wait': '']">{{item.tips==0?"等待审批":item.tips==1?"已同意":"已退回"}}</span></p>
          <p class="approver">审批人：{{item.approver}}</p>
        </div>
        <div class="right">
          <p class="date">{{item.date| dateFormat('YYYY-MM-DD HH:mm:ss')}}</p>
        </div>
      </li>
    </ul>
    <input class="addApply" type="button" value="新增申请" @click="toAddApply">
  </div>
</template>

<script type="text/ecmascript-6">
    import HeaderTop from './HeaderTop.vue'
    import { Badge,dateFormat } from 'vux'
    export default{
      components:{
        HeaderTop,
        Badge,
      },
      filters: {
        dateFormat
      },
      data () {
          return {
            appliesList:[]
          }
      },
      created: function () {
        //获取用户用餐申请列表
        this.getData('/diningTicket/getTicketApplyList?pageIndex=1&pageSize=6', (response)=>{
          if(response.data.list.length>0){
            for(var tmp of response.data.list){
              var item = {name:tmp.ticketName,tips:tmp.status,date:tmp.createDate,approver:tmp.applyName,id:tmp.id};
              this.appliesList.push(item);
            }
          }
        });
      },
      methods:{
        toApproval: function () {
          this.$router.push("/approval")
        },
        toApplyDetail: function (id) {
          this.$router.push("/applyDetail/"+id)
        },
        toAddApply: function(){
          this.$router.push("/addApply")
        }
      }
    }
</script>

<style scoped>
  @import "../css/apply.css";
</style>
