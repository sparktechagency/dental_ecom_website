import { createSlice } from "@reduxjs/toolkit";

// Helper function to safely get initial cart state
const getInitialCartState = () => {
  if (typeof window === 'undefined') {
    return {
      products: [],
      selectedItems: 0,
      totalPrice: 0,
      selectedSubtotal: 0,
    };
  }

  try {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : {
      products: [],
      selectedItems: 0,
      totalPrice: 0,
      selectedSubtotal: 0,
    };
  } catch (error) {
    console.error('Error loading cart from localStorage:', error);
    return {
      products: [],
      selectedItems: 0,
      totalPrice: 0,
      selectedSubtotal: 0,
    };
  }
};

const saveCart = (state) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem("cart", JSON.stringify(state));
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
};

const initialState = getInitialCartState();

const calculateCartTotals = (products) => {
  const selectedItems = products.reduce((total, product) => total + (product.quantity || 0), 0);
  const totalPrice = products.reduce((total, product) => total + (product.quantity || 0) * (product.price || 0), 0);
  const selectedSubtotal = products
    .filter((product) => product.selected)
    .reduce((total, product) => total + (product.quantity || 0) * (product.price || 0), 0);
  return { selectedItems, totalPrice, selectedSubtotal };
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const isExist = state.products.find((product) => product._id === action.payload._id);
      if (!isExist) {
        state.products.push({ ...action.payload, quantity: action.payload.quantity || 1, selected: true });
     
      } else {
        const addQty = action.payload.quantity || 1;
        isExist.quantity = (isExist.quantity || 0) + addQty;
        
      }
      const totals = calculateCartTotals(state.products);
      Object.assign(state, totals);
      saveCart(state);
    },

    updateQuantity: (state, action) => {
      const product = state.products.find((item) => item._id === action.payload.id);
      if (product) {
        if (action.payload.type === "increment") product.quantity += 1;
        else if (action.payload.type === "decrement" && product.quantity > 1) product.quantity -= 1;
      }
      Object.assign(state, calculateCartTotals(state.products));
      saveCart(state);
    },

    removeFromCart: (state, action) => {
      state.products = state.products.filter((product) => product._id !== action.payload.id);
      Object.assign(state, calculateCartTotals(state.products));
      saveCart(state);
    },

    toggleSelect: (state, action) => {
      const product = state.products.find((item) => item._id === action.payload.id);
      if (product) {
        product.selected = !product.selected;
      }
      Object.assign(state, calculateCartTotals(state.products));
      saveCart(state);
    },

    selectAll: (state, action) => {
      const flag = !!action.payload?.selected;
      state.products = state.products.map((p) => ({ ...p, selected: flag }));
      Object.assign(state, calculateCartTotals(state.products));
      saveCart(state);
    },

    removeSelected: (state) => {
      state.products = state.products.filter((p) => !p.selected);
      Object.assign(state, calculateCartTotals(state.products));
      saveCart(state);
    },

    setItemQuantity: (state, action) => {
      const { id, quantity } = action.payload || {};
      const product = state.products.find((item) => item._id === id);
      if (product) {
        product.quantity = Math.max(1, Number(quantity) || 1);
      }
      Object.assign(state, calculateCartTotals(state.products));
      saveCart(state);
    },

    setCartFromServer: (state, action) => {
      const items = Array.isArray(action.payload) ? action.payload : [];

      state.products = items.map((it) => ({
        // Always prefer the PRODUCT id for Redux identity
        _id: it.product?._id || it.productId || it._id,
        name: it.name || it.product?.name,
        price: it.price ?? it.product?.price ?? 0,
        image: it.image || it.product?.image,
        quantity: Math.max(1, Number(it.quantity) || 1),
        selected: typeof it.selected === 'boolean' ? it.selected : true,
      })).filter(p => !!p._id);
      Object.assign(state, calculateCartTotals(state.products));
      saveCart(state);
    },

    clearCartLocal: (state) => {
      state.products = [];
      state.selectedItems = 0;
      state.totalPrice = 0;
      state.selectedSubtotal = 0;
      saveCart(state);
    },
  },
});

export const { addToCart, updateQuantity, removeFromCart, clearCartLocal, toggleSelect, selectAll, removeSelected, setItemQuantity, setCartFromServer } = cartSlice.actions;
export default cartSlice.reducer;