"use client"
import React, { useState } from "react"
import { GoHome } from "react-icons/go"
import { HiOutlineBuildingOffice2 } from "react-icons/hi2"
import BreadCrumb from "@/components/shared/BreadCrumb"
import { useAddAddressMutation } from "@/redux/feature/address/addressApi"
import { useRouter } from "next/navigation"

export default function AddNewAddress() {
    const [selectedDelivery, setSelectedDelivery] = useState("home")
    const [formData, setFormData] = useState({
        recipientFirstName: "",
        recipientLastName: "",
        recipientEmail: "",
        streetNo: "",
        city: "",
        state: "",
        postalCode: "",
        country: "Bangladesh",
    })

    const [addAddress, { isLoading, error }] = useAddAddressMutation()
    const router = useRouter()

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    const handleSave = async () => {
        try {
            console.log("Form data:", {
                ...formData,
                type: selectedDelivery
            })

            // Prepare data for API
            const addressData = {
                streetNo: formData.streetNo,
                city: formData.city,
                state: formData.state,
                postalCode: formData.postalCode,
                country: formData.country,
                type: selectedDelivery,
                recipientFirstName: formData.recipientFirstName,
                recipientLastName: formData.recipientLastName,
                recipientEmail: formData.recipientEmail,
            }

            // Call API
            const result = await addAddress(addressData).unwrap()
            
            console.log("Address added successfully:", result)
            
            // Redirect to profile page after success
            router.push("/profile")
            
        } catch (error) {
            console.error("Failed to add address:", error)
        }
    }

    const handleCancel = () => {
        console.log("Form cancelled")
        router.back()
    }

    return (
        <div className="min-h-screen p-5 text-white">
            <div className="container mx-auto flex justify-start items-center">
                <BreadCrumb name="Home" title="Add New Address" />
            </div>
            <div className="max-w-4xl mx-auto">
                <div className="bg-[#202020] rounded-lg p-8">
                    <h1 className="text-2xl font-semibold mb-8">Add New Shipping Address</h1>
                    <div className="border-b-2 border-gray-700 my-5"></div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded text-red-400">
                            Error: {error?.data?.message || 'Failed to add address'}
                        </div>
                    )}

                    <div className="space-y-6">
                        {/* First Name and Last Name */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="recipientFirstName" className="block text-sm mb-1">
                                    First name *
                                </label>
                                <input
                                    id="recipientFirstName"
                                    value={formData.recipientFirstName}
                                    onChange={(e) => handleInputChange("recipientFirstName", e.target.value)}
                                    className="w-full border border-[#136BFB] rounded px-4 py-2 text-white placeholder-gray-400 bg-transparent"
                                    placeholder="Enter first name"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="recipientLastName" className="block text-sm mb-1">
                                    Last name *
                                </label>
                                <input
                                    id="recipientLastName"
                                    value={formData.recipientLastName}
                                    onChange={(e) => handleInputChange("recipientLastName", e.target.value)}
                                    className="w-full border border-[#136BFB] rounded px-4 py-2 text-white placeholder-gray-400 bg-transparent"
                                    placeholder="Enter last name"
                                    required
                                />
                            </div>
                        </div>

                        {/* Email and Street No */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="recipientEmail" className="block text-sm mb-1">
                                    Email *
                                </label>
                                <input
                                    id="recipientEmail"
                                    type="email"
                                    value={formData.recipientEmail}
                                    onChange={(e) => handleInputChange("recipientEmail", e.target.value)}
                                    className="w-full border border-[#136BFB] rounded px-4 py-2 text-white placeholder-gray-400 bg-transparent"
                                    placeholder="Enter email"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="streetNo" className="block text-sm mb-1">
                                    Street No *
                                </label>
                                <input
                                    id="streetNo"
                                    placeholder="Type here.."
                                    value={formData.streetNo}
                                    onChange={(e) => handleInputChange("streetNo", e.target.value)}
                                    className="w-full border border-[#136BFB] rounded px-4 py-2 text-white placeholder-gray-400 bg-transparent"
                                    required
                                />
                            </div>
                        </div>

                        {/* City and State */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="city" className="block text-sm mb-1">
                                    City *
                                </label>
                                <input
                                    id="city"
                                    placeholder="Type here.."
                                    value={formData.city}
                                    onChange={(e) => handleInputChange("city", e.target.value)}
                                    className="w-full border border-[#136BFB] rounded px-4 py-2 text-white placeholder-gray-400 bg-transparent"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="state" className="block text-sm mb-1">
                                    State *
                                </label>
                                <input
                                    id="state"
                                    placeholder="Type here.."
                                    value={formData.state}
                                    onChange={(e) => handleInputChange("state", e.target.value)}
                                    className="w-full border border-[#136BFB] rounded px-4 py-2 text-white placeholder-gray-400 bg-transparent"
                                    required
                                />
                            </div>
                        </div>

                        {/* Postal Code and Country */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="postalCode" className="block text-sm mb-1">
                                    Postal Code *
                                </label>
                                <input
                                    id="postalCode"
                                    placeholder="Type here.."
                                    value={formData.postalCode}
                                    onChange={(e) => handleInputChange("postalCode", e.target.value)}
                                    className="w-full border border-[#136BFB] rounded px-4 py-2 text-white placeholder-gray-400 bg-transparent"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="country" className="block text-sm mb-1">
                                    Country *
                                </label>
                                <input
                                    id="country"
                                    placeholder="Type here.."
                                    value={formData.country}
                                    onChange={(e) => handleInputChange("country", e.target.value)}
                                    className="w-full border border-[#136BFB] rounded px-4 py-2 text-white placeholder-gray-400 bg-transparent"
                                    required
                                    disabled
                                />
                            </div>
                        </div>

                        {/* Delivery Options */}
                        <div className="space-y-4 pt-4">
                            <h3 className="text-sm">Select an option for effective delivery *</h3>
                            <div className="flex gap-4">
                                <button
                                    type="button"
                                    onClick={() => setSelectedDelivery("home")}
                                    className={`flex items-center gap-2 px-6 py-2 rounded border ${selectedDelivery === "home"
                                        ? "bg-[#136BFB] text-white border-[#136BFB]"
                                        : "bg-transparent border-[#136BFB] text-[#136BFB] hover:bg-[#136BFB] hover:text-white"
                                        }`}
                                >
                                    <GoHome className="w-4 h-4" />
                                    Home
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setSelectedDelivery("office")}
                                    className={`flex items-center gap-2 px-6 py-2 rounded border ${selectedDelivery === "office"
                                        ? "bg-[#136BFB] text-white border-[#136BFB]"
                                        : "bg-transparent border-[#136BFB] text-[#136BFB] hover:bg-[#136BFB] hover:text-white"
                                        }`}
                                >
                                    <HiOutlineBuildingOffice2 className="w-4 h-4" />
                                    Office
                                </button>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-end gap-4 pt-8">
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="px-8 py-2 rounded border border-[#136BFB] text-[#136BFB] hover:bg-[#136BFB] hover:text-white transition-colors"
                                disabled={isLoading}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleSave}
                                disabled={isLoading}
                                className="px-8 py-2 rounded bg-[#136BFB] text-white hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? "Adding..." : "Save"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}