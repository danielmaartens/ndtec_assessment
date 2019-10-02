<template>
    <div>
        <div v-if="currentBasket.length === 0" class="no-items-container">
            <h3>There are no items in your basket :(</h3>
            <p>
                Click
                <router-link class="nav-to-products" to="/">here</router-link>
                to browse around !
            </p>
        </div>
        <div class="cards">
            <div :key="product.code" class="card" v-for="product in currentBasket">
                <ProductCard source="basket" :data="product" :basket="currentBasket"/>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex';
    import ProductCard from "@/components/ProductCard.vue";

    export default {
        name: "Basket",
        components: {
            ProductCard
        },
        computed: {
            ...mapState('main', [
                    'currentBasket',
                ],
            ),
        },
    };
</script>

<style lang="scss" scoped>
    .no-items-container {
        margin: 0 auto;
        margin-top: 20px;
        text-align: center;
    }

    .nav-to-products {
        background: none;
        text-decoration: none;
        font-weight: bolder;
    }
</style>
