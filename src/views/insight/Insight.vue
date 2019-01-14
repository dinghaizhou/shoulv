<template>
    <div class="insight">
        <div class="menu-title">{{this.$route.meta.title}}</div>
        <div class="innerbox" style="margin-bottom: 20px;">
            <active-user :insightData="insightData"></active-user>
        </div>
        <div class="flex-b">
            <div class="bottom-items">
                <user-location :insightData="insightData"></user-location>
            </div>
            <div class="bottom-items">
                <user-resource></user-resource>
            </div>
            <div class="bottom-items">
                <wechat-fans></wechat-fans>
            </div>
        </div>
    </div>
</template>
<script>
    import ActiveUser from '@/components/ActiveUser.vue'
    import UserResource from './components/UserResource'
    import UserLocation from './components/UserLocation'
    import WechatFans from './components/WechatFans'
    export default {
        name: 'insight',
        data: () => {
            return {
                insightData: {}
            }
        },
        mounted() {
            this.$http.get('/api/Insight/getAllInsight')
            .then((res) => {
                this.insightData = res.data
            })
            
        },
        methods: {

        },
        components: {
            ActiveUser,
            UserResource,
            UserLocation,
            WechatFans
        }


    }
</script>
<style lang="scss" >
    .bottom-items {
        width:32%;
        height:360px;
        padding: 30px 30px 0 30px;
        background: #fff;
        box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.04)
    }
</style>

