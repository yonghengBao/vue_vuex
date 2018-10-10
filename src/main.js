// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import baseFunc from './js/base'
import { AjaxPlugin ,cookie,ToastPlugin,TransferDom,Scroller} from 'vux'
import Home from './components/HelloFromVux'
import HelloWorld from './components/HelloWorld'
import Login from './components/Login'
import Register from './components/Reg'
import Identity from './components/Identity'
import Suggestion from './components/Suggestion'
import Seller from './components/Seller'
import Scan from './components/Scan'
import Payment from './components/Payment'
import Apply from './components/Apply'
import AddApply from './components/AddApply'
import ApplyDetail from './components/ApplyDetail'
import Approval from './components/Approval'
import ApprovalDetail from './components/ApprovalDetail'
import TicketDetail from './components/TicketDetail'
import MainPage from './components/MainPage'
import Coupon from './components/Coupon'
import Unused from './components/coupon/Unused'
import Used from './components/coupon/Used'
import HaveExpired from './components/coupon/HaveExpired'
import './css/common.css'
Vue.use(VueRouter);//路由
Vue.use(AjaxPlugin);//ajax请求
Vue.use(baseFunc) //请求方法封装
import Vuex from 'vuex'
Vue.use(Vuex) //页面切换loading动画
Vue.prototype.$http.defaults.baseURL ="http://182.140.221.106:12219";//公共
//Vue.prototype.$http.defaults.baseURL ="http://10.120.1.191:9999";//奈落
Vue.component('scroller', Scroller) //无限滚动
Vue.use(ToastPlugin)//toast插件
Vue.directive('transfer-dom', TransferDom)
const routes = [
  {
    path: '/',
    redirect: '/mainpage'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register/:type',
    component: Register
  },
  {
    path: '/identity',
    component: Identity
  },
  {
    path: '/suggestion',
    component: Suggestion
  },
  {
    path: '/seller',
    component: Seller
  },
  {
    path: '/scan',
    component: Scan
  },
  {
    path: '/payment',
    component: Payment
  },
  {
    path: '/apply',
    component: Apply
  },
  {
    path: '/approval',
    component: Approval
  },
  {
    path: '/ticketDetail/:itemId',
    component: TicketDetail
  },

  {
    path: '/mainpage',
    component: MainPage
  },
  {
    path:'/coupon',
    component:Coupon,
    children:[
      {
        path:"/",
        component:Unused
      },
      {
        path:"/unused",
        component:Unused
      },
      {
        path:"/used",
        component:Used
      },
      {
        path:"/haveExpired",
        component:HaveExpired
      }
    ]
  },
  {
    path: '/applyDetail/:id',
    component: ApplyDetail
  },
  {
    path: '/approvalDetail/:id',
    component: ApprovalDetail
  },
  {
    path: '/addApply',
    component: AddApply
  },
  {
    path: '*',  //未匹配到路由地址
    redirect: '/mainpage'
  }
]

const router = new VueRouter({
  routes
})
//状态管理
const store = new Vuex.Store()
//定义控制是否显示加载动画的变量
store.registerModule('vux', {
  state: {
    isLoading: false
  },
  mutations: {
    updateLoadingStatus (state, payload) {//store中的变量isLoading通过该方法修改，且改方法只能用store.commit()方法调用(其他js文件中采用this.$store.commit())
      state.isLoading = payload.isLoading
    }
  }
})
// 全局路由守卫
router.beforeEach(function(to, from, next){
  const nextRoute = ['/mainpage','/scan','/payment','/identity','/suggestion','/seller','/apply','/approval','/ticketDetail','/coupon','/unused','/used','/haveExpired','/register/change'];
  if(nextRoute.indexOf(to.path)>=0){
    store.commit('updateLoadingStatus', {isLoading: true})
    let token = cookie.get('token')
    if(token){//判断用户是否登录
      Vue.prototype.$http.defaults.headers ={
        "Accept": "application/json;charset=UTF-8",
        'x-user-token':token
      }
      next()
    }else{
      next('/login')
    }
  }else{
    next()
  }
  if(to.path=="/login"){
    if(cookie.get('isLogin')==="true"){
      next('/mainpage')
    }else{
      next()
    }
  }
})
router.afterEach(function (to) {
  setTimeout(()=>{
    store.commit('updateLoadingStatus', {isLoading: false})
  },500)
})
FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  store: store,
  render: h => h(App)
}).$mount('#app-box')
