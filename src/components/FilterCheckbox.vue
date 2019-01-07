<template>
    <div class="filter-checkbox clearfix">
        <ul>
            <li :class="{'active': item.id == value }" v-for="(item) in lists" :key="item.id"
            @click="select(item.id)"
            :style="{ marginBottom: bottom, marginRight: right }">{{item.name}}</li>
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
            select(id) {
                this.$emit('input', id)
                this.$emit('change', id)
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
                line-height: 36px;
                border: 1px solid #dcdfe6;
                border-radius: 5px;
                margin: 0 10px 10px 0;
                cursor: pointer;
                box-sizing: border-box;
            }
            li.active {
                color: #0486fe;
                border:1px solid #0486fe;
            }
        }
    }

</style>
