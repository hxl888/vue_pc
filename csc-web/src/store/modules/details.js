/**
 * Created by zhangwen on 2016/12/22.
 */
import * as types from '../mutation-types';

const state = {
    products: {},
    num: 1
};

const getters = {
    allProduct: state => state.products,
    productName: state => {
        return state.num;
    }
};

const actions = {
    getProducts({commit, state}, payload) {
        commit(types.LIST_SENDPRODUCTS, payload);
    },
    changeNum({commit, state}) {
        commit(types.GET_DETAILSNUM);
    }
};

const mutations = {
    [types.LIST_SENDPRODUCTS](state, proItem) {
        state.products = proItem;
    },
    [types.GET_DETAILSNUM](state) {
        state.num = state.num + 5;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
