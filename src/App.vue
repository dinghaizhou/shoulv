<template>
  <div id="app" v-loading.fullscreen='loading'>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
    name: 'app',
    data: () => {
        return {
            name: '122',
            loading: false
        }
    },
    mounted() {
        
        
    }
}
</script>
