/**
 * Created by Administrator on 2018/7/25.
 */
import { cookie} from 'vux'
export default{
  install(Vue, options) {
    //get方式请求数据
  Vue.prototype.getData = function (url,success,callback) {
    this.$http.get(url).then((responese)=>{
      if(responese.data.code==="000000"){
        if(success){
          success(responese.data);
        }
      }else if(responese.data.code==="000001" || responese.data.code==="000002"){
        this.$vux.toast.text("登录失效，请重新登录", 'middle')
        cookie.remove('isLogin')
        cookie.remove('name')
        cookie.remove('picUrl')
        cookie.remove('type')
        cookie.remove('token')
        cookie.remove('id')
        setTimeout(()=>{
          this.$router.push('/login')
        },2000)
      }else{
        this.$vux.toast.text(responese.data.msg, 'middle')
      }
      }).catch(function(error){
        this.$store.commit('updateLoadingStatus', {isLoading: false})
        console.log(error)
      }).then(()=>{
        this.$store.commit('updateLoadingStatus', {isLoading: false})
        if(callback){
          callback()
        }
      })
    };
    //post方式请求数据
    Vue.prototype.postData = function (url,formData,success,callback) {
      this.$http.post(url,formData).then((responese)=>{
        if(responese.data.code==="000000"){
          if(success){
            success(responese.data);
          }
        }else if(responese.data.code==="000001" || responese.data.code==="000002"){
          this.$vux.toast.text("登录失效，请重新登录", 'middle')
          cookie.remove('isLogin')
          cookie.remove('name')
          cookie.remove('picUrl')
          cookie.remove('type')
          cookie.remove('token')
          cookie.remove('id')
          setTimeout(()=>{
            this.$router.push('/login')
          },2000)
        }else{
          this.$vux.toast.text(responese.data.msg, 'middle')
        }
      }).catch(function(error){
        this.$store.commit('updateLoadingStatus', {isLoading: false})
        console.log(error)
      }).then(()=>{
        this.$store.commit('updateLoadingStatus', {isLoading: false})
        if(callback){
          callback()
        }
      })
    };
    //日期格式化为几分钟前、几小时前、几天前
    Vue.prototype.FormatMsgTime=function (time) {

      var dateTime = new Date(time);

      var year = dateTime.getFullYear();
      var month = dateTime.getMonth() + 1;
      var day = dateTime.getDate();
      var hour = dateTime.getHours();
      var minute = dateTime.getMinutes();
      var second = dateTime.getSeconds();
      var now = new Date();
      var now_new = Date.parse(now.toDateString());  //typescript转换写法

      var milliseconds = 0;
      var timeSpanStr;

      milliseconds = now_new - time;

      if (milliseconds <= 1000 * 60 * 1) {
        timeSpanStr = '刚刚';
      }
      else if (1000 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60) {
        timeSpanStr = Math.round((milliseconds / (1000 * 60))) + '分钟前';
      }
      else if (1000 * 60 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24) {
        timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60)) + '小时前';
      }
      else if (1000 * 60 * 60 * 24 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24 * 15) {
        timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + '天前';
      }
      else if (milliseconds > 1000 * 60 * 60 * 24 * 15 && year == now.getFullYear()) {
        timeSpanStr = month + '-' + day + ' ' + hour + ':' + minute;
      } else {
        timeSpanStr = year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
      }
      return timeSpanStr;
    };

  }
}
