<template>
    <div class="panel">
        <el-row class="panel-top">
            <el-col :span="18">
                <img class='pull-left logo' src="../assets/images/logo.png">
                <div class='pull-left'>爱点击CDP</div>
            </el-col>
            <el-col :span="6" class="logout">
                <a href="javascript:;" @click='logout' class="pull-right">退出</a>			
                <span class="pull-right">欢迎, haizhou</span>
            </el-col>
        </el-row>
        <div class="panel-menu">
            <ul>
                <router-link v-for="item in routerList" :key="item.path"  tag="li" :to="'/' + item.path">{{item.meta.title}}</router-link>
            </ul>
        </div>
        <div class="panel-center">
            
            <div class="panel-content">
                <router-view></router-view>
            </div>
        </div>
    </div>
    
</template>

<script>
// @ is an alias to /src

    export default {
        name: 'home',
        data: () => {
            return {

            }
        },
        props: {
        },
        mounted() {
        },
        computed: {
            routerList() {
                return this.$store.state.login.router.filter((item) => {
                    return item.path == "/"
                })[0].children 

            }
        },
        methods: {
            logout() {
                this.$store.commit('loginOut')
                location.reload()
            }
        }
    
    }
</script>
