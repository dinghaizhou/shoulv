import http from '@/utils/http'
export default {
    state: {
        filterMode: 'custom',
        filters: null,
        filterResult: {rate:0, searchTotal:0, },
        page: 1,
        pageSize: 10,
        loading_serach: false,
        tagId: ''
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
        changeLoadingChange(state,value) {
            state.loading_serach = value
        },
        changeTagId(state,value) {
            state.tagId = value
        }
    },
    actions: {
        getFilterResultByFilters(store, filters) {
            store.commit('changeLoadingChange', true)
            http.post("/api/Consumer/search", {
                ...filters,
                page: store.state.page, 
                pageSize: store.state.pageSize
            })
            .then((res) => {
                store.commit('changeLoadingChange', false)
                store.commit('changeFilterResult', res.data)
                store.commit('changeFilters', filters)
            })
        },
        getFilterResultById(store, id) {
            store.commit('changeLoadingChange', true)
            http.post("/api/Consumer/getUserListByTagId", {
                id,
                page: store.state.page, 
                pageSize: store.state.pageSize
            })
            .then((res) => {
                store.commit('changeLoadingChange', false)
                store.commit('changeFilterResult', res.data)
                store.commit('changeTagId', id)
            })
        },
        getFilterResultByPage(store) {
            store.commit('changeLoadingChange', true)
            if(store.state.filterMode == 'custom') {
                http.post("/api/Consumer/search", {
                    ...store.state.filters,
                    page: store.state.page, 
                    pageSize: store.state.pageSize
                })
                .then((res) => {
                    store.commit('changeLoadingChange', false)
                    store.commit('changeFilterResult', res.data)
                })
            } else {
                http.post("/api/Consumer/getUserListByTagId", {
                    id:  store.state.tagId,
                    page: store.state.page, 
                    pageSize: store.state.pageSize
                })
                .then((res) => {
                    store.commit('changeLoadingChange', false)
                    store.commit('changeFilterResult', res.data)
                })
            }


        }
    },
    getters: {
        
    }
}