<template>
  <div id="app" :class="{myApp:isFlag}">
    <loading :show="isLoading" class="myloading"></loading>
    <transition name="slide-fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import { Loading } from 'vux'
  import { mapState } from 'vuex'
export default {
  name: 'app',
  components: {
    Loading
  },
  computed: {
    ...mapState({
        isLoading: state => state.vux.isLoading
    })
  },
  data: function () {
    return{
      isFlag:false
    }
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
.myloading .weui-toast{background: rgba(0,0,0,0);}
.slide-fade{
  /*position: absolute;left:0;right: 0;*/
}
.slide-fade-enter-active {
  transition: all .3s linear;
}
/*.slide-fade-leave-active {*/
  /*transition: all .1s linear;*/
/*}*/
.slide-fade-enter, .slide-fade-leave-to
{
  /*left:0;right: 0;*/
  transform: translateX(5rem);
  opacity: 0;
}
</style>
