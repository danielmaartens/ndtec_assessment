const express = require('express');
const cors = require('cors');
const {fetchAndProcessProducts} = require('./controller');

const app = express();
const port = 3000;

app.use(cors());

/**
 * Generally then '/' endpoint in api's are used for health-checking.
 * So I have changed the data request endpoint to '/products'
 * to make the purpose of the endpoint a bit clearer.
 */
app.get('/', (req, res) => {
    res('Success ! Your SimpleServer is running !');
});

/**
 * Ideally we want to do the processing of the data on the backend.
 * Using a POST method here makes it possible to send objects through as we expect an array.
 * This is more efficient as we have fewer things to worry about, such as using unnecessary
 * join functions on the front-end and parse or split functions on the back-end.
 *
 **/
app.get('/products', fetchAndProcessProducts);

app.listen(port, (err) => {
    if (err) {
        return console.log('yeeeeeeeeeeeeeeet!!!!', err);
    }

    console.log(`listening on ${port}`);
});