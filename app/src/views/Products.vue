<template>
    <div class="cards">
        <div :key="product.code" class="card" v-for="product in products">
            <ProductCard :data="product"/>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex';
    import ProductCard from "@/components/ProductCard.vue";

    export default {
        name: "Products",
        components: {
            ProductCard
        },
        async mounted() {
            await this.getProducts();
        },
        computed: {
            ...mapState('main', [
                    'products',
                ],
            ),
        },
        methods: {
            ...mapActions('main', [
                'getProducts',
            ]),
            async getFormValues() {
                const inputKeys = Object.keys(this.$refs);
            },
        },
    };
</script>

<style lang="scss" scoped>


</style>
