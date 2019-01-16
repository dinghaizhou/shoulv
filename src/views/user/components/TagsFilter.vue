<template>
    <div class="tags-filter clearfix" v-loading="loading">
        <div>   
            <div class="title_1">自定义标签</div>
            <!-- <filter-checkbox :lists="lists"> </filter-checkbox> -->
            <div style="position:releative;">
                <swiper1 v-if="tagLists.length > 0" :options="swiperOption">
                    <!-- slides -->
                    <swiper-slide1 v-for="(item) in tagLists" :key="item.id">
                        <tags-checkbox :isDelete="isDelete" bottom="16px" v-model="tags" :lists="item" @change="filterChange" @delete="tagsDelete"> </tags-checkbox>
                    </swiper-slide1>
                    <!-- Optional controls -->
                    <div class="swiper-pagination" slot="pagination"></div>
                    <!-- <div class="swiper-button-prev swiper-button-black" slot="button-prev"></div> -->
                    <!-- <div class="swiper-button-next swiper-button-black" slot="button-next"></div> -->
                    <!-- <div class="swiper-scrollbar"   slot="scrollbar"></div> -->
                </swiper1>
                <div v-else class="none-tags">
                    <img src="@/assets/images/no-tag.png" style="width:200px;" alt="">
                    <div style="margin-top:24px;font-size: 14px;color: #575759;text-align:center;">还未创建标签</div>
                </div>
            </div>
        </div>
        <div class='flex-b'>
            <el-button class="button-mini" @click="tagManage" v-if="!isDelete">标签管理</el-button>
            <el-button class="button-mini" type="primary" @click="tagSave" v-else>保存</el-button>
            <div class="flex-b">
                <div style='height: 33px;width:33px;background:#eee;margin-right:10px;border-radius:5px;' class="flex">   
                    <div class="button-prev swiper-button-prev"></div>
                </div>
                <div style='height: 33px;width:33px;background:#eee;border-radius:5px;' class="flex">
                    <div class="button-next swiper-button-next"></div>
                </div>
                
            </div>
            
        </div>
       
       
    </div>
</template>
<script>
    import TagsCheckbox from '@/components/TagsCheckbox'
    import { swiper, swiperSlide } from 'vue-awesome-swiper' 
    import { mapState } from 'vuex'

    export default {
        name: 'tags-filter',
        components: {TagsCheckbox, swiper1: swiper, swiperSlide1: swiperSlide},
        data: () => {
            return {
                lists: [],
                loading: false,
                tags: '',
                isDelete: false,
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
                        nextEl: '.button-next',
                        prevEl: '.button-prev',
                        hiddenClass: 'swiper-button-hidden',
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
            },
            tagManage() {
                this.isDelete = true
                this.tags = ''
                this.$store.commit('changeFilterResult', {rate:0, searchTotal:0})
                this.$store.commit('changeTagId', '')
                this.$store.commit('changeTagName', '')
            },
            tagSave() {
                this.isDelete = false
            },
            tagsDelete(item, index, a) {
                this.$http.post('/api/Consumer/tagdel',{
                    id: item.id
                })
                .then(() => {
                    this.$message.success('删除成功')
                    this.$store.dispatch('getTagsLists')
                    return
                })
                .catch(() => {
                    this.$message.warning('删除失败')
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
    .tags-filter {
        .swiper-slide{
            padding: 20px 35px 5px 30px;
            // min-height:200px;
        }
        .button-prev{
            background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M0%2C22L22%2C0l2.1%2C2.1L4.2%2C22l19.9%2C19.9L22%2C44L0%2C22L0%2C22L0%2C22z'%20fill%3D'%23000000'%2F%3E%3C%2Fsvg%3E");
            width: 20px;
            height: 20px;
            background-size: 15px 15px;
            background-repeat: no-repeat;
            background-position: 2px 2px;
            right:0;
        }
        .button-next{
            background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M27%2C22L27%2C22L5%2C44l-2.1-2.1L22.8%2C22L2.9%2C2.1L5%2C0L27%2C22L27%2C22z'%20fill%3D'%23000000'%2F%3E%3C%2Fsvg%3E");
            width: 20px;
            height: 20px;
            background-size: 15px 15px;
            background-repeat: no-repeat;
            background-position: 2px 2px;
        }
        .swiper-pagination {
            bottom: 0px;
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

