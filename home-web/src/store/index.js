/**
 * Created by zhangwen on 2016/12/22.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import * as getters from './getters';
import indexPage from './modules/index_page';
import details from './modules/details';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    strict: debug,
    actions,
    getters,
    modules: {
        indexPage,
        details
    }
});
