"use client";
import BreadCrumb from "@/components/shared/BreadCrumb";
import CartHeader from "@/components/shoppingCart/CartHeader";
import CartItem from "@/components/shoppingCart/CartItem";
import OrderSummary from "@/components/shoppingCart/OrderSummary";
import {
  useGetCartQuery,
  useClearCartMutation,
  useRemoveCartItemMutation,
  useUpdateCartItemMutation,
} from "@/redux/feature/cart/cartApi";
import {
  setCartFromServer,
  setItemQuantity,
} from "@/redux/feature/cart/cartSlice";
import { getBaseUrl } from "@/utils/getBaseUrl";
import { useRouter } from "next/navigation";
import React, { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ShoppingCart = () => {
  const dispatch = useDispatch();
  const navigate = useRouter();
  const user = useSelector((state) => state?.auth?.user);
  const {
    data: cartData,
    isFetching,
    error,
    refetch,
  } = useGetCartQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
  });
  const [clearCart] = useClearCartMutation();
  const [removeCartItem] = useRemoveCartItemMutation();
  const [updateCartItem] = useUpdateCartItemMutation();

  const products = useMemo(() => {
    if (!cartData?.data?.items) return [];

    const items = cartData.data.items;
    if (!Array.isArray(items)) return [];

    return items
      .map((item) => ({
        _id: item.product?._id || item.productId,
        cartItemId: item._id,
        name: item.product?.name,
        price: item.product?.price || 0,
        images: item.product?.images || [],
        image: item.product?.image,
        quantity: Math.max(1, Number(item.quantity) || 1),
        availability: item.product?.availability || "In Stock",
      }))
      .filter((p) => !!p._id);
  }, [cartData]);

  useEffect(() => {
    const items = cartData?.data?.items || cartData?.items;
    if (Array.isArray(items)) {
      dispatch(setCartFromServer(items));
    }
  }, [dispatch, cartData]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !user) {
      navigate.push("/sign_in");
    }
  }, [mounted, user, navigate]);

  const [selectedMap, setSelectedMap] = useState({});
  useEffect(() => {
    const next = {};
    products.forEach((p) => {
      next[p.cartItemId] = true;
    });
    setSelectedMap(next);
  }, [products]);

  // Optimistic quantities per cart line (keyed by cartItemId)
  const [quantitiesMap, setQuantitiesMap] = useState({});
  useEffect(() => {
    const next = {};
    products.forEach((p) => {
      next[p.cartItemId] = p.quantity;
    });
    setQuantitiesMap(next);
  }, [products]);

  const selectedProducts = products
    .filter((p) => selectedMap[p.cartItemId])
    .map((p) => ({
      ...p,
      quantity: quantitiesMap[p.cartItemId] ?? p.quantity,
    }));
  const subtotal = selectedProducts.reduce(
    (sum, p) => sum + p.price * p.quantity,
    0
  );

  const total = subtotal;

  const allSelected =
    products.length > 0 &&
    products.every((product) => selectedMap[product.cartItemId]);

  const handleToggleSelect = (cartItemId) => {
    setSelectedMap((prev) => ({ ...prev, [cartItemId]: !prev[cartItemId] }));
  };

  const handleSelectAll = () => {
    const flag = !allSelected;
    const next = {};
    products.forEach((p) => {
      next[p.cartItemId] = flag;
    });
    setSelectedMap(next);
  };

  const handleUpdateQuantity = async (cartItemId, type) => {
    const product = products.find((p) => p.cartItemId === cartItemId);
    if (!product) return;

    const current = quantitiesMap[cartItemId] ?? product.quantity ?? 1;
    const next = type === "increment" ? current + 1 : Math.max(1, current - 1);

    setQuantitiesMap((prev) => ({ ...prev, [cartItemId]: next }));

    dispatch(setItemQuantity({ id: product._id, quantity: next }));

    try {
      await updateCartItem({
        productId: product._id,
        quantity: next,
      }).unwrap();
      // Refresh from server and sync Redux
      const res = await refetch();
      const items = res?.data?.data?.items || res?.data?.items;
      if (Array.isArray(items)) {
        dispatch(setCartFromServer(items));
      }
    } catch (e) {
      setQuantitiesMap((prev) => ({ ...prev, [cartItemId]: current }));
      dispatch(setItemQuantity({ id: product._id, quantity: current }));
      console.error("Failed to update quantity", e);
    }
  };

  const handleDirectQuantityChange = async (cartItemId, newQuantity) => {
    const product = products.find((p) => p.cartItemId === cartItemId);
    if (!product) return;

    const current = quantitiesMap[cartItemId] ?? product.quantity ?? 1;
    const parsed = parseInt(newQuantity, 10);
    const next = Math.max(1, isNaN(parsed) ? 1 : parsed);

    setQuantitiesMap((prev) => ({ ...prev, [cartItemId]: next }));

    dispatch(setItemQuantity({ id: product._id, quantity: next }));

    try {
      await updateCartItem({
        productId: product._id,
        quantity: next,
      }).unwrap();
      // Refresh from server and sync Redux
      const res = await refetch();
      const items = res?.data?.data?.items || res?.data?.items;
      if (Array.isArray(items)) {
        dispatch(setCartFromServer(items));
      }
    } catch (e) {
      setQuantitiesMap((prev) => ({ ...prev, [cartItemId]: current }));
      dispatch(setItemQuantity({ id: product._id, quantity: current }));
      console.error("Failed to set quantity", e);
    }
  };

  const handleDeleteSelected = async () => {
    const selected = products.filter((p) => selectedMap[p.cartItemId]);
    if (selected.length === 0) return;

    if (selected.length === products.length) {
      try {
        await clearCart().unwrap();
        const res = await refetch();
        const items = res?.data?.data?.items || res?.data?.items;
        if (Array.isArray(items)) {
          dispatch(setCartFromServer(items));
        }
      } catch (e) {
        console.error(e);
      }
      return;
    }

    try {
      await Promise.allSettled(
        selected.map((p) => removeCartItem(p._id).unwrap())
      );
      const res = await refetch();
      const items = res?.data?.data?.items || res?.data?.items;
      if (Array.isArray(items)) {
        dispatch(setCartFromServer(items));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteItem = async (cartItemId) => {
    const product = products.find((p) => p.cartItemId === cartItemId);
    if (!product) return;
    try {
      await removeCartItem(product._id).unwrap();
      setQuantitiesMap((prev) => {
        const next = { ...prev };
        delete next[cartItemId];
        return next;
      });
      setSelectedMap((prev) => {
        const next = { ...prev };
        delete next[cartItemId];
        return next;
      });
      const res = await refetch();
      const items = res?.data?.data?.items || res?.data?.items;
      if (Array.isArray(items)) {
        dispatch(setCartFromServer(items));
      }
    } catch (e) {
      console.error("Failed to delete item", e);
    }
  };

  const handleProceedToCheckout = () => {
    if (selectedProducts.length === 0) {
      alert("Please select at least one product to checkout");
      return;
    }
    navigate.push("/checkout");
  };

  const getProductImage = (product) => {
    if (product?.images && product.images.length > 0 && product.images[0]) {
      return `${getBaseUrl()}${product.images[0]}`;
    }
    if (product?.image) {
      return `${getBaseUrl()}${product.image}`;
    }
    return "/image/icons/noproduct.png";
  };

  if (mounted && !user) return null;

  return (
    <div className="min-h-screen py-10 px-5 md:px-0">
      <div className="container mx-auto">
        <div className="container mx-auto flex justify-start items-center">
          <BreadCrumb name="Home" title="Cart" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Cart Items Section */}
          <div className="lg:col-span-2">
            <div className="bg-[#202020] rounded-lg p-5">
              <CartHeader
                selectedCount={selectedProducts.length}
                onSelectAll={handleSelectAll}
                onDeleteSelected={handleDeleteSelected}
                allSelected={allSelected}
              />

              <div className="mb-5">
                <div className="flex items-center justify-between text-gray-400 text-sm font-medium mb-4">
                  <span>Product</span>
                  <span>QTY</span>
                </div>
                <div className="border-t border-gray-600 pt-4"></div>
              </div>

              <div className="space-y-0">
                {!mounted || isFetching ? (
                  <div className="text-center py-10 text-gray-400">
                    Loading your cart...
                  </div>
                ) : error ? (
                  <div className="text-center py-10 text-red-500">
                    Failed to load cart
                  </div>
                ) : products.length > 0 ? (
                  products.map((product) => (
                    <CartItem
                      key={product.cartItemId}
                      product={product}
                      id={product.cartItemId}
                      name={product.name}
                      price={product.price}
                      quantity={
                        quantitiesMap[product.cartItemId] ?? product.quantity
                      }
                      image={getProductImage(product)}
                      isSelected={!!selectedMap[product.cartItemId]}
                      onToggleSelect={() =>
                        handleToggleSelect(product.cartItemId)
                      }
                      onIncrement={() =>
                        handleUpdateQuantity(product.cartItemId, "increment")
                      }
                      onDecrement={() =>
                        handleUpdateQuantity(product.cartItemId, "decrement")
                      }
                      onQuantityChange={(newQty) =>
                        handleDirectQuantityChange(product.cartItemId, newQty)
                      }
                      onDeleteItem={() => handleDeleteItem(product.cartItemId)}
                    />
                  ))
                ) : (
                  <div className="text-center py-10 text-gray-400">
                    Your cart is empty
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="lg:col-span-1 bg-[#202020]">
            <OrderSummary
              subtotal={subtotal}
              total={total}
              onProceedToCheckout={handleProceedToCheckout}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;