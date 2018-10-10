<template>
  <div class="applyDetail">
    <!--header部分-->
    <div class="header">
      <header-top class="headerT" backTitle="申请详情"></header-top>
    </div>
    <ul class="detail" v-for="(item,index) in detailList" :key="index">
      <li>
        <label>用餐日期</label>{{item.date}}
      </li>
      <li>
        <label>用餐时段</label>{{item.time}}
      </li>
      <li>
        <label>餐券类型</label>{{item.type}}
      </li>
      <ul v-for="(userItem,userIndex) in userList" :key="userIndex">
        <li>
          <label>公司名称</label>{{userItem.company}}
        </li>
        <li>
          <label>真实姓名</label>{{userItem.userName}}
        </li>
      </ul>
      <span class="state" :class="[item.state==='0'? 'pass': '', item.state==='2'? 'return': '',item.state==='1'? 'wait': '']">
        {{item.state==0?"等待审批":item.state==1?"已同意":"已退回"}}
      </span>
    </ul>
  </div>
</template>

<style scoped>
    .detail{width: 90%;border: 1px solid #E4E4E4;margin: 0 auto;margin-bottom: 2rem;border-bottom: none;position: relative;margin-top: 2rem;background: #fff;}
    .detail li{height: 2.5rem;text-align: end;position: relative;border-bottom: 1px solid #E4E4E4;line-height: 2.5rem;font-size: .7rem;padding: 0 .5rem;color: #999;}
    .detail li label{position: absolute;left: .5rem;}
    .state{
      position: absolute;
      right: -.4rem;
      top: -1rem;
      border-radius: .15rem;
      padding: .2rem .8rem;
      font-size: .4rem;transform:rotate(25deg);
      -ms-transform:rotate(25deg); /* Internet Explorer */
      -moz-transform:rotate(25deg); /* Firefox */
      -webkit-transform:rotate(25deg); /* Safari 和 Chrome */
      -o-transform:rotate(25deg); /* Opera */
    }
    .pass{color: #1ABC9C;border: 1px solid #1ABC9C;}
    .return{color: #FF0000;border: 1px solid #FF0000;}
    .wait{color: #3399FF;border: 1px solid #3399FF;}
</style>

<script type="text/ecmascript-6">
    import HeaderTop from './HeaderTop.vue'
    import { Badge } from 'vux'
    export default{
      components:{
        HeaderTop,
        Badge,
      },
      data () {
          return {
            detailList:[], //申请详细信息
            userList:[]  //用餐人员列表
          }
      },
      created: function () {
        let id = this.$route.params.id;
        let item = null;
        this.getData('/diningTicket/getTicketApplyDetial?id='+id,(response)=>{
          if(response.data.detailList.length>0){
            item ={
              date:response.data.useDate,
              time:response.data.tiemName,
              type:response.data.ticketName,
              state:response.data.status
            }
            let companyList = response.data.detailList[0].companyName.split(",");
            let namaeList = response.data.detailList[0].customerName.split(",");
            let userList = [];
            let userItem;
            for(var i=0;i<companyList.length-1;i++){
              userItem= {company:companyList[i],userName:namaeList[i]}
              userList.push(userItem);
            }
            this.userList = userList;
          } else{
            item ={
              date:response.data.useDate,
              time:response.data.tiemName,
              type:response.data.ticketName,
              state:response.data.status
            }
          }
          this.detailList.push(item)
        })
      }
    }
</script>
