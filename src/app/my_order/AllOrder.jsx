"use client"
import React, { useMemo, useState } from "react";
import { ConfigProvider, Table } from "antd";
import { IoEyeOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { useRouter } from "next/navigation";
import BreadCrumb from "@/components/shared/BreadCrumb";
import { useGetMyOrdersQuery } from "@/redux/feature/orders/ordersApi";
import { getBaseUrl } from "@/utils/getBaseUrl";



export default function AllOrder() {
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { data, isLoading, isFetching, error } = useGetMyOrdersQuery({ page, limit });
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const getStatusStyle = (status) => {
    const s = String(status || '').toLowerCase();
    const map = {
      pending: "bg-yellow-100 text-yellow-800",
      processing: "bg-blue-100 text-blue-800",
      shipped: "bg-green-100 text-green-800",
      delivered: "bg-green-100 text-green-800",
      completed: "bg-green-100 text-green-800",
      success: "bg-green-100 text-green-800",
      paid: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
      canceled: "bg-red-100 text-red-800",
      failed: "bg-red-100 text-red-800",
    };
    return map[s] || "bg-gray-100 text-gray-800";
  };

  const formatStatus = (status) => {
    const s = String(status || '').toLowerCase();
    if (!s) return '—';
    const rep = { paid: 'Paid', success: 'Success' };
    if (rep[s]) return rep[s];
    return s.charAt(0).toUpperCase() + s.slice(1);
  };
  const navigate = useRouter();

  const rawOrders = data?.data?.items || data?.items || data?.data || [];
  const totalOrders = data?.meta?.total || data?.data?.meta?.total || data?.total || rawOrders.length;

  console.log("---->",data)

  const tableData = useMemo(() => {
    return (Array.isArray(rawOrders) ? rawOrders : []).map((order, idx) => {
      const prods = Array.isArray(order.products) ? order.products : [];
      const qty = prods.reduce((sum, p) => sum + (Number(p.quantity) || 0), 0);
      const names = prods.slice(0, 2).map(p => p.name).filter(Boolean).join(', ');
      const more = prods.length > 2 ? ` +${prods.length - 2} more` : '';
      const first = prods[0] || {};
      // Try multiple shapes: order.products[] may include image, images[], or nested product fields
      let img = first?.image
        || (Array.isArray(first?.images) ? first.images[0] : "")
        || first?.product?.image
        || (Array.isArray(first?.product?.images) ? first.product.images[0] : "");
      if (img && !/^https?:\/\//i.test(img)) {
        img = `${getBaseUrl()}${img}`;
      }
      return {
        key: order._id || order.id || `#${idx + 1}`,
        orderId: order._id || order.id,
        products: names || '—',
        qty: qty || 0,
        total: order.total ?? order.subtotal ?? 0,
        status: order.status || order.paymentStatus || 'pending',
        image: img || '/image.png',
      }
    });
  }, [rawOrders]);
  const columns = [
    { title: "Order Id", dataIndex: "key", key: "key" },

    {
      title: "Product",
      key: "product",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-neutral-700 overflow-hidden flex items-center justify-center">
            <img
              src={record?.image}
              alt={record?.products || 'Product'}
              className="w-full h-full object-cover"
              onError={(e) => { e.currentTarget.src = '/image.png'; }}
            />
          </div>
          <span>{record?.products}</span>
        </div>
      ),
    },
    { title: "Quantity", dataIndex: "qty", key: "qty" },
    { title: "Price", dataIndex: "total", key: "total", render: (v) => `$${Number(v || 0).toFixed(2)}` },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, record) => (
        <span
          className={`px-2 py-2 rounded text-sm font-medium ${getStatusStyle(record.status)}`}
        >
          {formatStatus(record.status)}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (record?.orderId) {
                const found = (rawOrders || []).find((o) => (o?._id || o?.id) === record.orderId);
                setSelectedOrder(found || null);
                setShowModal(true);
              }
            }}
            className="border border-[#3b3b3b] text-[#3b3b3b] rounded-lg p-[6px]"
            title="View Details"
          >
            <IoEyeOutline className="w-5 h-5 text-[#3b3b3b]" />
          </button>
        </div>
      ),
    },
  ];
  const filteredData = useMemo(() => {
    if (!searchText) return tableData;
    const txt = searchText.toLowerCase();
    return tableData.filter((row) =>
      String(row.key).toLowerCase().includes(txt) ||
      String(row.products || '').toLowerCase().includes(txt) ||
      String(row.status || '').toLowerCase().includes(txt)
    );
  }, [tableData, searchText]);

  return (
    <div className="container mx-auto">
      <div className="container mx-auto flex justify-start items-center">
        <BreadCrumb name="Home" title="My Orders" />
      </div>
      <div className="flex items-center justify-between py-5">
        <h1 className="text-2xl font-bold text-white">My Orders</h1>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <CiSearch className="h-4 w-4 text-[#136BFB]" />
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="bg-black border border-[#136BFB] rounded-xl pl-10 pr-4 py-2 text-white placeholder-[#136BFB] focus:outline-none w-64"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      </div>
      <ConfigProvider
        theme={{
          components: {
            InputNumber: {
              activeBorderColor: "#14803c",
            },
            Pagination: {
              colorPrimaryBorder: "#3b3b3b",
              colorBorder: "#3b3b3b",
              colorTextPlaceholder: "#3b3b3b",
              colorTextDisabled: "#3b3b3b",
              colorBgTextActive: "#3b3b3b",
              itemActiveBgDisabled: "#3b3b3b",
              itemActiveColorDisabled: "#3b3b3b",
              itemBg: "#3b3b3b",
              colorBgTextHover: "#3b3b3b",
              colorPrimary: "#3b3b3b",
              colorPrimaryHover: "#3b3b3b",
            },
            Table: {
              headerBg: "#3b3b3b",
              headerColor: "#fff",
              cellFontSize: 16,
              headerSplitColor: "#3b3b3b",
            },
          },
        }}
      >
        <Table
          dataSource={filteredData}
          columns={columns}
          loading={isLoading || isFetching}
          pagination={{
            current: page,
            pageSize: limit,
            total: totalOrders,
            onChange: (p, ps) => { setPage(p); setLimit(ps); },
            showSizeChanger: true,
          }}
          scroll={{ x: true }}
          locale={{
            emptyText: error ? 'Failed to load orders' : 'No orders found',
          }}
        />
      </ConfigProvider>

      {/* Order Details Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/70" onClick={() => setShowModal(false)} />
          <div className="relative z-10 w-[95%] max-w-3xl bg-[#111] text-white rounded-lg shadow-xl border border-gray-800">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-800">
              <div>
                <h3 className="text-lg font-semibold">Order Details</h3>
                <p className="text-sm text-gray-400">ID: {(selectedOrder?._id || selectedOrder?.id || '-')}
                </p>
              </div>
              <span className={`px-3 py-1 rounded text-sm ${getStatusStyle(selectedOrder?.status || selectedOrder?.paymentStatus)}`}>
                {formatStatus(selectedOrder?.status || selectedOrder?.paymentStatus)}
              </span>
            </div>

            <div className="px-5 py-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm text-gray-400">Delivery Address</h4>
                <p className="text-sm mt-1">
                  {(() => {
                    const a = selectedOrder?.shippingAddress || selectedOrder?.deliveryAddress || selectedOrder?.address;
                    if (!a) return '—';
                    if (typeof a === 'string') return a;
                    const parts = [a.name, a.phone, a.street, a.city, a.state, a.zip, a.country].filter(Boolean);
                    return parts.join(', ');
                  })()}
                </p>
              </div>
              <div className="md:text-right">
                <h4 className="text-sm text-gray-400">Total</h4>
                <p className="text-xl font-semibold mt-1">${Number(selectedOrder?.total ?? selectedOrder?.subtotal ?? 0).toFixed(2)}</p>
              </div>
            </div>

            <div className="px-5 pb-5">
              <div className="overflow-auto max-h-[50vh] border border-gray-800 rounded-lg">
                <table className="w-full text-left">
                  <thead className="bg-[#1a1a1a] text-gray-300 text-sm">
                    <tr>
                      <th className="p-3">Product</th>
                      <th className="p-3">Qty</th>
                      <th className="p-3">Price</th>
                      <th className="p-3">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(Array.isArray(selectedOrder?.products) ? selectedOrder.products : []).map((p, i) => {
                      let img = p?.image || (Array.isArray(p?.images) ? p.images[0] : '') || p?.product?.image || (Array.isArray(p?.product?.images) ? p.product.images[0] : '');
                      if (img && !/^https?:\/\//i.test(img)) img = `${getBaseUrl()}${img}`;
                      const name = p?.name || p?.product?.name || '—';
                      const qty = Number(p?.quantity || 0);
                      const price = Number(p?.price ?? p?.product?.price ?? 0);
                      return (
                        <tr key={i} className="border-t border-gray-800">
                          <td className="p-3">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded bg-neutral-800 overflow-hidden">
                                <img src={img || '/image.png'} alt={name} className="w-full h-full object-cover" onError={(e) => { e.currentTarget.src = '/image.png'; }} />
                              </div>
                              <div className="truncate">
                                <div className="text-sm font-medium truncate max-w-[220px]">{name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="p-3 text-sm">{qty}</td>
                          <td className="p-3 text-sm">${price.toFixed(2)}</td>
                          <td className="p-3 text-sm">${(price * qty).toFixed(2)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex justify-end gap-2 px-5 pb-5">
              <button className="px-4 py-2 rounded-md bg-gray-700 text-white" onClick={() => setShowModal(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}