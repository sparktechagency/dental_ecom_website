// app/checkout/page.jsx
"use client"
import React, { useState } from "react"
import { useRouter } from "next/navigation"
import BreadCrumb from "@/components/shared/BreadCrumb"
import Checkbox from "@/components/shared/Checkbox"
import { useSelector, useDispatch } from 'react-redux'
import { clearCartLocal } from '@/redux/feature/cart/cartSlice'
import { getBaseUrl } from '@/utils/getBaseUrl'
import { useFetchMyAddressesQuery, useDeleteAddressMutation } from '@/redux/feature/address/addressApi'
import { useCreateOrderMutation } from '@/redux/feature/orders/ordersApi'
import { RiDeleteBinLine } from "react-icons/ri"

export default function Checkout() {
    const [isSelected, setIsSelected] = useState("")
    const [selectedPayment, setSelectedPayment] = useState("bank")
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [selectedAddress, setSelectedAddress] = useState(null)

    const { data: addressesData, isLoading: addressesLoading, error: addressesError } = useFetchMyAddressesQuery()
    const [deleteAddress, { isLoading: isDeleting }] = useDeleteAddressMutation()
    const [createOrder, { isLoading: placing }] = useCreateOrderMutation()

    const addresses = addressesData || []
    const router = useRouter()
    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart || {})
    const selectedProducts = cart.products?.filter(p => p.selected) || []
    
    const subtotal = selectedProducts.reduce((total, product) => {
        return total + (product.price * product.quantity)
    }, 0)
    
    const total = subtotal

    const handleDelete = async () => {
        try {
            await deleteAddress(selectedAddress._id).unwrap()
            setShowDeleteModal(false)
            if (isSelected === selectedAddress._id) {
                setIsSelected("")
            }
        } catch (error) {
            console.error('Failed to delete address:', error)
            alert('Failed to delete address. Please try again.')
        }
    }

    const handlePlaceOrder = async () => {
        if (!isSelected) {
            alert("Please select a shipping address")
            return
        }
        if (!selectedPayment) {
            alert("Please select a payment method")
            return
        }
        if (selectedProducts.length === 0) {
            alert("Please add products to cart first")
            return
        }

        const methodMap = { bank: 'stripe' };
        const payload = {
            addressId: isSelected,
            paymentMethod: methodMap[selectedPayment] || selectedPayment
        }

        try {
            const res = await createOrder(payload).unwrap()
            try { dispatch(clearCartLocal()); } catch {}
            const paymentUrl = res?.data?.payment?.url
            if (paymentUrl) {
                window.location.href = paymentUrl
                return
            }
            router.push('/congratulations')
        } catch (e) {
            console.error('Failed to place order', e)
            alert(e?.data?.message || 'Failed to place order')
        }
    }

    const formatAddress = (address) => {
        return `${address.city}, ${address.state}, ${address.country} - ${address.postalCode}`
    }

    const getFullName = (address) => {
        return `${address.recipientFirstName || ''} ${address.recipientLastName || ''}`.trim()
    }

    const getProductImage = (product) => {
        const candidates = [];
        if (Array.isArray(product?.images)) candidates.push(product.images[0]);
        candidates.push(product?.image);
        if (Array.isArray(product?.product?.images)) candidates.push(product.product.images[0]);
        candidates.push(product?.product?.image);

        let img = candidates.find(Boolean) || '';
        if (!img) return '/image.png';
        if (/^https?:\/\//i.test(img)) return img;
        return `${getBaseUrl()}${img}`;
    };

    return (
        <div className="px-5 md:px-0">
            <div className="container mx-auto flex justify-start items-center py-4">
                <BreadCrumb name="Home" title="Checkout" />
            </div>
            
            <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Shipping Address */}
                <div className="space-y-5 bg-[#202020] p-5 rounded-lg">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl text-white font-semibold">Select Shipping Address</h2>
                        <button 
                            onClick={() => router.push("/profile")} 
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
                        >
                            Add New Address
                        </button>
                    </div>
                    <div className="border-b-2 border-gray-700 my-4"></div>

                    {addressesLoading ? (
                        <div className="text-center py-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                            <p className="text-gray-400 mt-2">Loading addresses...</p>
                        </div>
                    ) : addressesError ? (
                        <div className="text-center py-8">
                            <p className="text-red-400">Error loading addresses</p>
                            <button 
                                onClick={() => window.location.reload()} 
                                className="text-blue-400 hover:text-blue-300 mt-2"
                            >
                                Try Again
                            </button>
                        </div>
                    ) : addresses.length === 0 ? (
                        <div className="text-center py-8">
                            <p className="text-gray-400">No addresses found</p>
                            <button 
                                onClick={() => router.push("/add_address")} 
                                className="text-blue-400 hover:text-blue-300 mt-2"
                            >
                                Add your first address
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {addresses.map((address) => (
                                <div
                                    key={address._id}
                                    className={`bg-neutral-700 border rounded-lg p-4 transition-colors ${
                                        isSelected === address._id ? 'border-blue-500' : 'border-gray-700'
                                    }`}
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-start space-x-3 flex-1">
                                            <div 
                                                onClick={() => setIsSelected(address._id)} 
                                                className="cursor-pointer mt-1"
                                            >
                                                <Checkbox isSelected={isSelected === address._id} />
                                            </div>
                                            <div className="space-y-1 flex-1">
                                                <div className="flex items-center space-x-2">
                                                    <span className="font-medium text-white">
                                                        {getFullName(address)}
                                                    </span>
                                                    <span
                                                        className={`px-2 py-1 text-xs rounded capitalize ${
                                                            address.type === "home" 
                                                                ? "bg-blue-600 text-blue-100"
                                                                : address.type === "office" 
                                                                ? "bg-green-600 text-green-100"
                                                                : "bg-purple-600 text-purple-100"
                                                        }`}
                                                    >
                                                        {address.type}
                                                    </span>
                                                </div>
                                                <p className="text-gray-300 text-sm">
                                                    Email: {address.recipientEmail}
                                                </p>
                                                <p className="text-gray-300 text-sm">
                                                    {address.streetNo}
                                                </p>
                                                <p className="text-gray-300 text-sm">
                                                    {formatAddress(address)}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex space-x-2 ml-3">
                                            <button
                                                onClick={() => {
                                                    setSelectedAddress(address)
                                                    setShowDeleteModal(true)
                                                }}
                                                disabled={isDeleting}
                                                className="text-red-400 hover:text-red-300 disabled:opacity-50"
                                                title="Delete address"
                                            >
                                                <RiDeleteBinLine className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Order Summary + Payment */}
                <div className="space-y-5">
                    <div className="bg-[#202020] p-5 rounded-lg">
                        <h3 className="text-xl text-white font-semibold mb-4">Order Summary</h3>
                        <div className="border-b-2 border-gray-700 mb-4"></div>

                        <div className="space-y-4">
                            {selectedProducts.length === 0 ? (
                                <div className="text-center py-8 text-gray-400">
                                    <p>No products in cart</p>
                                    <button 
                                        onClick={() => router.push('/product')}
                                        className="text-blue-400 hover:text-blue-300 mt-2"
                                    >
                                        Continue Shopping
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <div className="grid grid-cols-3 gap-4 text-sm font-medium text-gray-300 mb-2">
                                        <span>Product</span>
                                        <span className="text-center">Quantity</span>
                                        <span className="text-right">Price</span>
                                    </div>
                                    
                                    {selectedProducts.map((product) => (
                                        <div key={product._id || product.id} className="grid grid-cols-3 gap-4 items-center py-3 border-b border-gray-700">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                                                    <img
                                                        src={getProductImage(product)}
                                                        alt={product.name}
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => {
                                                            e.target.src = '/image.png'
                                                        }}
                                                    />
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-sm text-white font-medium truncate">
                                                        {product.name}
                                                    </p>
                                                    <p className="text-xs text-gray-400">
                                                        ${product.price?.toFixed(2)} each
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-center text-gray-300">
                                                <span className="bg-gray-700 px-2 py-1 rounded text-sm">
                                                    {product.quantity}
                                                </span>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-white font-semibold">
                                                    ${((product.price || 0) * (product.quantity || 1)).toFixed(2)}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </>
                            )}
                        </div>

                        {/* Price Summary */}
                        <div className="space-y-2 mt-6 pt-4 border-t border-gray-700">
                            <div className="flex justify-between text-sm text-gray-300">
                                <span>Subtotal ({selectedProducts.length} items)</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            
                            <div className="flex justify-between text-lg font-semibold text-white pt-2 border-t border-gray-700">
                                <span>Total Amount</span>
                                <span className="text-blue-400">${total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Payment Method */}
                    <div className="bg-[#202020] p-5 rounded-lg">
                        <h3 className="text-xl text-white font-semibold mb-4">Payment Method</h3>
                        <div className="border-b-2 border-gray-700 mb-4"></div>

                        <div className="space-y-4">
                            <div 
                                className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                                    selectedPayment === "bank" ? 'bg-blue-500/20 border border-blue-500' : 'bg-neutral-700 hover:bg-neutral-600'
                                }`}
                                onClick={() => setSelectedPayment("bank")}
                            >
                                <div className="flex items-center space-x-3">
                                    <Checkbox isSelected={selectedPayment === "bank"} />
                                    <span className="text-gray-300">Bank Transfer</span>
                                </div>
                                <div className="flex space-x-2">
                                    {["VISA", "MC", "PP", "GP"].map((method) => (
                                        <div key={method} className="w-8 h-6 bg-white rounded flex items-center justify-center text-xs font-bold text-gray-800">
                                            {method}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handlePlaceOrder}
                            disabled={placing}
                            className="w-full bg-[#136BFB] text-white py-3 mt-6 rounded-lg font-semibold hover:bg-[#0f5ae6] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                         {placing ? 'Placing...' : 'Place Order'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Delete Modal */}
            {showDeleteModal && selectedAddress && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-[#202020] rounded-lg p-6 w-full max-w-md">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-semibold text-white">Delete Address</h3>
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="text-gray-400 hover:text-white text-lg"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="mb-6">
                            <p className="text-gray-300 mb-4">Are you sure you want to delete this address?</p>
                            <div className="bg-neutral-700 rounded-lg p-3">
                                <div className="flex items-center space-x-2 mb-2">
                                    <span className="font-medium text-white">{getFullName(selectedAddress)}</span>
                                    <span className={`px-2 py-1 text-xs rounded capitalize ${
                                        selectedAddress.type === "home" 
                                            ? "bg-blue-600 text-blue-100"
                                            : selectedAddress.type === "office" 
                                            ? "bg-green-600 text-green-100"
                                            : "bg-purple-600 text-purple-100"
                                    }`}>
                                        {selectedAddress.type}
                                    </span>
                                </div>
                                <p className="text-gray-300 text-sm">{selectedAddress.streetNo}</p>
                                <p className="text-gray-300 text-sm">{formatAddress(selectedAddress)}</p>
                            </div>
                        </div>

                        <div className="flex space-x-3">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={isDeleting}
                                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                            >
                                {isDeleting ? "Deleting..." : "Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}