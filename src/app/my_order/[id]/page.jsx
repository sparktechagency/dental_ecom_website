import BreadCrumb from '@/components/shared/BreadCrumb';
import React, { Suspense } from 'react';



const OrderDetails = ({
    orderId = "#1234",
    status = "Pending",
    placedDate = "25/05/2025",
    address = "c block , Road no : 03 ,Banasree ,Dhaka",
    product = {
        name: "Walden Tesla Air Rotor",
        price: 300.00,
        quantity: 1,
        image: "https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=1"
    },
    subtotal = 300.00,
    total = 300.00
}) => {
    const handleCancelOrder = () => {
        console.log('Cancel order clicked');
    };

    const handleExportInvoice = () => {
        console.log('Export invoice clicked');
    };

    return (
      <Suspense fallback={
        <div className="min-h-screen flex justify-center items-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      }>
          <div className='py-10'>
            <div className='my-5 container mx-auto'>
                <BreadCrumb
                    title="Order Details"
                    name="Home"
                />
            </div>
            <div className="bg-gray-900 text-white p-6 rounded-2xl max-w-xl mx-auto shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-xl font-semibold">Orders Details</h1>
                    <button className="text-blue-400 hover:text-blue-300 transition-colors">
                        {/* <FiRotateCcw size={20} /> */}
                        <img src="/download.svg" alt="" />
                    </button>
                </div>

                {/* Order Info */}
                <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between">
                        <span className="text-gray-300 text-sm">{orderId}</span>
                        <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                            {status}
                        </span>
                    </div>

                    <div className="text-gray-300 text-sm">
                        <span className="text-gray-400">Placed on : </span>
                        {placedDate}
                    </div>

                    <div className="text-gray-300 text-sm">
                        <span className="text-gray-400">Address : </span>
                        {address}
                    </div>
                </div>

                {/* Product Details */}
                <div className="flex items-center space-x-4 mb-8">
                    <div className="w-16 h-16 bg-gray-700 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="flex-1 min-w-0">
                        <h3 className="text-white text-sm font-medium mb-1 truncate">
                            {product.name}
                        </h3>
                        <p className="text-blue-400 text-sm font-medium">
                            Price : ${product.price.toFixed(2)}
                        </p>
                    </div>

                    <div className="text-gray-300 text-sm">
                        <span className="text-gray-400">Qty : </span>
                        {product.quantity.toString().padStart(2, '0')}
                    </div>
                </div>

                {/* Order Summary */}
                <div className="space-y-3 mb-8">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Subtotal</span>
                        <span className="text-white text-sm">{subtotal.toFixed(2)}$</span>
                    </div>

                    <div className="border-t border-gray-700 pt-3">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-400 text-sm">Total :</span>
                            <span className="text-blue-400 text-lg font-semibold">{total.toFixed(2)}$</span>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4">
                    <button
                        onClick={handleCancelOrder}
                        className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded-xl font-medium transition-colors duration-200"
                    >
                        Cancel Order
                    </button>

                    <button
                        onClick={handleExportInvoice}
                        className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-xl font-medium transition-colors duration-200"
                    >
                        Export Invoice
                    </button>
                </div>
            </div>
        </div>
      </Suspense>
    );
};

export default OrderDetails;