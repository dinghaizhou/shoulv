import http from '@/utils/http'
import { Message } from 'element-ui';
export default {
    state: {
        filterMode: 'custom',
        filters: null,
        filterResult: {rate:0, searchTotal:0, },
        page: 1,
        pageSize: 10,
        loading_search: false,
        loading_table: false,
        tagId: '',
        tagName: '',
        tagLists: [],
        loading_setTag: false,
        hasAdd: false,
        canAdd: false,
    },
    mutations: {
        changeFilterMode(state, value) {
            state.filterMode = value
        },
        changeFilterResult(state, value) {
            state.filterResult = value
        },
        changeFilters(state, value) {
            state.filters = value
        },
        changePage(state, value) {
            state.page = value
        },
        changePageSize(state, value) {
            state.pageSize = value
        },
        changeLoading(state,value) {
            state.loading_search = value
        },
        changeLoadingTable(state,value) {
            state.loading_table = value
        },
        changeLoadingSetTag(state,value) {
            state.loading_setTag = value
        },
        changeTagId(state,value) {
            state.tagId = value
        },
        changeTagName(state,value) {
            state.tagName = value
        },
        changeTagLists(state, value) {
            state.tagLists = value
        },
        changeHasAdd(state, value) {
            state.hasAdd = value
        },
        changeCanAdd(state, value) {
            state.canAdd = value
        }
    },
    actions: {
        getFilterResultByFilters(store, filters) {
            store.commit('changeLoading', true)
            http.post("/api/Consumer/search", {
                ...filters,
                page: store.state.page, 
                pageSize: store.state.pageSize
            })
            .then((res) => {
                store.commit('changeHasAdd', false)
                store.commit('changeLoading', false)
                store.commit('changeFilterResult', res.data)
                store.commit('changeFilters', filters)
            })
            .catch((res) => {
                store.commit('changeLoading', false)
                if(!res.msg) Message.warning('网络错误')
            })
        },
        getFilterResultById(store, res) {
            var id = res.id
            var name = res.name
            store.commit('changeLoading', true)
            http.post("/api/Consumer/getUserListByTagId", {
                id,
                page: store.state.page, 
                pageSize: store.state.pageSize
            })
            .then((res) => {
                store.commit('changeLoading', false)
                store.commit('changeFilterResult', res.data)
                store.commit('changeTagId', id)
                store.commit('changeTagName', name)
                store.commit('changeFilters', null)
                store.commit('changeCanAdd', false)
                store.commit('changeHasAdd', true)
            })
            .catch((res) => {
                store.commit('changeLoading', false)
                if(!res.msg) Message.warning('网络错误')

            })
        },
        getFilterResultByPage(store) {
            store.commit('changeLoadingTable', true)
            if(store.state.filterMode == 'custom') {
                http.post("/api/Consumer/search", {
                    ...store.state.filters,
                    page: store.state.page, 
                    pageSize: store.state.pageSize
                })
                .then((res) => {
                    store.commit('changeLoadingTable', false)
                    store.commit('changeFilterResult', res.data)
                })
                .catch((res) => {
                    if(!res.msg) Message.warning('网络错误')
                    store.commit('changeLoadingTable', false)
                })
            } else {
                http.post("/api/Consumer/getUserListByTagId", {
                    id:  store.state.tagId,
                    page: store.state.page, 
                    pageSize: store.state.pageSize
                })
                .then((res) => {
                    store.commit('changeLoadingTable', false)
                    store.commit('changeFilterResult', res.data)
                })
                .catch((res) => {
                    store.commit('changeLoadingTable', false)
                    if(!res.msg) Message.warning('网络错误')
                })
            }
        },
        getTagsLists(store) {
            http.get('/api/Consumer/getTagsList', {loading: this})
            .then((res) => {
                var origin_lists = res.data
                var lists = []
                for (var i = 0; i < origin_lists.length; i ++) {
                    var j = Math.floor(i/30)
                    if(!lists[j]) lists[j] = []
                    lists[j].push(origin_lists[i])
                }
                store.commit('changeTagLists', lists)
            })
        }
    },
    getters: {
        
    }
}