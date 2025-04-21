import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { thunk } from 'redux-thunk';
import productData from './products';

const middleware = [thunk];

if (process.env.NODE_ENV === "development") {
    middleware.push(logger);
}

export const store = createStore(productData, applyMiddleware(...middleware));