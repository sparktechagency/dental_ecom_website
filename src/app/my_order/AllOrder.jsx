"use client";
import React, { useEffect, useMemo, useState } from "react";
import { ConfigProvider, Table, Empty, Spin } from "antd";
import { IoEyeOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import { useRouter } from "next/navigation";
import BreadCrumb from "@/components/shared/BreadCrumb";
import { useGetMyOrdersQuery } from "@/redux/feature/orders/ordersApi";
import { getBaseUrl } from "@/utils/getBaseUrl";
import "aos/dist/aos.css";
import AOS from "aos";

export default function AllOrder() {
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { data, isLoading, isFetching, error } = useGetMyOrdersQuery({
    page,
    limit,
  });

  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    AOS.init();
  }, []);

  const getStatusStyle = (status) => {
    const s = String(status || "").toLowerCase();
    const map = {
      pending: "bg-amber-500/10 text-amber-400 border border-amber-500/30",
      processing: "bg-blue-500/10 text-blue-400 border border-blue-500/30",
      shipped: "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30",
      delivered: "bg-green-500/10 text-green-400 border border-green-500/30",
      completed: "bg-green-500/10 text-green-400 border border-green-500/30",
      success: "bg-green-500/10 text-green-400 border border-green-500/30",
      paid: "bg-green-500/10 text-green-400 border border-green-500/30",
      cancelled: "bg-red-500/10 text-red-400 border border-red-500/30",
      canceled: "bg-red-500/10 text-red-400 border border-red-500/30",
      failed: "bg-red-500/10 text-red-400 border border-red-500/30",
    };
    return map[s] || "bg-gray-500/10 text-gray-400 border border-gray-500/30";
  };

  const formatStatus = (status) => {
    const s = String(status || "").toLowerCase();
    if (!s) return "—";
    const rep = { paid: "Paid", success: "Success" };
    if (rep[s]) return rep[s];
    return s.charAt(0).toUpperCase() + s.slice(1);
  };
  const navigate = useRouter();

  const rawOrders = data?.data?.items || data?.items || data?.data || [];
  const totalOrders =
    data?.meta?.total ||
    data?.data?.meta?.total ||
    data?.total ||
    rawOrders.length;

  const tableData = useMemo(() => {
    return (Array.isArray(rawOrders) ? rawOrders : []).map((order, idx) => {
      const prods = Array.isArray(order.products) ? order.products : [];
      const qty = prods.reduce((sum, p) => sum + (Number(p.quantity) || 0), 0);
      const names = prods
        .slice(0, 2)
        .map((p) => p.name)
        .filter(Boolean)
        .join(", ");
      const more = prods.length > 2 ? ` +${prods.length - 2} more` : "";
      const first = prods[0] || {};
      let img =
        first?.image ||
        (Array.isArray(first?.images) ? first.images[0] : "") ||
        first?.product?.image ||
        (Array.isArray(first?.product?.images) ? first.product.images[0] : "");
      if (img && !/^https?:\/\//i.test(img)) {
        img = `${img}`;
      }
      return {
        key: order._id || order.id || `#${idx + 1}`,
        orderId: order._id || order.id,
        products: names + more || "—",
        qty: qty || 0,
        total: order.total ?? order.subtotal ?? 0,
        status: order.status || order.paymentStatus || "pending",
        image: img || "/image.png",
        date: order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "—",
      };
    });
  }, [rawOrders]);

  const columns = [
    {
      title: "Order ID",
      dataIndex: "key",
      key: "key",
      width: 120,
      render: (text) => <span className="font-mono text-sm font-semibold text-blue-400">{text}</span>,
    },
    {
      title: "Product",
      key: "product",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden flex-shrink-0 border border-gray-700">
            <img
              src={record?.image}
              alt={record?.products || "Product"}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = "/image.png";
              }}
            />
          </div>
          <span className="text-sm truncate max-w-xs">{record?.products}</span>
        </div>
      ),
    },
    {
      title: "Quantity",
      dataIndex: "qty",
      key: "qty",
      width: 80,
      render: (qty) => <span className="font-semibold">{qty}</span>,
    },
    {
      title: "Amount",
      dataIndex: "total",
      key: "total",
      width: 100,
      render: (v) => <span className="font-semibold text-green-400">${Number(v || 0).toFixed(2)}</span>,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: 100,
      render: (date) => <span className="text-xs text-gray-400">{date}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 120,
      render: (_, record) => (
        <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${getStatusStyle(record.status)}`}>
          {formatStatus(record.status)}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      width: 70,
      align: "center",
      render: (_, record) => (
        <button
          onClick={() => {
            if (record?.orderId) {
              const found = (rawOrders || []).find(
                (o) => (o?._id || o?.id) === record.orderId
              );
              setSelectedOrder(found || null);
              setShowModal(true);
            }
          }}
          className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-all border border-blue-500/30 hover:border-blue-500/50"
          title="View Details"
        >
          <IoEyeOutline className="w-5 h-5" />
        </button>
      ),
    },
  ];

  const filteredData = useMemo(() => {
    if (!searchText) return tableData;
    const txt = searchText.toLowerCase();
    return tableData.filter(
      (row) =>
        String(row.key).toLowerCase().includes(txt) ||
        String(row.products || "").toLowerCase().includes(txt) ||
        String(row.status || "").toLowerCase().includes(txt)
    );
  }, [tableData, searchText]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-6">
          <BreadCrumb name="Home" title="My Orders" />
        </div>

        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              My Orders
            </h1>
            <p className="text-gray-400 mt-1">{totalOrders} total orders</p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:w-80">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <CiSearch className="h-5 w-5 text-blue-400" />
            </div>
            <input
              type="text"
              placeholder="Search order ID, product..."
              className="w-full bg-gray-800/50 border border-gray-700 hover:border-gray-600 focus:border-blue-500 rounded-lg pl-11 pr-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl overflow-hidden backdrop-blur-sm">
          <ConfigProvider
            theme={{
              components: {
                Table: {
                  headerBg: "rgba(17, 24, 39, 0.6)",
                  headerColor: "#e5e7eb",
                  cellFontSize: 14,
                  headerSplitColor: "rgba(55, 65, 81, 0.5)",
                  rowHoverBg: "rgba(59, 130, 246, 0.05)",
                  borderRadiusLG: 8,
                },
                Pagination: {
                  colorPrimary: "#3b82f6",
                  colorPrimaryBorder: "rgba(59, 130, 246, 0.3)",
                  colorBgContainer: "rgba(17, 24, 39, 0.6)",
                  borderRadius: 6,
                },
              },
              token: {
                colorBgElevated: "rgba(17, 24, 39, 0.8)",
                colorBorder: "rgba(55, 65, 81, 0.5)",
              },
            }}
          >
            <Spin spinning={isLoading || isFetching} tip="Loading orders...">
              <Table
                dataSource={filteredData}
                columns={columns}
                loading={false}
                pagination={{
                  current: page,
                  pageSize: limit,
                  total: totalOrders,
                  onChange: (p, ps) => {
                    setPage(p);
                    setLimit(ps);
                  },
                  showSizeChanger: true,
                  pageSizeOptions: ["5", "10", "20", "50"],
                  showTotal: (total, range) =>
                    `${range[0]}-${range[1]} of ${total}`,
                }}
                scroll={{ x: 768 }}
                locale={{
                  emptyText: error ? (
                    <div className="py-12">
                      <Empty
                        description={
                          <span className="text-gray-400">
                            Failed to load orders
                          </span>
                        }
                      />
                    </div>
                  ) : (
                    <div className="py-12">
                      <Empty
                        description={
                          <span className="text-gray-400">No orders found</span>
                        }
                      />
                    </div>
                  ),
                }}
                className="!bg-transparent"
              />
            </Spin>
          </ConfigProvider>
        </div>
      </div>

      {/* Order Details Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          />
          <div className="relative z-10 w-full max-w-4xl bg-gray-900 text-white rounded-2xl shadow-2xl border border-gray-700/50 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 flex items-center justify-between px-6 py-5 border-b border-gray-700/50 bg-gray-900/95 backdrop-blur-sm">
              <div>
                <h3 className="text-xl font-bold">Order Details</h3>
                <p className="text-sm text-gray-400 mt-1">
                  ID: <span className="font-mono text-blue-400">{selectedOrder?._id || selectedOrder?.id || "-"}</span>
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusStyle(
                    selectedOrder?.status || selectedOrder?.paymentStatus
                  )}`}
                >
                  {formatStatus(
                    selectedOrder?.status || selectedOrder?.paymentStatus
                  )}
                </span>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <IoClose className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="px-6 py-6">
              {/* Address & Total */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-5">
                  <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
                    Delivery Address
                  </h4>
                  <p className="text-sm mt-3 leading-relaxed text-gray-200">
                    {(() => {
                      const a =
                        selectedOrder?.shippingAddress ||
                        selectedOrder?.deliveryAddress ||
                        selectedOrder?.address;
                      if (!a) return "—";
                      if (typeof a === "string") return a;
                      const parts = [
                        a.name,
                        a.phone,
                        a.street,
                        a.city,
                        a.state,
                        a.zip,
                        a.country,
                      ].filter(Boolean);
                      return parts.join(", ");
                    })()}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-green-500/10 to-blue-500/10 border border-green-500/30 rounded-xl p-5 flex flex-col justify-center">
                  <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
                    Total Amount
                  </h4>
                  <p className="text-3xl font-bold mt-2 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                    $
                    {Number(
                      selectedOrder?.total ?? selectedOrder?.subtotal ?? 0
                    ).toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Products Table */}
              <div>
                <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4">
                  Order Items
                </h4>
                <div className="overflow-auto border border-gray-700/50 rounded-xl bg-gray-800/20">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-800/50 border-b border-gray-700/50 sticky top-0">
                      <tr>
                        <th className="px-4 py-3 text-left font-semibold text-gray-300">
                          Product
                        </th>
                        <th className="px-4 py-3 text-center font-semibold text-gray-300">
                          Qty
                        </th>
                        <th className="px-4 py-3 text-right font-semibold text-gray-300">
                          Price
                        </th>
                        <th className="px-4 py-3 text-right font-semibold text-gray-300">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody data-aos="fade-up" data-aos-duration="600">
                      {(Array.isArray(selectedOrder?.products)
                        ? selectedOrder.products
                        : []
                      ).map((p, i) => {
                        let img =
                          p?.image ||
                          (Array.isArray(p?.images) ? p.images[0] : "") ||
                          p?.product?.image ||
                          (Array.isArray(p?.product?.images)
                            ? p.product.images[0]
                            : "");
                        if (img && !/^https?:\/\//i.test(img))
                          img = `${getBaseUrl()}${img}`;
                        const name = p?.name || p?.product?.name || "—";
                        const qty = Number(p?.quantity || 0);
                        const price = Number(
                          p?.price ?? p?.product?.price ?? 0
                        );
                        return (
                          <tr
                            key={i}
                            className="border-t border-gray-700/50 hover:bg-gray-700/20 transition-colors"
                          >
                            <td className="px-4 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-14 h-14 rounded-lg bg-gray-800 overflow-hidden flex-shrink-0 border border-gray-700">
                                  <img
                                    src={img || "/image.png"}
                                    alt={name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      e.currentTarget.src = "/image.png";
                                    }}
                                  />
                                </div>
                                
                              </div>
                            </td>
                            <td className="px-4 py-4 text-center font-medium">
                              {qty}
                            </td>
                            <td className="px-4 py-4 text-right text-blue-400">
                              ${price.toFixed(2)}
                            </td>
                            <td className="px-4 py-4 text-right font-semibold text-green-400">
                              ${(price * qty).toFixed(2)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end gap-3 px-6 py-5 border-t border-gray-700/50 bg-gray-900/95 sticky bottom-0">
              <button
                className="px-6 py-2.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-white font-medium transition-colors"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}