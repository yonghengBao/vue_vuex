<template>
  <div class="apply">
    <!--header部分-->
    <div class="header">
      <header-top class="headerT" backTitle="新增申请"></header-top>
    </div>
    <div class="applyForm">
      <group gutter="0">
        <datetime title="用餐日期" v-model="valueDate" :start-date="startTime" :min-hour="startHour" placeholder="选择日期" format="YYYY-MM-DD HH" @on-change="change"></datetime>
        <popup-picker title="餐券类型" v-model="valueType" placeholder="选择餐券类型" popup-title="选择餐券类型" show-name :data="typeList" @on-hide="onhide" confirm-text="确认"></popup-picker>
        <div class="checkBox">
          <p>用餐时段</p>
          <checklist class="checkList" label-position="right" required :options="commonList" v-model="checked" @on-change="change"></checklist>
        </div>
        <div class="componentList">
          <ul class="ul" :index="1">
            <li><label>公司名称1</label><input class="input companyName" type="text" placeholder="输入公司名称"></li>
            <li><label>真实姓名1</label><input class="input userName" placeholder="输入真实姓名"></li>
          </ul>
          <ul class="addUl" v-for="(item, index) in items" :key="index" :index="index+2">
            <li><label>公司名称{{index+2}}</label><input class="input companyName" type="text" placeholder="输入公司名称"></li>
            <li><label>真实姓名{{index+2}}</label><input class="input userName" placeholder="输入真实姓名"></li>
            <icon class="delBtn" type="cancel" @click.native="removeFun"></icon>
          </ul>
        </div>
      </group>
    </div>
    <p class="addBtn" @click="addFun">新增</p>
    <input class="subApply" type="button" value="提交申请" @click="submintBtn">
  </div>
</template>

<style scoped>
 @import '../css/addApply.css';
</style>

<script type="text/ecmascript-6">
    import HeaderTop from './HeaderTop.vue'
    import { Group,Datetime,PopupPicker,Checklist,Icon } from 'vux'
    export default{
      components:{
        HeaderTop,
        Group,
        Datetime,
        PopupPicker,
        Checklist,
        Icon
      },
      data () {
        return {
          startTime:'',
          startHour:0,
          valueDate:'',//用餐时间
          valueType:[],//餐券类型
          typeList:[],//餐券列表
          commonList:[],//选择完餐券类型后，对应的用餐时段列表
          checked:[],//选中的用餐时段
          items:[],
          checkTimeList:null,//用户选中的用餐时段的数据
          dataList:null,//选择完餐券类型后获得的所有用餐时段的数据
          choosedTicketTypeList:null,  //用户选中的餐券类型的数据
          timer:null
        }
      },
      created(){
        let nowDate = new Date(); //实例一个时间对象；
        let year= nowDate.getFullYear();   //获取系统的年；
        let month= nowDate.getMonth()+1;   //获取系统月份，由于月份是从0开始计算，所以要加1
        if(month<=9){
          month="0"+month
        }
        let date= nowDate.getDate(); // 获取系统日，
        if(date<=9){
          date="0"+date;
        }
        let hour= nowDate.getHours(); //获取系统时，

        this.startTime = year+"-"+month+"-"+date;
        this.startHour = hour;
        this.getData("/diningTicket/getTicketName",(response)=>{
          if(response.data.length>0){
            this.dataList = response.data;
            let typeList = [];
            for(var tmp of response.data){
              let object = {name:tmp.name,value:tmp.id};
              typeList.push(object);
            }
            this.typeList.push(typeList);
          }
        });
      },
      methods:{
        change (value) {

        },
        onhide(){
          let ticketId = this.valueType[0];
          for(var p of this.dataList){
            if(p.id==ticketId){
              this.choosedTicketTypeList = p;
              break;
            }
          }
          this.commonList = [];
          //修改餐券类型时获取对应的用餐时段
          this.getData("/diningTicket/getTicketTime?ticketId="+ticketId,(response)=>{
            if(response.data.length>0){
              this.checkTimeList= response.data;
              let item;
              for(var tmp of response.data){
                item = tmp.timeName+tmp.startTime+"一"+tmp.endTime;
                if(this.commonList.indexOf(item)==-1){
                  this.commonList.push(item);
                }
              }
            }else{
              this.$vux.toast.text('暂无用餐时段，请选择其他餐券', 'middle')
            }
          });
        },
        addFun(){
          this.items.push({value:''});
        },
        removeFun(){
          this.items.splice(this.index, 1);
        },
        //提交申请
        submintBtn: function () {
          if(!this.valueDate){
            this.$vux.toast.text('请选择用餐日期！', 'middle')
            return;
          }
          if(!this.valueType[0]){
            this.$vux.toast.text('请选择餐券类型！', 'middle')
            return;
          }
          if(!this.checked[0]){
            this.$vux.toast.text('请选择用餐时段！', 'middle')
            return;
          }
          let checkedList = document.querySelectorAll(".checkList input");
          let ticketItemIdList = "";//选中的用餐时段的ticketItemId
          for(var i=0;i<checkedList.length;i++){
            if(checkedList[i].checked){
              ticketItemIdList +=this.checkTimeList[i].ticketItemId+","
            }
          }
          let companyNameList = document.querySelectorAll(".componentList .companyName");
          let userNameList = document.querySelectorAll(".componentList .userName");
          let companyList = '';//所有公司名称的集合
          let userList = '';//所有使用人的名字的集合
          for(var i=0;i<companyNameList.length;i++){
            if(!companyNameList[i].value)break
            companyList += companyNameList[i].value + ",";
          }
          for(var i=0;i<userNameList.length;i++){
            if(!userNameList[i].value)break
            userList+=userNameList[i].value + ",";
          }
          //对选中餐券的userTarget进行判断：1可以不传公司名称，2:必须传公司名称
          if(this.choosedTicketTypeList.usedTarget=="2" && !companyList){
            this.$vux.toast.text('请输入公司名称及真实姓名！', 'middle')
            return;
          }
          let diningTicketApply = {
            "createBy": this.choosedTicketTypeList.createBy,
            "detailList": [
              {
                "companyName": companyList,
                "customerName": userList
              }
            ],
            "ticketId": this.choosedTicketTypeList.id,
            "ticketItemId": ticketItemIdList,
            "useDate": this.valueDate+":00:00",
            "userTarget": this.choosedTicketTypeList.usedTarget
          }
          this.postData("/diningTicket/saveTicketApply",diningTicketApply,(response)=>{
            //提交成功跳转到申请列表页面
            this.$vux.toast.text('申请成功，等待审核中！', 'middle')
            this.timer = setTimeout(()=>{
              this.$router.push("/apply")
            },1500)
          })
        }
      },
      destroyed: function () {
        clearTimeout(this.timer)
        this.timer  = null;
      }
    }
</script>
