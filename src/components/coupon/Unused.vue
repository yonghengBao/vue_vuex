<template>
    <div class="contain">
      <coupon-item v-for="(item,index) in list" :key="index" :item="item" class="item-list"></coupon-item>
    </div>
</template>

<script type="text/ecmascript-6">
  import CouponItem from './CouponItem'
    export default {
      components:{CouponItem},
      data () {
          return {
            list:[]
          }
      },
      beforeMount: function () {
          this.$parent.$parent.nowStatus=1;
        //获取未使用餐券列表
        this.getData('/diningTicket/userTicketList?status=1&pageIndex=1&pageSize=6', (response)=>{
          if(response.data.list.length>0){
            this.list = response.data.list;
          }else {
            this.$vux.toast.text('暂未查询到未使用餐券记录', 'middle')
          }
        });
      }
    }
</script>

<style scoped>

</style>
