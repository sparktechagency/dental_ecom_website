import Link from 'next/link';
import React from 'react';

const OrderSummary = ({
    subtotal,
    total,
    onProceedToCheckout
}) => {

    return (
        <div className="rounded-lg p-5">
            <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>

            <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center">
                    <span className="text-gray-400">Subtotal</span>
                    <span className="text-white font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-600 pt-4">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-lg">Total :</span>
                        <span className="text-blue-400 font-bold text-xl">${total.toFixed(2)}</span>
                    </div>
                </div>
            </div>

            <button
                onClick={onProceedToCheckout}
                className="w-full bg-[#136BFB] hover:bg-blue-600 text-white font-semibold py-4 px-6 rounded-xl transition-colors duration-200"
            >
                Proceed To Checkout
            </button>
        </div>
    );
};

export default OrderSummary;