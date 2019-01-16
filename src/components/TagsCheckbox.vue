<template>
    <div class="filter-checkbox clearfix">
        <ul>
            <li :class="{'active': item.id == value , 'normal': !isDelete, 'delete': isDelete}" v-for="(item,index) in lists" :key="item.id"
            @click="select(item)"
            :style="{ marginBottom: bottom, marginRight: right }">{{item.name}}
            <span class="deleteX" v-if="isDelete" @click="deleteTag(item,index)">+</span>
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        name: 'filter-checkbox',
        props: {
            lists: {
                default: []
            },
            bottom: {
                default: '10px'
            },
            right: {
                default: '10px'
            },
            value: {
                default: ''
            },
            isDelete: {
                default: false
            }
        },
        data: () => {
            return {
                result: ''
            }
        },
        mounted() {
            this.result = this.value
        },
        methods: {
            select(item) {
                if(!this.isDelete) {
                    this.$emit('input', item.id)
                    this.$emit('change', item)
                }
            },
            deleteTag(item,index) {
                console.log(333)
                this.$emit('delete', item, index)
            }
        }
    }
</script>
<style lang="scss" scoped>
    .filter-checkbox {
        ul {
            li {
                font-size: 12px;
                color: #636569;
                float: left;
                padding: 0 10px;
                line-height: 32px;
                border: 1px solid #dcdfe6;
                border-radius: 5px;
                margin: 0 10px 10px 0;
                box-sizing: border-box;
            }
            li.normal {
                cursor: pointer;
            }
            li.normal.active {
                color: #0486fe;
                border:1px solid #0486fe;
            }
            li.delete {
                border:1px solid #0486fe;
                color: #0486fe;
                span {
                    cursor: pointer;
                }
            }
        }

        .deleteX {
            margin-left: 10px;
            font-size: 18px;    
            display: inline-block;
            transform: rotate(45deg)
        }
    }

</style>
