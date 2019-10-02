import Vue from 'vue';
import Vuex from 'vuex';
import main from './modules/main';
import createLogger from 'vuex/dist/logger';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        main,
    },
    plugins: [createLogger()],
});
