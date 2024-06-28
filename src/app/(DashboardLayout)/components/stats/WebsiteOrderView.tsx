"use client";
import PageContainer from "../container/PageContainer";
import DashboardCard from "../shared/DashboardCard";
import FullFeaturedCrudGrid from "../dataGrid/newtempOrder";
import React, { useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import CommonDataModel from "@/utils/models/CommonDataModel";
import { getAllWebsiteOrder } from "@/utils/apis/Order";
import {
  TextField,
  MenuItem,
  Grid,
  Button,
  Box,
  IconButton,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import OrderDetailsPage from "../../orders/orderDetails/page";

const OrderFilter = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    orderStatus: "",
    customer: "",
    dateType: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleApplyFilter = () => {
    onFilterChange(filters);
  };

  return (
    <Grid container spacing={2} style={{ marginBottom: "20px" }}>
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          select
          label="Order Status"
          name="orderStatus"
          value={filters.orderStatus}
          onChange={handleChange}
          fullWidth
        >
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="Confirmed">Confirmed</MenuItem>
          <MenuItem value="Cancel">Canceled</MenuItem>
          <MenuItem value="Return">Returned</MenuItem>
          <MenuItem value="Delivered">Delivered</MenuItem>
        </TextField>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          label="Customer"
          name="customer"
          value={filters.customer}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          select
          label="Date Type"
          name="dateType"
          value={filters.dateType}
          onChange={handleChange}
          fullWidth
        >
          <MenuItem value="thisWeek">This Week</MenuItem>
          <MenuItem value="thisMonth">This Month</MenuItem>
          <MenuItem value="thisYear">This Year</MenuItem>
          <MenuItem value="customDate">Custom Date</MenuItem>
        </TextField>
      </Grid>
      {filters.dateType === "customDate" && (
        <>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              type="date"
              label="Start Date"
              name="startDate"
              value={filters.startDate}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              type="date"
              label="End Date"
              name="endDate"
              value={filters.endDate}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Grid>
        </>
      )}
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={handleApplyFilter}>
          Show Data
        </Button>
      </Grid>
    </Grid>
  );
};

const WebsiteOrderView = ({ title }) => {
  const orderColumnDefinition: GridColDef[] = [
    { field: "srNo", headerName: "Sr No.", flex: 1, editable: true },
    {
      field: "orderId",
      headerName: "Order Id",
      align: "left",
      flex: 1,
      headerAlign: "left",
      editable: true,
    },
    {
      field: "orderDate",
      headerName: "Order Date",
      align: "left",
      flex: 1,
      headerAlign: "left",
      editable: true,
    },
    {
      field: "customerName",
      headerName: "Customer Name",
      align: "left",
      flex: 1,
      headerAlign: "left",
      editable: true,
      valueGetter: (params) => {
        return params.row.customerName;
      },
      //   valueGetter: (params) => {
      //     console.log(params.row, "row");
      //     const shippingAddress = params.row.shippingAddress;
      //     return `${shippingAddress.addressLine1}, ${shippingAddress.city}, ${shippingAddress.state}`;
      //   },
    },
    {
      field: "totalAmount",
      headerName: "Total Amount",
      align: "left",
      flex: 1,
      headerAlign: "left",
      editable: true,
      valueGetter: (params) => {
        const total = params.row?.paymentDetails?.paymentAmount;
        return `₹${total}`;
      },
    },
    {
      field: "paymentMethod",
      headerName: "Payment Method",
      align: "left",
      flex: 1,
      headerAlign: "left",
      editable: true,
      valueGetter: (params) => {
        return params.row.paymentDetails.paymentMethod;
      },
    },
    {
      field: "accountantApproval",
      headerName: "A/C Approval",
      align: "left",
      flex: 1,
      headerAlign: "left",
      editable: true,
      valueGetter: (params) => {
        return params.row.accountApproval;
      },
    },
    {
      field: "orderStatus",
      headerName: "Order Status",
      align: "left",
      headerAlign: "left",
      editable: true,
      flex: 1,
      valueGetter: (params) => {
        return params.row.orderStatus;
      },
    },
  ];
  const [request, setRequest] = useState<boolean>();
  const [isClose, setIsClose] = useState(false);
  const [columnRow, setColumnRow] = useState([]);
  const [allOrders, setAllOrders] = useState<CommonDataModel>({
    columns: orderColumnDefinition,
    rows: columnRow,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({});
  const [IsOrder, setIsOrderDetails] = useState(false);
  const [orderData, setOrderData] = useState("");
  React.useEffect(() => {
    getAllWebsiteOrder().then((orders) => {
      console.log(orders, "ordders");
      const data = orders.map((order, index) => ({
        id: order.orderId,
        srNo: index + 1,
        orderId: order.orderId,
        orderDate: order.orderDate,
        orderStatus: order.orderState,
        customerName: order.customerName,
        customerEmail: order.customerEmail,
        customerOrderId :order.customerOrderId,
        customerNumber: order.customerNumber,
        discount: order.discount,
        deliveryCharge: order.deliveryCharge,
        accountApproval: order.approvalStatus,
        accountantId: order.accountantId,
        accountStatus: order.accountantStatus,
        shippingAddress: order.shippingAddress,
        totalPrice: order.totalPrice,
        totalSalePrice: order.totalSalePrice,
        products:order.products,
        paymentDetails: order.paymentDetails,
      }));

      console.log(data , 'data')
      setAllOrders({
        columns: orderColumnDefinition,
        rows: data,
      });
      setColumnRow(data);
    });
  }, [request, isClose]);

 

  const handleFilterChange = (filters) => {
    getAllWebsiteOrder().then((orders) => {
      const filteredOrders = orders.filter((order) => {
        const orderStatus = order?.orderStatus?.status?.toLowerCase();
        const filterStatus = filters.orderStatus?.toLowerCase();
        const matchOrderStatus = filters.orderStatus
          ? orderStatus === filterStatus
          : true;
        const matchCustomer = filters.customer
          ? order.userAddressDetails.shippingAddress.addressLine1.includes(
              filters.customer
            )
          : true;
        const matchDate =
          filters.dateType === "customDate"
            ? new Date(order.createdAt).toISOString().split("T")[0] >=
                filters.startDate &&
              new Date(order.createdAt).toISOString().split("T")[0] <=
                filters.endDate
            : filters.dateType === "thisWeek"
            ? new Date(order.createdAt) >=
              new Date(new Date().setDate(new Date().getDate() - 7))
            : filters.dateType === "thisMonth"
            ? new Date(order.createdAt) >=
              new Date(new Date().setDate(new Date().getDate() - 30))
            : filters.dateType === "thisYear"
            ? new Date(order.createdAt) >=
              new Date(new Date().setFullYear(new Date().getFullYear() - 1))
            : true;
        const matchSearchQuery = searchQuery
          ? order.orderId.includes(searchQuery) ||
            order.userAddressDetails.shippingAddress.addressLine1.includes(
              searchQuery
            )
          : true;
        return (
          matchOrderStatus && matchCustomer && matchDate && matchSearchQuery
        );
      });
      if (filteredOrders.length === 0) {
        setAllOrders({
          columns: orderColumnDefinition,
          rows: [],
        });
        setColumnRow([]);
      } else {
        const data = filteredOrders.map((order, index) => ({
          id: order.orderId,
          srNo: index + 1,
          orderId: order.orderId,
          orderDate: order.createdAt,
          userAddressDetails: order.userAddressDetails,
          products: order.products,
          paymentDetails: order.paymentDetails,
          orderStatus: order.orderStatus,
        }));
        setAllOrders({
          columns: orderColumnDefinition,
          rows: data,
        });
        setColumnRow(data);
      }
    });
  };

  const handleVisibilityClick = (id, data) => {
    setOrderData(data);
    setIsOrderDetails(true);
  };

  // const handleSearch = (e) => {
  //   const newSearchQuery = e.target.value;
  //   setSearchQuery(newSearchQuery);
  //   setFilters({ ...filters, searchQuery: newSearchQuery });
  // };

  return (
    <>
      {IsOrder ? (
        <OrderDetailsPage
        title={"Ecommerce"}
          data={orderData}
          onClose={() => setIsOrderDetails(false)}
        />
      ) : (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1rem",
            }}
          >
            <div>
              <h2>All {title} Orders</h2>
            </div>
          </div>
          <PageContainer title="Orders" description="Orders">
            <Box mb={2}>
              <DashboardCard title="Order Filter">
                <OrderFilter onFilterChange={handleFilterChange} />
              </DashboardCard>
            </Box>
            <Box>
              <DashboardCard title={`${title} Order List`}>
                <div>
                  {/* <TextField
                fullWidth
                variant="outlined"
                size="small"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              /> */}
                </div>
                <FullFeaturedCrudGrid
                  fullData={allOrders}
                  rowData={allOrders?.rows}
                  columnData={allOrders?.columns}
                  setColumnRow={setAllOrders}
                  setIsClose={setIsClose}
                  isClose={isClose}
                  showVisibilityIcon={false}
                  handleVisibilityClick={handleVisibilityClick}
                  hideEditButton={true}
                  hideDownloadButton={false}
                />
              </DashboardCard>
            </Box>
          </PageContainer>
        </>
      )}
    </>
  );
};

export default WebsiteOrderView;
