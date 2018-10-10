<template>
  <div class="applyDetail">
    <!--header部分-->
    <div class="header">
      <header-top class="headerT" backTitle="审批详情"></header-top>
    </div>
    <ul class="detail">
      <li>
        <label>用餐日期</label>{{detailList.date}}
      </li>
      <li>
        <label>用餐时段</label>{{detailList.time}}
      </li>
      <li>
        <label>餐券类型</label>{{detailList.type}}
      </li>
      <li>
        <label>公司名称</label>{{detailList.company}}
      </li>
      <li>
        <label>真实姓名</label>{{detailList.name}}
      </li>
      <span class="state" v-if="detailList.state!=0" :class="[detailList.state==='0'? 'pass': '', detailList.state==='2'? 'return': '',detailList.state==='1'? 'wait': '']">
        {{detailList.state==1?"已同意":"已退回"}}
      </span>
    </ul>
    <div class="btnBox" v-if="detailList.state==0">
      <input class="reBtn" type="button" value="退回" @click="returnFun">
      <input class="agrBtn" type="button" value="同意" @click="agreeFun">
    </div>
    <div v-transfer-dom>
      <confirm v-model="show"
               show-input
               :placeholder="placeholder"
               :title="cTit"
               ref="confirm"
               @on-cancel="onCancel"
               @on-confirm="onConfirm"
               @on-show="onShow"
               @on-hide="onHide">
      </confirm>
    </div>
    <toast v-model="show1" @on-hide="onHide1" type="cancel" :msg="msg">{{msg[num].word}}</toast>
  </div>
</template>

<style scoped>
    .detail{width: 90%;border: 1px solid #E4E4E4;margin: 0 auto;margin-bottom: 2rem;border-bottom: none;position: relative;margin-top: 1rem;background: #fff;}
    .detail li{height: 2.5rem;text-align: end;position: relative;border-bottom: 1px solid #E4E4E4;line-height: 2.5rem;font-size: .7rem;padding: 0 .5rem;color: #999;}
    .detail li label{position: absolute;left: .5rem;}
    .btnBox{width: 100%;height: 2.5rem;position: absolute;bottom: 0;font-size: .8rem;}
    .reBtn{width: 40%;height: 100%;background: #fff;border: 1px solid #1ABC9C;outline: none;border-radius: .2rem;float: left;color: #1ABC9C;margin-left: 1rem;}
    .agrBtn{width: 40%;height: 100%;background: #1ABC9C;border: none;outline: none;border-radius: .2rem;float: right;color: #fff;margin-right: 1rem;}
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
    import { Confirm,TransferDom,Toast  } from 'vux'
    export default{
        components:{
          HeaderTop,
          Confirm,
          TransferDom,
          Toast
        },
        data () {
            return {
              detailList:{
                date:'',
                time:'',
                type:'',
                company:'',
                name:'',
                state:0,
                timer:null
              },
              id:'',//餐券的id
              show:false,
              cTit:'退回理由',
              placeholder:'请输入理由',
              show1:false,
              msg:[
                {word:'发生未知错误，提交失败'},
                {word:'网络连接失败'},
                {word:'提交成功'}
              ],
              num:1,
            }
        },
        created: function () {
          this.id = this.$route.params.id;
          let item = null;
            this.getData('/diningTicket/getTicketApplyDetial?id='+this.id,(response)=>{
              if(response.data.detailList.length>0){
                item ={
                  date:response.data.useDate,
                  time:response.data.tiemName,
                  type:response.data.ticketName,
                  company:response.data.detailList[0].companyName.split(",")[0],
                  name:response.data.detailList[0].customerName.split(",")[0],
                  state:response.data.status
                }
              } else{
                item ={
                  date:response.data.useDate,
                  time:response.data.tiemName,
                  type:response.data.ticketName,
                  state:response.data.status
                }
              }
              this.detailList = item;
          })
        },
        methods: {
          returnFun(){
            this.show = true;
          },
          setStatu: function (statu) {
            this.postData('/diningTicket/updateStatus?status='+statu+'&id='+this.id,{},(response)=>{
              if(statu==1){
                this.$vux.toast.text('已同意申请');
              }else{
                this.$vux.toast.text('已退回申请');
              }
              this.timer = setTimeout(()=>{
                this.$router.push('/approval')
              },2000)
            });
          },
          agreeFun(){//同意
            this.setStatu(1);
          },
          onCancel () {
//            console.log('on cancel')
          },
          onHide () {
//            console.log('on hide')
          },
          onShow () {
//            console.log('on show')
          },
          onConfirm (value) {//退回
            this.setStatu(2);
//            this.$vux.toast.text('input value: ' + value)
          },
          onHide1 () {
//            console.log('error')
          },
        },
        destroyed: function () {
          clearTimeout(this.timer);
          this.timer = null;
        }
    }
</script>
