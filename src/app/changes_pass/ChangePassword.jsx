"use client";
import BreadCrumb from '@/components/shared/BreadCrumb';
import React, { useState } from 'react'; // Suspense remove koro
import { useChangePasswordMutation } from '@/redux/feature/auth/authApi';
import Swal from 'sweetalert2';
import { toast } from 'sonner';

export default function ChangePassword() {
    const [form, setForm] = useState({ currentPassword: '', newPassword: '' });
    const [changePassword, { isLoading }] = useChangePasswordMutation();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.currentPassword || !form.newPassword) {
            toast.error("Current and New password are required", {
              style: {
                background: "#fef2f2",
                color: "#dc2626",
                border: "1px solid #fecaca",
              },
            });
            return;
          }
        try {
            const res = await changePassword({ currentPassword: form.currentPassword, newPassword: form.newPassword }).unwrap();
            toast.success( "Password changed successfully", {
                
                style: {
                  background: "#dcfce7",
                  color: "#166534",
                  border: "1px solid #bbf7d0",
                },
              });
            
            setForm({ currentPassword: '', newPassword: '' });
        } catch (err) {
               
            toast.error(err?.data?.message || "Failed to change password", {
                style: {
                  background: "#fef2f2",
                  color: "#dc2626",
                  border: "1px solid #fecaca",
                },
              });
              
        }
    };
    
    return (
        <div className='py-10'>
            <div className="container mx-auto flex justify-start items-center">
                <BreadCrumb name="Home" title="Change Password" />
            </div>
            <div className="bg-[#202020] rounded-lg p-5 max-w-4xl mx-auto py-10">
                <h2 className="text-2xl font-bold text-white text-center mb-8">Change Password</h2>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-gray-300 text-lg font-bold mb-2">
                            Current Password
                        </label>
                        <input
                            type="password"
                            name="currentPassword"
                            value={form.currentPassword}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border-2 border-[#136BFB] rounded-lg text-white placeholder-gray-400"
                            placeholder="Enter current password"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-300 text-lg font-bold mb-2">
                            New Password
                        </label>
                        <input
                            type="password"
                            name="newPassword"
                            value={form.newPassword}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border-2 border-[#136BFB] rounded-lg text-white placeholder-gray-400"
                            placeholder="Enter new password"
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 pt-4">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full px-6 py-3 bg-[#136BFB] text-white rounded-lg font-medium disabled:opacity-50"
                        >
                            {isLoading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}