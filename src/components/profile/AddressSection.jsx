// AddressSection.jsx
"use client";
import React, { useState } from "react";
import AddressCard from "./AddressCard";
import { useFetchMyAddressesQuery, useDeleteAddressMutation } from "@/redux/feature/address/addressApi";
import Link from "next/link";

export default function AddressSection() {
  const { data: addresses, isLoading, error, refetch } = useFetchMyAddressesQuery();
  const [deleteAddress, { isLoading: isDeleting }] = useDeleteAddressMutation();
  const [deletingId, setDeletingId] = useState(null);
  
 

  const handleEdit = (id) => {
    console.log("Edit address:", id);
    // Navigate to edit page or open modal
  };

  const handleDelete = async (id) => {
    try {
      setDeletingId(id);
      
      
      // Confirm deletion
      const isConfirmed = window.confirm("Are you sure you want to delete this address?");
      if (!isConfirmed) {
        setDeletingId(null);
        return;
      }
      
      const result = await deleteAddress(id).unwrap();
      
      
      // Auto refetch addresses after delete
      refetch();
      
    } catch (error) {
      console.error("Failed to delete address:", error);
      alert(error?.data?.message || 'Failed to delete address');
    } finally {
      setDeletingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className=" rounded-lg p-5">
        <div className="flex items-center justify-center mb-5">
          <h2 className="text-2xl font-bold text-black underline">
            Address information
          </h2>
        </div>
        <p className="text-black text-center">Loading addresses...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className=" rounded-lg p-5">
        <div className="flex items-center justify-center mb-5">
          <h2 className="text-2xl font-bold text-black underline">
            Address information
          </h2>
        </div>
        <p className="text-red-400 text-center">Error loading addresses</p>
        <p className="text-gray-400 text-center text-sm">
          {error?.data?.message || 'Please try again later'}
        </p>
      </div>
    );
  }

  return (
    <div className="border border-[#e2e8f0] rounded-lg p-5">
      <div className="flex items-center justify-center mb-5">
        <h2 className="text-2xl font-bold text-black underline">
          Address information
        </h2>
      </div>

      <div className="space-y-5 mb-5">
        {addresses?.length > 0 ? (
          addresses.map((address) => (
            <AddressCard
              key={address._id}
              id={address._id}
              name={`${address.recipientFirstName} ${address.recipientLastName}`}
              type={address.type}
              mobile={address.recipientEmail} 
              address={address.streetNo}
              city={`${address.city}, ${address.state}, ${address.country} - ${address.postalCode}`}
              onEdit={() => handleEdit(address._id)}
              onDelete={() => handleDelete(address._id)}
              isDeleting={deletingId === address._id}
            />
          ))
        ) : (
          <p className="text-black text-center py-4">
            {addresses?.length === 0 
              ? "No addresses found. Add your first address!" 
              : "No address data available"}
          </p>
        )}
      </div>

      <Link
        href="/add_address"
        className="w-1/2 mx-auto bg-[#136BFB] text-white py-3 px-3 rounded-lg font-semibold flex items-center justify-center gap-2 mb-2 hover:bg-blue-600 transition-colors"
      >
        Add new Address
      </Link>
    </div>
  );
}