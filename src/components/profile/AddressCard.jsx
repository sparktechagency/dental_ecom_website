// AddressCard.jsx
import React from 'react';
import { TbUserEdit } from 'react-icons/tb';
import { RiDeleteBinLine } from 'react-icons/ri';

const AddressCard = ({
    name,
    type,
    mobile,
    address,
    city,
    onEdit,
    onDelete,
    isDeleting = false
}) => {
    const getTypeColor = (addressType) => {
        switch (addressType?.toLowerCase()) {
            case 'home':
                return 'border-[#136BFB] border-2 text-[#136BFB]';
            case 'office':
                return 'border-green-500 border-2 text-green-500';
            case 'other':
                return 'border-purple-500 border-2 text-purple-500';
            default:
                return 'border-gray-500 border-2 text-gray-500';
        }
    };

    const typeColor = getTypeColor(type);

    return (
        <div className="bg-[#2a2a2a] rounded-lg p-5 text-white border border-gray-700 mb-4">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <span className="text-lg font-semibold text-[#9F9C96]">{name}</span>
                    <span className={`px-3 py-1 rounded-lg text-xs font-medium ${typeColor}`}>
                        {type?.charAt(0).toUpperCase() + type?.slice(1)}
                    </span>
                </div>
                <div className="flex items-center gap-1">
                    {/* <button
                        onClick={onEdit}
                        disabled={isDeleting}
                        className="p-2 hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Edit address"
                    >
                        <TbUserEdit className="w-4 h-4 text-blue-400" />
                    </button> */}
                    <button
                        onClick={onDelete}
                        disabled={isDeleting}
                        className="p-2 hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Delete address"
                    >
                        {isDeleting ? (
                            <div className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            <RiDeleteBinLine className="w-4 h-4 text-red-400" />
                        )}
                    </button>
                </div>
            </div>

            <div className="space-y-2 text-gray-300">
                <p className="text-sm">
                    <span className="font-medium text-[#9F9C96]">Email:</span> {mobile}
                </p>
                <p className="text-sm">
                    <span className="font-medium text-[#9F9C96]">Street:</span> {address}
                </p>
                <p className="text-sm">
                    <span className="font-medium text-[#9F9C96]">Location:</span> {city}
                </p>
            </div>

            {isDeleting && (
                <div className="mt-3 text-xs text-yellow-400 flex items-center gap-2">
                    <div className="w-3 h-3 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
                    Deleting address...
                </div>
            )}
        </div>
    );
};

export default AddressCard;