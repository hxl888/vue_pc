/**
 * Created by zhangwen on 2016/12/22.
 */
import * as types from '../mutation-types';

const state = {
    count: 0
};

const getters = {
    otherThings: function (state) {
        let counts = state.count + 5;
        return counts;
    }
};

const actions = {
    todos({commit, state}, payload) {
        commit(types.SOME_MUTATION, payload.amount);
    }
};

const mutations = {
    [types.SOME_MUTATION](state, id) {
        state.count++;
        console.log(id);
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
