<template>
    <div class="person-percent">
        <div class="left-side">
            <ul class="p-l" :style="{'left': left + 'px'}">
                <li v-for="i in 10" :key="i"  :class="{'item':true, 'item-male-no': type == 'Male', 'item-female-no': type == 'Female'}"
                :style="{'width': itemWidth + 'px','height': itemHeight + 'px','marginRight': itemMargin + 'px',}"></li>
            </ul>
            <div class="item-mask p-l" :style="{'width': width + 'px', 'left': left + 'px'}">
                <ul > 
                    <li v-for="i in 10" :key="i"  :class="{'item':true, 'item-male-check': type == 'Male', 'item-female-check': type == 'Female'}"
                    :style="{'width': itemWidth + 'px','height': itemHeight + 'px','marginRight': itemMargin + 'px',}"></li>
                </ul>
            </div>
        </div>
        <div class="right-side">
            <div>
                <span class="block" :style="{'background': color}"></span>
                <span style="color:#909399">{{type}}</span>
            </div>
            <div style="padding-left:15px;font-size:18px;font-weight:500;color:#33363c;">
                {{percent}}%
            </div>
        </div>
    </div>
</template>
<script>
    import echarts from 'echarts'
    export default {
        components: {},
        props: ['percent', 'type', 'color'],
        data: () => {
            return {
                width: 0,
                left: 0,
                itemHeight: 35,
                itemWidth: 15,
                itemMargin: 2,
                chengshu: 1.7
            }
        },
        watch: {
             'percent'(value) {
                console.log(value)

                this.width = value * this.chengshu
                console.log(this.width)
            },
        },

        mounted() {
            if (document.body.offsetWidth <= 1280) {

            } else if(document.body.offsetWidth <= 1440) {
                this.chengshu = 2
                this.itemMargin = 5
            } else if (document.body.offsetWidth <= 1680){
                this.chengshu = 2
                this.itemMargin = 5
                this.left = 20
            } else {
                this.chengshu = 2
                this.itemMargin = 5
                this.left = 50
            }

        },
        methods: {
        }
    }
</script>
<style lang="scss" scoped>
    .person-percent{
        height: 50px;
        width: 100%;
        display: flex;
        .left-side {
            position:relative;
            width: 76%;  
            height: 50px;  
        }
        .right-side {
            width: 24%;
            height: 50px;
        }
        ul {
            width: 200px;
            height: 50px;
        }
    }
    .p-l {
        position:absolute;left:0;
    }
    .item {
        float: left;
    }
    .item-male-no {
        background: url(../../src/assets/images/men.png);
        background-size: 15px 35px;
        background-repeat: no-repeat;
    }
    .item-male-check {
        background: url(../../src/assets/images/men-check.png);
        background-size: 15px 35px;
        background-repeat: no-repeat;
    }
    .item-female-no {
        background: url(../../src/assets/images/girl.png);
        background-size: 15px 35px;
        background-repeat: no-repeat;
    }
    .item-female-check {
        background: url(../../src/assets/images/girl-check.png);
        background-size: 15px 35px;
        background-repeat: no-repeat;
    }
    .item-mask {
        width: 0px;
        overflow: hidden;
        transition: width 1.5s;
    }
    .block {
        display: inline-block;
        width: 5px;
        height: 10px;
        background: #55a4f6;
        margin-right: 10px;
    }
</style>

