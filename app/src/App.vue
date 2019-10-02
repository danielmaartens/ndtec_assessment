<template>
    <div id="app">
        <div id="nav">
            <router-link to="/">
                <div class="nav-button">
                    Browse Products
                </div>
            </router-link>
            <router-link to="/basket">
                <div class="nav-button">
                    Checkout Basket
                </div>
            </router-link>
        </div>
        <router-view/>
    </div>
</template>

<style lang="scss">
    #app {
        font-family: "Avenir", Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin: 0 5px 0 5px;
    }

    #nav {
        margin-bottom: 10px;
        padding: 30px 0 30px 0;
        display: inline-block;
        width: 100%;
        background: #B1C8C8;
    }

    #nav a {
        font-weight: bold;
        color: #2c3e50;
        text-decoration: none;
    }

    .nav-button {
        background: #B1C8C8;
        display: inline-block;
        width: 20%;
        text-align: center;
        margin: 0 auto;
    }

    #nav a.router-link-exact-active {
        color: #64748C;
    }

    button {
        &:active, &:focus {
            outline: none;
        }
    }

    .cards {
        margin-top: 25px;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        grid-auto-rows: auto;

      grid-row-gap: .5rem;
      grid-column-gap: 1rem;
    }

    .card {
        border: 1px solid #56445D;
        border-radius: 4px;
        padding: .5rem;
        height: 85%;
    }

</style>
