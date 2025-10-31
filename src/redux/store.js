import { configureStore } from '@reduxjs/toolkit';
import authApi from './feature/auth/authApi';
import cartApi from './feature/cart/cartApi';
import authReducer from './feature/auth/authSlice';
import productsApi from './feature/products/productsApi';
import categoriesApi from './feature/category/CategoriesApi';
import brandApi from './feature/brand/brandApi';
import procedureApi from './feature/procedure/procedure';
import sliderApi from './feature/slider/sliderApi';
import blogApi from './feature/blog/blogApi';
import newsletterApi from './feature/newsletter/newsletterApi';
import  {addressApi} from './feature/address/addressApi';
import pagesApi from './feature/pages/pagesApi';
import contactInfoApi from './feature/contact/contactInfoApi';
import ordersApi from './feature/orders/ordersApi';
import usersApi from './feature/users/usersApi';
import hotSellingApi from './feature/hotSellingApi/HotSellingApi';
import cartReducer from './feature/cart/cartSlice';

// Helper to load cart state from localStorage (client only)
const loadCartState = () => {
    try {
        if (typeof window === 'undefined') return undefined;
        const serialized = window.localStorage.getItem('cart_state');
        if (!serialized) return undefined;
        return { cart: JSON.parse(serialized) };
    } catch (err) {
        console.warn('Failed to load cart from localStorage', err);
        return undefined;
    }
};

// Helper to save cart state to localStorage
const saveCartState = (cartState) => {
    try {
        if (typeof window === 'undefined') return;
        const serialized = JSON.stringify(cartState);
        window.localStorage.setItem('cart_state', serialized);
    } catch (err) {
        console.warn('Failed to save cart to localStorage', err);
    }
};



export const store = configureStore({
    reducer: {
        [authApi.reducerPath] : authApi.reducer,
        auth: authReducer,
        [cartApi.reducerPath]: cartApi.reducer,
        cart: cartReducer,
        [productsApi.reducerPath]: productsApi.reducer,
        [categoriesApi.reducerPath]: categoriesApi.reducer,
        [brandApi.reducerPath]: brandApi.reducer,
        [procedureApi.reducerPath]: procedureApi.reducer,
        [sliderApi.reducerPath]: sliderApi.reducer,
        [blogApi.reducerPath]: blogApi.reducer,
        [newsletterApi.reducerPath]: newsletterApi.reducer,
        [addressApi.reducerPath]: addressApi.reducer,
        [hotSellingApi.reducerPath]: hotSellingApi.reducer,
        [pagesApi.reducerPath]: pagesApi.reducer,
        [contactInfoApi.reducerPath]: contactInfoApi.reducer,
        [ordersApi.reducerPath]: ordersApi.reducer,
        [usersApi.reducerPath]: usersApi.reducer,
        cart: cartReducer
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            authApi.middleware,
            cartApi.middleware,
            productsApi.middleware,
            categoriesApi.middleware,
            brandApi.middleware,
            procedureApi.middleware,
            sliderApi.middleware,
            blogApi.middleware,
            newsletterApi.middleware,
            addressApi.middleware,
            hotSellingApi.middleware,
            pagesApi.middleware,
            contactInfoApi.middleware,
            ordersApi.middleware,
            usersApi.middleware
        )
})

// Hydrate store from persisted cart state if available
const preloaded = loadCartState();
if (preloaded && preloaded.cart) {
    // Replace current cart slice with persisted
    store.dispatch({ type: 'cart/replaceStateFromPersist', payload: preloaded.cart });
}

// Subscribe to store updates and persist cart slice
let previousCart = store.getState().cart;
store.subscribe(() => {
    const currentCart = store.getState().cart;
    if (currentCart !== previousCart) {
        previousCart = currentCart;
        saveCartState(currentCart);
    }
});