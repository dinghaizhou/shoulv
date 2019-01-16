<template>
    <div class="tags-filter clearfix" v-loading="loading">
        <div class="title_1">自定义标签</div>
        <!-- <filter-checkbox :lists="lists"> </filter-checkbox> -->
        <swiper1 v-if="tagLists.length > 0" :options="swiperOption">
            <!-- slides -->
            <swiper-slide1 v-for="item in tagLists" :key="item.id">
                <filter-checkbox bottom="16px" v-model="tags" :lists="item" @change="filterChange"> </filter-checkbox>
            </swiper-slide1>
            <!-- Optional controls -->
            <!-- <div class="swiper-pagination" slot="pagination"></div> -->
            <div class="swiper-button-prev swiper-button-black" slot="button-prev"></div>
            <div class="swiper-button-next swiper-button-black" slot="button-next"></div>
            <!-- <div class="swiper-scrollbar"   slot="scrollbar"></div> -->
        </swiper1>

        <div v-else class="none-tags">
            <img src="@/assets/images/no-tag.png" style="width:300px;" alt="">
            <div style="margin-top:24px;font-size: 14px;color: #575759;text-align:center;">还未创建标签</div>
        </div>
    </div>
</template>
<script>
    import filterCheckbox from '@/components/FilterCheckbox'
    import { swiper, swiperSlide } from 'vue-awesome-swiper' 
    import { mapState } from 'vuex'

    export default {
        name: 'tags-filter',
        components: {filterCheckbox, swiper1: swiper, swiperSlide1: swiperSlide},
        data: () => {
            return {
                lists: [],
                loading: false,
                tags: '',
                swiperOption: {  
                    notNextTick: true,
                    //循环
                    // loop:true,
                    //设定初始化时slide的索引
                    initialSlide:0,
                    //自动播放
                    autoplay:false,
                    // autoplay: {
                    //     delay: 3000,
                    //     stopOnLastSlide: false,
                    //     disableOnInteraction: true,
                    // },
                    // 设置轮播
                    // effect : 'flip',
                    //滑动速度
                    speed:800,
                    //滑动方向
                    direction : 'horizontal',
                    //小手掌抓取滑动
                    // grabCursor : true,
                    //滑动之后回调函数
                    on: {
                        slideChangeTransitionEnd: function(){
                            // console.log(this.activeIndex);//切换结束时，告诉我现在是第几个slide
                        },
                    },
                    //左右点击
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                        hiddenClass: 'my-button-hidden',
                    },
                    //分页器设置         
                    pagination: {
                        el: '.swiper-pagination',
                        clickable :true
                    }
                }
            }
        },
        computed: {
            ...mapState({
                tagLists: state => state.user.tagLists,
                tagId: state => state.user.tagId,
            })
        },
        watch: {
            
        },
        mounted() {
            this.$store.dispatch('getTagsLists')
        },
        methods: {
            filterChange(res) {
                this.$store.commit('changePage', 1)
                this.$store.dispatch('getFilterResultById', res)
            }
        }
    }
</script>
<style lang="scss" scoped>
    .tags-filter {
        .swiper-slide{
            padding: 20px 35px 5px 30px;
            min-height:250px;
        }
        .swiper-button-prev{
            left: 5px;
            opacity: 0.5;
            width: 20px;
            height: 20px;
            background-size: 20px 20px;
        }
        .swiper-button-next{
            opacity: 0.5;
            width: 20px;
            height: 20px;
            background-size: 20px 20px;
            right: 20px;
        }
        .swiper-pagination {
            bottom: -5px;
        }
        img {
            display: block;
            margin: 0 auto;
        }
        .none-tags {
            padding: 20px;
        }
        
    }

</style>

