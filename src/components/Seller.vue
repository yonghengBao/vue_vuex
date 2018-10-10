<template>
    <div class="seller">
      <!--header部分-->
      <div class="header">
        <header-top backTitle="我是商家"></header-top>
      </div>
      <div class="money">
        <p class="moneyT">今日收入</p>
        <h1><span>￥</span>{{money}}</h1>
      </div>
      <div class="news">
        <p class="newsT">最新动态</p>
        <scroller lock-x height="340px" @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :scroll-bottom-offst="100" >
          <div class="msg">
            <li v-for="(item,index) in msgList" :key="index">
              <span>{{item.createdTime|dateFormat('YYYY-MM-DD hh:mm:ss')}}</span>用户{{item.memberName}}支付￥{{item.amount}}元
            </li>
            <load-more tip="loading" v-show="isload"></load-more>
          </div>
        </scroller>
      </div>
    </div>
</template>

<style scoped>
  @import '../css/seller.css';
</style>

<script type="text/ecmascript-6">
    import { cookie,dateFormat, Scroller,LoadMore} from 'vux'
    import HeaderTop from './HeaderTop.vue'
    export default{
      components:{
        HeaderTop,
        Scroller,
        LoadMore
      },
      filters: {
        dateFormat
      },
      data () {
        return {
          money:'',
          msgList:[],
          onFetching:false,
          pageNum:1,
          pages:0,
          isload:true
        }
      },
      created: function () {
        //获取商家收支统计
        this.getData('/campus/businessIncome/order/count', (response)=> {
          this.money=response.data.money;
        });
        this.getDataList(1)
      },
      methods:{
        getDataList:function(page){
          this.getData("/campus/businessIncome/order/businessIncome?page="+page+"&pageSize=8", (response)=> {
            console.log(response);
//          this.msgList = response.data.list;
            this.pageNum = response.data.pageNum;
            this.pages = response.data.pages;
            for(var i=0;i<response.data.list.length;i++){
              this.msgList.push(response.data.list[i])
            }
          });
        },
        //获取商家收支信息
        onScrollBottom () {
          if (this.onFetching) {
            // do nothing
          } else {
            this.onFetching = true;
            setTimeout(() => {
              if(this.pageNum==this.pages){
                console.log(111)
//                this.$refs.scrollerBottom.disablePullup()
                this.isload=false
                return;
              }else{
                this.getDataList(this.pageNum+1)
                this.$nextTick(() => {
                  this.$refs.scrollerBottom.reset()
                })
              }
              this.onFetching = false
            },500)
          }
        },

      }
    }
</script>
