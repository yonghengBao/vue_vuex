<template>
    <div class="con">
      <header-top backTitle="用餐申请审批" style="position: fixed;z-index:500;width: 100%;background: #F9F9F9"></header-top>
      <ul class="approval" >
        <scroller lock-x height="100%" @on-scroll="onScroll" @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :scroll-bottom-offst="200">
          <div>
            <li v-for="(item,index) in approvalForm" :key="index" @click="toApprovalDetail(item.id)">
              <div class="left">
                <p class="name">{{item.type}}</p>
                <span class="icon" v-if="item.status==0">New</span>
                <p class="approver">申请人：{{item.name}}</p>
              </div>
              <div class="center">
                <p class="date">{{item.date | dateFormat('YYYY-MM-DD HH:mm') }}</p>
              </div>
              <div class="right">
                <router-link class="goDetail" to="/"> > </router-link>
              </div>
            </li>
            <!--<span v-if="11">上拉刷新</span>-->
            <load-more :tip="tipContent" :show-loading="isShowLoading"></load-more>

            <!--<span v-if="isShowLoading">加载完毕</span>-->
          </div>
        </scroller>
      </ul>
    </div>
</template>

<script type="text/ecmascript-6">
    import HeaderTop from './HeaderTop.vue'
    import { dateFormat,LoadMore } from 'vux'
    export default{
      components:{
        HeaderTop,
        LoadMore
      },
      filters: {
        dateFormat
      },
      data () {
          return {
            approvalForm:[],
            onFetching: false,
            pageNum:1,//当前页
            pages:0,//总页数
            isShowLoading:false,
            tipContent:'上拉加载'
          }
      },
      created: function () {
        this.scrollGetDataList(1,10)
      },
      methods:{
        toApprovalDetail: function (id) {
          this.$router.push("/approvalDetail/"+id);
        },
        scrollGetDataList: function (pageIndex,pageSize) {
          this.getData('/diningTicket/getLeaderApplyList?pageIndex='+pageIndex+'&pageSize='+pageSize,(response)=>{
            console.log(response)
            this.pageNum = response.data.pageNum;
            this.pages = response.data.pages;
            if(response.data.list.length>0){
              let item = null;
              for(var p of response.data.list){
                item = {type:p.ticketName,name:p.applyName,date:p.createDate,id:p.id,status:p.status};
                this.approvalForm.push(item)
              }
            }
          })
        },
        onScroll (pos) {
//          console.log(pos)
        },
        onScrollBottom () {
          if (!this.onFetching) {
            this.onFetching = true
            setTimeout(() => {
              if(this.pageNum<this.pages){
                this.isShowLoading = true;
                this.tipContent = ""
                this.scrollGetDataList(this.pageNum+1,10)
              }else{
                this.isShowLoading = false;
                this.tipContent = "全部加载完毕"
                return
              }
              this.$nextTick(() => {
                this.$refs.scrollerBottom.reset()
              })
              this.onFetching = false
            }, 2000)
          }
        }
      }
    }
</script>

<style scoped>
  @import "../css/approval.css";
</style>
