<template>
    <div class="insight">
        <div class="menu-title">{{this.$route.meta.title}}</div>
        <div class="innerbox" style="margin-bottom: 20px;">
            <active-user></active-user>
        </div>
        <div class="flex-b">
            <div class="bottom-items">
                <user-resource></user-resource>
            </div>
            <div class="bottom-items">
                <wechat-fans></wechat-fans>
            </div>
            <div class="bottom-items">
                <user-location></user-location>
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

            }
        },
        mounted() {
            
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

    }
</style>

