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
import { getBaseUrl } from "@/utils/getBaseUrl";
import { useRouter } from "next/navigation";
import React, { useState, useMemo, useEffect } from "react";
import { useSelector } from "react-redux";

const ShoppingCart = () => {
  const {
    data: cartData,
    isFetching,
    error,
  } = useGetCartQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
  });
  const [clearCart] = useClearCartMutation();
  const [removeCartItem] = useRemoveCartItemMutation();
  const [updateCartItem] = useUpdateCartItemMutation();
  const user = useSelector((state) => state?.auth?.user);

  // Normalize server items
  const products = useMemo(() => {
    if (!cartData?.data?.items) return [];

    return cartData.data.items
      .map((item) => ({
        _id: item.product?._id, 
        cartItemId: item._id, 
        name: item.product?.name,
        price: item.product?.price || 0,
        images: item.product?.images || [],
        image: item.product?.image,
        quantity: Math.max(1, Number(item.quantity) || 1),
      }))
      .filter((p) => !!p._id);
  }, [cartData]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  
  const [productQuantities, setProductQuantities] = useState({});
  const [loadingItems, setLoadingItems] = useState({});

  useEffect(() => {
    const initialQuantities = {};
    products.forEach((product) => {
      initialQuantities[product._id] = product.quantity;
    });
    setProductQuantities(initialQuantities);
  }, [products]);

 
  const [selectedMap, setSelectedMap] = useState({});
  useEffect(() => {
    const next = {};
    products.forEach((p) => {
      next[p._id] = true;
    });
    setSelectedMap(next);
  }, [products]);

  const selectedProducts = products.filter((p) => selectedMap[p._id]);
  const subtotal = selectedProducts.reduce((sum, p) => {
    const quantity = productQuantities[p._id] || p.quantity;
    return sum + p.price * quantity;
  }, 0);

  const total = subtotal;

  const allSelected =
    products.length > 0 &&
    products.every((product) => selectedMap[product._id]);

 
  const handleIncrementQuantity = async (productId) => {
    const currentQty = productQuantities[productId] || 1;
    const newQty = currentQty + 1;

    console.log("🔄 Increment:", productId, currentQty, "→", newQty);

    // Set loading state
    setLoadingItems(prev => ({ ...prev, [productId]: true }));
    
    // Optimistic update
    setProductQuantities((prev) => ({
      ...prev,
      [productId]: newQty,
    }));

    try {
      await updateCartItem({
        productId: productId, 
        quantity: newQty,
      }).unwrap();

      console.log("Quantity updated successfully:");
    } catch (error) {
      // Revert on error
      setProductQuantities((prev) => ({
        ...prev,
        [productId]: currentQty,
      }));
      console.error("Failed to update quantity:", error);
    } finally {
      // Clear loading state
      setLoadingItems(prev => ({ ...prev, [productId]: false }));
    }
  };

  const handleDecrementQuantity = async (productId) => {
    const currentQty = productQuantities[productId] || 1;
    const newQty = Math.max(1, currentQty - 1);

    console.log("🔄 Decrement:", productId, currentQty, "→", newQty);

    // Set loading state
    setLoadingItems(prev => ({ ...prev, [productId]: true }));
    
    // Optimistic update
    setProductQuantities((prev) => ({
      ...prev,
      [productId]: newQty,
    }));

    try {
      await updateCartItem({
        productId: productId, 
        quantity: newQty,
      }).unwrap();

      console.log("Quantity updated successfully:");
    } catch (error) {
      // Revert on error
      setProductQuantities((prev) => ({
        ...prev,
        [productId]: currentQty,
      }));
      console.error("Failed to update quantity:", error);
    } finally {
      // Clear loading state
      setLoadingItems(prev => ({ ...prev, [productId]: false }));
    }
  };

  const handleQuantityChange = async (productId, newQuantity) => {
    const validQuantity = Math.max(1, parseInt(newQuantity) || 1);
    const currentQty = productQuantities[productId] || 1;

    console.log("🔄 Direct change:", productId, currentQty, "→", validQuantity);

    // Set loading state
    setLoadingItems(prev => ({ ...prev, [productId]: true }));
    
    // Optimistic update
    setProductQuantities((prev) => ({
      ...prev,
      [productId]: validQuantity,
    }));

    try {
      await updateCartItem({
        productId: productId, 
        quantity: validQuantity,
      }).unwrap();

      console.log("Quantity updated successfully:");
    } catch (error) {
      // Revert on error
      setProductQuantities((prev) => ({
        ...prev,
        [productId]: currentQty,
      }));
      console.error("Failed to update quantity:", error);
    } finally {
      // Clear loading state
      setLoadingItems(prev => ({ ...prev, [productId]: false }));
    }
  };

  const handleToggleSelect = (id) => {
    setSelectedMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSelectAll = () => {
    const flag = !allSelected;
    const next = {};
    products.forEach((p) => {
      next[p._id] = flag;
    });
    setSelectedMap(next);
  };

  const handleDeleteItem = async (productId) => {
    console.log("🗑️ Deleting product:", productId);

    try {
      const result = await removeCartItem(productId).unwrap();
      console.log(" Item deleted successfully:", result);
    } catch (error) {
      console.error(" Failed to delete item:", error);
    }
  };

  const handleDeleteSelected = () => {
    const selected = products.filter((p) => selectedMap[p._id]);
    if (selected.length === 0) return;

    if (selected.length === products.length) {
      clearCart().unwrap().catch(console.error);
      return;
    }

    Promise.allSettled(
      selected.map((p) => removeCartItem(p._id).unwrap())
    ).catch(console.error);
  };

  const navigate = useRouter();
  const handleProceedToCheckout = () => {
    if (!user) {
      navigate.push('/sign_in');
      return;
    }
    if (selectedProducts.length === 0) {
      alert('Please select at least one product to checkout');
      return;
    }
    navigate.push('/checkout');
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

  return (
    <div className="min-h-screen py-10 px-5 md:px-0">
      <div className="container mx-auto">
        <div className="container mx-auto flex justify-start items-center">
          <BreadCrumb name="Home" title="Cart" />
        </div>

        <div className="bg-blue-900 p-4 my-4 rounded">
          <h3 className="text-white font-bold">Debug Info:</h3>
          <p className="text-white">Products: {products.length}</p>
          <p className="text-white">Using Product ID for API calls</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
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
                {products.length > 0 ? (
                  products.map((product) => (
                    <CartItem
                      key={product._id}
                      product={product}
                      id={product._id}
                      name={product.name}
                      price={product.price}
                      quantity={
                        productQuantities[product._id] || product.quantity
                      }
                      image={getProductImage(product)}
                      isSelected={!!selectedMap[product._id]}
                      onToggleSelect={() => handleToggleSelect(product._id)}
                      onIncrement={() => handleIncrementQuantity(product._id)}
                      onDecrement={() => handleDecrementQuantity(product._id)}
                      onQuantityChange={(newQty) =>
                        handleQuantityChange(product._id, newQty)
                      }
                      onDeleteItem={() => handleDeleteItem(product._id)}
                      isLoading={loadingItems[product._id] || false}
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
