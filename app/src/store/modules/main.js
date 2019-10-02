import axios from 'axios';
import {constants} from '../../../../config';

console.log('MAIN');
const initialState = {
    products: [],
    getProductsRequested: false,
    getProductsSuccess: false,
    getProductsError: false,
    currentBasket: [],
};

const GET_PRODUCTS_REQUESTED = '/main/GET_PRODUCTS_REQUESTED';
const GET_PRODUCTS_SUCCESS = '/main/GET_PRODUCTS_SUCCESS';
const GET_PRODUCTS_FAILURE = '/main/GET_PRODUCTS_FAILURE';

const ADD_TO_BASKET = '/main/ADD_TO_BASKET';
const REMOVE_FROM_BASKET = '/main/REMOVE_FROM_BASKET';

const actions = {
    async getProducts({commit, state}) {

        try {
            commit(GET_PRODUCTS_REQUESTED);

            const result = await axios.get(`${constants.SERVER_HOST}/products`);

            if (result && !result.error) {
                commit(GET_PRODUCTS_SUCCESS, result.data);
            } else if (!result || (result && result.error)) {
                commit(GET_PRODUCTS_FAILURE, result.error);
            }
        } catch (error) {
            commit(GET_PRODUCTS_FAILURE, {error});
        }
    },
    async addToBasket({commit, state}, product) {

        commit(ADD_TO_BASKET, product);

    },
    async removeFromBasket({commit, state}, product) {

        commit(REMOVE_FROM_BASKET, product);

    },
};

const mutations = {
    [ADD_TO_BASKET](state, payload) {

        // First check if item already exists in basket
        // If it does, increase by given quantity otherwise add to existing array.
        let product = state.currentBasket.find(p => p.code === payload.code);

        if (product) {
            product.quantity += payload.quantity || 1;
        } else {
            product = state.products.find(p => p.code === payload.code);
            product.quantity = payload.quantity || 1;
            state.currentBasket = [
                ...state.currentBasket,
                product,
            ];
        }
    },
    [REMOVE_FROM_BASKET](state, payload) {
        // First check if item already exists in basket
        // If it does, decrease by given quantity and if this deduction
        // results in 0 then remove entirely.
        let currentBasket = state.currentBasket;
        let product = state.currentBasket.find(p => p.code === payload.code);

        if (product && payload.quantity && product.quantity - payload.quantity !== 0) {
            product.quantity -= payload.quantity || 1;
        } else {
            state.currentBasket = state.currentBasket.filter(p => p.code !== payload.code);
        }

        const stop = true;
    },
    [GET_PRODUCTS_REQUESTED](state) {
        state.getProductsRequested = true;
        state.getProductsSuccess = false;
        state.getProductsError = false;
    },
    [GET_PRODUCTS_SUCCESS](state, data) {
        state.getProductsRequested = false;
        state.getProductsSuccess = true;
        state.products = data;
    },
    [GET_PRODUCTS_FAILURE](state, {error}) {
        state.getProductsRequested = false;
        state.getProductsSuccess = false;
        state.getProductsError = error;
    },
};

const getters = {
    getCurrentBasketProduct: (state) => (code) => {
        console.log('code: ', code);
        return state.currentBasket.find(p => p.code === code);
    },
};

export default {
    namespaced: true,
    state: initialState,
    actions,
    mutations,
    getters,
};
