<template>
    <div class="header-top" @click="goBack">
      <img class="back" src="../assets/mainpage/goback.png" alt="">
      <span class="backTitle">{{backTitle}}</span>
    </div>
</template>

<script>
    export default {
        props:["backTitle"],
        data () {
            return {}
        },
      methods:{
        goBack: function () {
          this.$router.go(-1);
        }
      }
    }
</script>

<style scoped>
  .header-top{
    height: 2rem;
    display: inline-block;
  }
  .back{
    margin-left:.6rem;
    margin-right:.2rem;
    vertical-align: middle;
  }
  .backTitle{
    font-size: .8rem;
    color: #333;
    line-height: 2rem;
  }
</style>
