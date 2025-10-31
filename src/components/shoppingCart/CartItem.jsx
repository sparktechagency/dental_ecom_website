import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import Checkbox from "../../components/shared/Checkbox";
import { getBaseUrl } from "@/utils/getBaseUrl";

const CartItem = ({
  product,
  id,
  name,
  price,
  quantity,
  image,
  isSelected,
  onToggleSelect,
  onIncrement,
  onDecrement,
  onQuantityChange,
  onDeleteItem,
  isLoading = false,
}) => {
  //   const handleIncrement = (e) => {
  //     e.preventDefault();
  //     e.stopPropagation();
  //     if (onIncrement) onIncrement();
  //     return false;
  //   };
  const handleIncrement = (e) => {
    e.preventDefault();
    e.stopPropagation();

    e.currentTarget.disabled = true;
    if (onIncrement) onIncrement();

    setTimeout(() => {
      e.currentTarget.disabled = false;
    }, 1000);

    return false;
  };

  const handleDecrement = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.disabled = true;
    if (onDecrement) onDecrement();
    setTimeout(() => {
      e.currentTarget.disabled = false;
    }, 1000);

    return false;
  };

  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onDeleteItem) onDeleteItem();
    return false;
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuantityChange) onQuantityChange(e.target.value);
    return false;
  };

  const handleToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onToggleSelect) onToggleSelect();
    return false;
  };

  const displaySrc = (() => {
    if (image) return image;
    const first = product?.images?.[0];
    if (first) {
      const isAbsolute = /^https?:\/\//i.test(first);
      return isAbsolute ? first : `${getBaseUrl()}${first}`;
    }
    if (product?.image) return product.image;
    return "/image/icons/noproduct.png";
  })();

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-3 sm:p-4 border-b border-gray-600 last:border-b-0">
        {/* Checkbox and Image */}
        <div className="flex items-start w-full sm:w-auto">
          <div className="flex-shrink-0 mt-1">
            <Checkbox isSelected={isSelected} onSelect={handleToggle} />
          </div>
          <div className="flex-shrink-0 ml-3">
            <img
              src={displaySrc}
              alt={name}
              className="w-20 h-20 sm:w-16 sm:h-16 object-cover rounded-lg bg-neutral-700"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="flex-1 w-full min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-medium text-base sm:text-sm mb-1 line-clamp-2">{name}</h3>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                <p className="text-blue-300 text-sm font-semibold">
                  ${price.toFixed(2)}
                </p>
                <p className="text-white text-sm font-semibold">
                  × {quantity} = <span className="text-green-400">${(price * quantity).toFixed(2)}</span>
                </p>
              </div>
            </div>

            {/* Quantity Controls - Mobile */}
            <div className="sm:hidden mt-2 w-full">
              <div className="flex items-center justify-between bg-gray-800 p-2 rounded-lg">
                <span className="text-gray-300 text-sm">Quantity:</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleDecrement}
                    className={`w-9 h-9 ${
                      isLoading || quantity <= 1 ? 'bg-gray-700' : 'bg-gray-600 active:bg-gray-500'
                    } rounded flex items-center justify-center transition-colors`}
                    disabled={quantity <= 1 || isLoading}
                    type="button"
                    aria-label="Decrease quantity"
                  >
                    <FaMinus className="w-3 h-3 text-white" />
                  </button>
                  
                  <div className="relative w-12">
                    <input
                      type="number"
                      min={1}
                      disabled
                      value={quantity}
                      onChange={handleInputChange}
                      className="w-full px-2 py-1.5 rounded-md bg-gray-700 border border-gray-600 text-white text-center"
                      aria-label="Quantity"
                    />
                  </div>

                  <button
                    onClick={handleIncrement}
                    className={`w-9 h-9 ${
                      isLoading ? 'bg-gray-700' : 'bg-gray-600 active:bg-gray-500'
                    } rounded flex items-center justify-center transition-colors`}
                    disabled={isLoading}
                    type="button"
                    aria-label="Increase quantity"
                  >
                    <FaPlus className="w-3 h-3 text-white" />
                  </button>
                </div>
              </div>
            </div>

            {/* Quantity Controls - Desktop */}
            <div className="hidden sm:flex items-center gap-2">
              <div className="flex items-center bg-gray-800 px-2 py-1 rounded-md">
                <span className="text-gray-300 text-sm mr-2">Qty:</span>
                <div className="flex items-center">
                  <button
                    onClick={handleDecrement}
                    className={`w-7 h-7 ${
                      isLoading || quantity <= 1 ? 'bg-gray-700' : 'bg-gray-600 hover:bg-gray-500'
                    } rounded-l flex items-center justify-center transition-colors`}
                    disabled={quantity <= 1 || isLoading}
                    type="button"
                    aria-label="Decrease quantity"
                  >
                    <FaMinus className="w-3 h-3 text-white" />
                  </button>
                  
                  <div className="relative w-10">
                    <input
                      type="number"
                      min={1}
                      disabled
                      value={quantity}
                      onChange={handleInputChange}
                      className="w-full px-1 py-1 bg-gray-700 border-t border-b border-gray-600 text-white text-center text-sm"
                      aria-label="Quantity"
                    />
                  </div>

                  <button
                    onClick={handleIncrement}
                    className={`w-7 h-7 ${
                      isLoading ? 'bg-gray-700' : 'bg-gray-600 hover:bg-gray-500'
                    } rounded-r flex items-center justify-center transition-colors`}
                    disabled={isLoading}
                    type="button"
                    aria-label="Increase quantity"
                  >
                    <FaPlus className="w-3 h-3 text-white" />
                  </button>
                </div>
              </div>
            </div>

            {/* Delete Button */}
            <div className="sm:flex-shrink-0 mt-2 sm:mt-0 w-full sm:w-auto">
              <button
                onClick={handleDelete}
                className={`w-full sm:w-auto px-4 py-2 text-sm ${
                  isLoading ? 'bg-red-700' : 'bg-red-600 hover:bg-red-500 active:bg-red-400'
                } text-white rounded-lg sm:rounded transition-colors flex items-center justify-center`}
                type="button"
                disabled={isLoading}
                aria-label="Remove item"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                ) : (
                  'Remove Item'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
