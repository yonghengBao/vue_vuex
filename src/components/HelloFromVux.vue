<template>
  <div>
    <div class="vux-demo">
      <img class="logo" src="../assets/vux_logo.png">
      <h1> </h1>
    </div>
    <group title="cell demo">
      <cell title="VUX" value="进入主页面"  link="/mainpage"></cell>
    </group>
  </div>
</template>

<script type="text/ecmascript-6">
import { Group, Cell } from 'vux'

export default {
  components: {
    Group,
    Cell
  },
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      msg: 'Hello World!'
    }
  },
  created:function(){
    this.$http.get('http://jsonplaceholder.typicode.com/users').then((response) => {
      console.log(response)
      if(response.status=="200"){
        console.log(response.data)
      }
  }).catch(function(error){
      console.log(error)
    }).then(function(){
      console.log(333)
    })
  }
}
</script>

<style>
.vux-demo {
  text-align: center;
}
.logo {
  width: 100px;
  height: 100px
}
</style>
