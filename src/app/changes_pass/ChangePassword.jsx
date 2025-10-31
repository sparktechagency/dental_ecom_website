"use client";
import BreadCrumb from '@/components/shared/BreadCrumb';
import React, { useState } from 'react'; // Suspense remove koro
import { useChangePasswordMutation } from '@/redux/feature/auth/authApi';
import Swal from 'sweetalert2';

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
            Swal.fire({ icon: 'warning', title: 'Current and New password are required' });
            return;
        }
        try {
            const res = await changePassword({ currentPassword: form.currentPassword, newPassword: form.newPassword }).unwrap();
            Swal.fire({ icon: 'success', title: res?.message || 'Password changed successfully' });
            setForm({ currentPassword: '', newPassword: '' });
        } catch (err) {
            Swal.fire({ icon: 'error', title: 'Failed to change password', text: err?.data?.message || 'Please try again' });
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