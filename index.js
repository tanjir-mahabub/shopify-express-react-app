import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { Shopify } from '@shopify/shopify-api';
dotenv.config();

import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const host = '127.0.0.1';
const port = 5000;

const {SHOPIFY_API_KEY, SHOPIFY_API_SECRET, SHOPIFY_API_SCOPES, HOST} = process.env;

const shops = {};

Shopify.Context.initialize({
    API_KEY: SHOPIFY_API_KEY,
    API_SECRET_KEY: SHOPIFY_API_SECRET,
    SCOPES: SHOPIFY_API_SCOPES,
    HOST_NAME: HOST,
    IS_EMBEDDED_APP: true,
});

const app = express();


app.get('/', async (req, res) => {
    if (typeof shops[req.query.shop] !== 'undefined') {
        //res.send('HEllo World!');
        app.use(express.static(path.resolve(__dirname, './client/build')));
        res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
    } else {
        res.redirect(`/auth?shop=${req.query.shop}`);
    }
});

app.get('/auth', async (req, res) => {
    const authRoute = await Shopify.Auth.beginAuth(
        req,
        res,
        req.query.shop,
        '/auth/callback',
        false,
    )
    console.log(authRoute)
    res.redirect(authRoute);
});

// accessToken redirection
app.get('/auth/callback', async (req, res) => {
    const shopSession = await Shopify.Auth.validateAuthCallback(
        req,
        res,
        req.query
    );

    console.log(shopSession);

    shops[shopSession.shop] = shopSession;

    res.redirect(`https://${shopSession.shop}/admin/apps/node-app-113`);
});


app.listen(port, () => {
    console.log(`Server running at http://${host}:${port}/`);
});