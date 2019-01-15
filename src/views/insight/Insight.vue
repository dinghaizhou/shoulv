<template>
    <div class="insight">
        <div class="menu-title">{{this.$route.meta.title}}</div>
        <div class="flex-b" style="margin-bottom: 20px;height:150px;">
            <div class="innerbox flex-a" style="width:38%;">
                <annular-percent name="PC" type="PC" :percent="insightData && insightData.type ? insightData.type.PC : 0" color="#3f9eff"></annular-percent>
                <annular-percent name="Moblie" type="Moblie" :percent="insightData && insightData.type ? insightData.type.Mobile : 0" color="#3f9eff"></annular-percent>
                <annular-percent name="WeChat" type="WeChat" :percent="insightData && insightData.type ? insightData.type.WeChat : 0" color="#3f9eff"></annular-percent>
            </div>
            <div class="innerbox flex-a" style="width:29%;">
                <annular-percent name="Online" type="Online" :percent="insightData && insightData.type ? insightData.type.online : 0" color="#67d57f"></annular-percent>
                <annular-percent name="Offline" type="Offline" :percent="insightData && insightData.type ? insightData.type.offline : 0" color="#6d7076"></annular-percent>
            </div>
            <div class="innerbox" style="width:29%;">
                <person-percent :percent="insightData && insightData.type ? insightData.type.boy : 0" type="Male"></person-percent>                
                <person-percent :percent="insightData && insightData.type ? insightData.type.girl : 0" type="Female"></person-percent>                
            </div>
        </div>
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
    import ActiveUser from '@/components/ActiveUser_1.vue'
    import UserResource from './components/UserResource'
    import UserLocation from './components/UserLocation'
    import WechatFans from './components/WechatFans'
    import AnnularPercent from '@/components/AnnularPercent_1.vue'
    import PersonPercent from '@/components/PersonPercent'
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
            WechatFans,
            AnnularPercent,
            PersonPercent
        }


    }
</script>
<style lang="scss" scoped>
    .bottom-items {
        width:32%;
        height:360px;
        padding: 30px 30px 0 30px;
        background: #fff;
        box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.04)
    }
    
</style>

