<template>
  <div class="dashboard-container">
    <component :is="currentRole"/>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import adminDashboard from './admin'
import userDashboard from './user'
import request_dc from '@/utils/request_dc'

  export default {
    name: "Dashboard",
    components: {adminDashboard, userDashboard},
    data(){
      return{
        currentRole: 'adminDashboard'
      }
    },
    computed:{
      ...mapGetters(['roles'])
    },
    created() {
      this.currentRole = 'userDashboard'
      // if(!this.roles.includes('admin')){
      //   this.currentRole = 'userDashboard'
      // }
    },
    mounted(){
      // request_dc({
      //   url: '/sql/s3fdc5bcb1c85868fbfd5ec882dc73407/getCjlw',
      //   method: 'post'
      // }).then(res=>{
      //   // console.log(res)
      // }).catch(error => {
      //   // console.log(error)
      // })
    }
  }
</script>

<style scoped>

</style>
