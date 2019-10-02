<template>

    <div :key="product.code" class="card-container">
        <div class="card-content">
        <div v-if="getQuantity() > 0" class="quantity-counter">
            <span >{{getQuantity()}}</span>
        </div>
        <div v-else class="fake-counter">
            <span ></span>
        </div>
                <div class="card-details">
                    <div class="description">{{product.description}}</div>
                    <div class="price">
                        <span class="rands">R{{product.randsCents.length > 0 ? product.randsCents[0] : 0}}</span>
                        <span class="cents"><sup>{{product.randsCents[1]}}</sup></span>
                    </div>
                </div>
            <img class="image" :alt="product.description" :src="product.image" height="120px" width="120px"/>
            <div v-if="source === 'basket'">
                <div class="quantity" :key="getQuantity()">
                    <b>Quantity:</b> {{getQuantity()}}
                </div>
            </div>

        <button class="basket-button remove-button" v-if="source === 'basket'" @click.prevent="remove()">
            Remove From Basket
        </button>
        <button class="basket-button add-button" v-else @click.prevent="add()">
            Send To Basket
        </button>
        </div>
    </div>
</template>

<script>
    import {constants} from "../../../config";
    import {mapActions, mapGetters, mapState} from 'vuex';

    export default {
        name: "ProductCard",
        props: {
            data: Object,
            source: String,
            basket: Array,
        },
        data() {
            return {
                product: {
                    description: '',
                    image: '',
                    price: 0,
                    code: '',
                    quantity: 0,
                    randsCents: [],
                }
            };
        },
        async mounted() {
            this.product.description = this.data[constants.PRODUCT_DESCRIPTION];
            this.product.price = this.data[constants.PRODUCT_PRICE];
            this.product.code = this.data.code;
            this.product.uom = this.data[constants.PRODUCT_UOM];
            this.product.image = this.data.image;
            this.product.quantity = this.data.quantity;
            this.product.randsCents = this.randsAndCents();
        },
        computed: {
            ...mapGetters('main', [
                    'getCurrentBasketProduct',
                ],
            ),
            ...mapState('main', [
                    'currentBasket',
                ],
            ),
        },
        methods: {
            ...mapActions('main', [
                'addToBasket',
                'removeFromBasket',
            ]),
            getQuantity() {
                console.log('COMPONENT code ', this.product.code);

                if (this.product.code !== '') {
                    const product = this.getCurrentBasketProduct(this.product.code);
                    console.log('product', product);


                    return product ? product.quantity : null;
                }
            },
            async add() {
                await this.addToBasket({code: this.product.code});
                this.product.quantity = this.getCurrentBasketProduct(this.product.code).quantity;
            },
            async remove(quantity) {
                await this.removeFromBasket({
                    code: this.product.code,
                    quantity: quantity,
                });

                this.$forceUpdate();
            },
            randsAndCents() {
                return this.product.price.toFixed(2).split('.');
            },
            handleQuantityChange(e) {
                e.preventDefault();
                const value = Number(e.target.value);
                const difference = value - this.product.quantity;

                this.addToBasket({
                    code: this.product.code,
                    quantity: difference,
                });

                this.$forceUpdate();
            }
        },
    };
</script>

<style lang="scss" scoped>

    .card-container {
        min-height: 150px;
        margin: 10px 10px 10px 10px;
    }

    .product-info {

    }

    .card-details {
        display: inline-block;
        padding-right: 10px;
        width: 100%;
        text-align: center;
    }


    .description {
        width: 100%;
        margin: 0 auto;
        font-weight: bold;
        font-size: 20px;
    }

    .price {
        height: 100%;
        color: #637B78;

    }

    .quantity {
        padding-top: 20px;
    }

    .rands {
        display: inline-block;
        font-weight: bolder;
    }

    .cents {
        display: inline-block;
    }

    .image {
        margin-top: 20px;
    }

    .basket-button {
        margin: 20px 0 10px 0;
        padding: 10px 0 10px 0;
        width: 100%;
        border-radius: 10px;
        color: #eff8e2;
        cursor: pointer;

    }

    .add-button {
        background: linear-gradient(0deg, #548687, #B1C8C8);
    }

    .remove-button {
        background: linear-gradient(0deg, #742D3A, #D35269);

    }

    .quantity-counter {
        color: white;
        background: linear-gradient(0deg, #742D3A, #D35269);
        text-align: center;
        position: relative;
        height: 50px;
        width: 50px;
        font-size: 30px;
        font-weight: bolder;
        border-radius: 30px;
        float: right;
        left: 28px;

    }

    .fake-counter {
        position: relative;
        height: 50px;
        width: 50px;
        border-radius: 30px;
        float: right;
        left: 28px;
    }

    .quantity-counter span {
        top: 5px;
        position: relative;
    }

    .fake-counter span {
        top: 5px;
        position: relative;
    }

    .card-content {
        position: relative;
        bottom: 35px;
    }
</style>
