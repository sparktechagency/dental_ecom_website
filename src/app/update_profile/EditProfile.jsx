"use client";
import React, { useEffect, useState } from "react";
import BreadCrumb from "../../components/shared/BreadCrumb";
import {
  useGetMyProfileQuery,
  useUpdateUserMutation,
} from "@/redux/feature/users/usersApi";
import { useDispatch, useSelector } from "react-redux";
import usersApi from "@/redux/feature/users/usersApi";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { toast } from "sonner";

export default function EditProfile() {
  const navigate = useRouter();
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state?.auth?.user);
  const { data, isLoading, isFetching, error } = useGetMyProfileQuery();

  const profile = data?.data || data || {};
  const [updateUser, { isLoading: saving }] = useUpdateUserMutation();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    gdc: "",
    clinicName: "",
  });
  const [countryCode, setCountryCode] = useState("+880");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (!isLoading && !isFetching && profile) {
      let mobileRaw = profile.phone || profile.mobile || "";
      let code = countryCode;
      let local = mobileRaw;
      const match = String(mobileRaw).match(/^\+(\d{1,3})(.*)$/);
      if (match) {
        code = `+${match[1]}`;
        local = match[2].replace(/\D/g, "");
      }
      setCountryCode(code);
      setFormData({
        firstName: profile.firstName || profile.name?.split(" ")?.[0] || "",
        lastName:
          profile.lastName ||
          profile.name?.split(" ")?.slice(1).join(" ") ||
          "",
        mobile: local || "",
        gdc: profile.gdcNumber || profile.gdc || "",
        clinicName: profile.clinicName || "",
      });
      setImagePreview(profile.imageUrl || "");
    }
  }, [profile, isLoading, isFetching]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
        "image/webp",
      ];
      if (!validTypes.includes(file.type)) {
        Swal.fire({
          icon: "error",
          title: "Invalid file type",
          text: "Please select JPEG, PNG, GIF or WebP image",
        });
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File too large. Please select image smaller than 5MB", {
            style: {
              background: "#fef2f2",
              color: "#dc2626",
              border: "1px solid #fecaca",
            },
          });
          
        return;
      }

      setImageFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(profile.imageUrl || "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      const digits = String(formData.mobile || "").replace(/\D/g, "");
      if (digits && (digits.length < 10 || digits.length > 15)) {
        Swal.fire({
          icon: "warning",
          title: "Invalid mobile number",
          text: "Enter 10-15 digits.",
        });
        setIsUploading(false);
        return;
      }

      // Create FormData for multipart upload
      const formDataToSend = new FormData();

      // Add text fields
      if (formData.firstName)
        formDataToSend.append("firstName", formData.firstName);
      if (formData.lastName)
        formDataToSend.append("lastName", formData.lastName);
      if (formData.clinicName)
        formDataToSend.append("clinicName", formData.clinicName);
      if (digits) {
        const cc = String(countryCode || "").replace(/\D/g, "");
        formDataToSend.append("phone", `+${cc}${digits}`);
      }
      if (formData.gdc) formDataToSend.append("gdcNumber", formData.gdc);

      // Add image file if selected
      if (imageFile) {
        formDataToSend.append("image", imageFile);
      }

      const res = await updateUser({ body: formDataToSend }).unwrap();

      // Update cached profile
      const updated = res?.data || res || {};
      try {
        dispatch(
          usersApi.util.updateQueryData("getMyProfile", undefined, (draft) => {
            if (!draft || typeof draft !== "object") return updated;
            if (draft.data && typeof draft.data === "object") {
              Object.assign(draft.data, updated);
            } else {
              Object.assign(draft, updated);
            }
          })
        );
      } catch (error) {
        console.log("Cache update error:", error);
      }
      toast.success(res?.message || "Profile updated successfully", {
        duration: 2000,
        style: {
          background: "#dcfce7",
          color: "#166534",
          border: "1px solid #bbf7d0",
        },
      });

      setTimeout(() => {
        navigate.push("/profile");
      }, 2000);
    } catch (err) {
      toast.error(err?.data?.message || "Failed to update profile", {
        style: {
          background: "#fef2f2",
          color: "#dc2626",
          border: "1px solid #fecaca",
        },
      });
    } finally {
      setIsUploading(false);
    }
  };

  if (isLoading || isFetching) {
    return (
      <div className="py-10">
        <div className="container mx-auto flex justify-start items-center">
          <BreadCrumb name="Home" title="Edit Profile" />
        </div>
        <div className="text-center text-gray-400 py-10">
          Loading profile...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-10">
        <div className="container mx-auto flex justify-start items-center">
          <BreadCrumb name="Home" title="Edit Profile" />
        </div>
        <div className="text-center text-red-500 py-10">
          Failed to load profile
        </div>
      </div>
    );
  }

  return (
    <div className="py-10">
      <div className="container mx-auto flex justify-start items-center">
        <BreadCrumb name="Home" title="Edit Profile" />
      </div>

      <div className="bg-[#202020] rounded-lg p-5 max-w-4xl mx-auto py-10">
        <h2 className="text-2xl font-bold text-white text-center mb-8">
          Edit Profile
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Profile Image Upload */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#136BFB] bg-gray-700">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Profile preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white text-4xl">
                    {formData.firstName?.charAt(0) || "U"}
                  </div>
                )}
              </div>

              {/* Remove Image Button */}
              {imagePreview && imagePreview !== profile.imageUrl && (
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-colors"
                >
                  ×
                </button>
              )}
            </div>

            <div className="mt-4">
              <label className="cursor-pointer bg-[#136BFB] text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors inline-block">
                <span>{imageFile ? "Change Image" : "Upload Image"}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
              <p className="text-xs text-gray-400 mt-2 text-center">
                JPEG, PNG, GIF, WebP • Max 5MB
              </p>
            </div>
          </div>

          {/* First Name and Last Name Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 text-lg font-bold mb-2">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-[#136BFB] rounded-lg text-white placeholder-gray-400 bg-transparent"
                placeholder="Enter first name"
              />
            </div>
            <div>
              <label className="block text-gray-300 text-lg font-bold mb-2">
                Last name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-[#136BFB] rounded-lg text-white placeholder-gray-400 bg-transparent"
                placeholder="Enter last name"
              />
            </div>
          </div>

          {/* Clinic Name Field */}
          <div>
            <label className="block text-gray-300 text-lg font-bold mb-2">
              Clinic Name
            </label>
            <input
              type="text"
              name="clinicName"
              value={formData.clinicName}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-[#136BFB] rounded-lg text-white placeholder-gray-400 bg-transparent"
              placeholder="Enter clinic name"
            />
          </div>

          {/* Mobile with Country Code */}
          <div>
            <label className="block text-gray-300 text-lg font-bold mb-2">
              Mobile
            </label>
            <div className="flex gap-2">
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="px-3 py-3 border-2 border-[#136BFB] rounded-lg bg-[#171717] text-white min-w-[110px]"
              >
                <option value="+880">+880 (BD)</option>
                <option value="+91">+91 (IN)</option>
                <option value="+1">+1 (US)</option>
                <option value="+44">+44 (UK)</option>
                <option value="+971">+971 (AE)</option>
                <option value="+61">+61 (AU)</option>
              </select>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="flex-1 px-4 py-3 border-2 border-[#136BFB] rounded-lg text-white placeholder-gray-400 bg-transparent"
                placeholder="Enter mobile number"
              />
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Your number will be saved as E.164, e.g., {countryCode}
              {formData.mobile?.replace(/\D/g, "")}
            </p>
          </div>

          {/* GDC No Field */}
          <div>
            <label className="block text-gray-300 text-lg font-bold mb-2">
              GDC
            </label>
            <input
              type="text"
              name="gdc"
              value={formData.gdc}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-[#136BFB] rounded-lg text-white placeholder-gray-400 bg-transparent"
              placeholder="Enter GDC number"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate.push("/profile")}
              disabled={isUploading || saving}
              className="w-1/3 px-6 py-3 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUploading || saving}
              className="flex-1 px-6 py-3 bg-[#136BFB] text-white rounded-lg font-medium hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isUploading || saving ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Updating...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
