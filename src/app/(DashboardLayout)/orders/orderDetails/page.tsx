"use client";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Divider,
  Grid,
  Input,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Checkbox,
  Chip,
  Avatar,
} from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridFilterModel,
  GridValueGetterParams,
  GridToolbar,
} from "@mui/x-data-grid";
import RecentTransactions from "../../components/dashboard/RecentTransactions";
import { IconShoppingCart } from "@tabler/icons-react";
import { postOrderStatus } from "@/utils/apis/Order";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const OrderDetailsPage = ({ data, onClose , title }) => {
  const { row } = data;
  const { customerOrderId } = data.row;
  const { products } = data.row;
  const [orderStatus, setOrderStatus] = useState<any>("");
  const [formValues, setFormValues] = useState<any>({
    orderId: customerOrderId,
  });
  const [errors, setErrors] = useState("");


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };



  const handleStatusSubmit = () => {
    if (!formValues?.orderStatus) {
      toast.error("Order Status is required");
      return;
    }
    postOrderStatus(formValues)
      .then((orders) => {
        toast.success(orders?.message);
        setOrderStatus(data);
        setErrors("");
      })
      .catch((error) => {
        console.error("Error fetching order status:", error);
      });
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "Sr No.", width: 90 },
    {
      field: "itemName",
      headerName: "Item Name",
      width: 150,
      editable: true,
      filterable: true,
    },
    {
      field: "itemPrice",
      headerName: "Item Price",
      width: 150,
      editable: true,
      filterable: true,
    },
    {
      field: "productVariant",
      headerName: "Product Variant",
      width: 150,
      editable: true,
      filterable: true,
    },
    {
      field: "Tax",
      headerName: "Tax",
      type: "number",
      width: 150,
      editable: true,
      filterable: true,
    },
    {
      field: "ItemDiscount",
      headerName: "Item Discount",
      type: "number",
      width: 150,
      editable: true,
      filterable: true,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      type: "number",
      width: 150,
      editable: true,
      filterable: true,
    },
    {
      field: "TotalPrice",
      headerName: "Total Price",
      type: "number",
      width: 150,
      editable: true,
      filterable: true,
    },
  ];
  const rows = products.map((product, index) => ({
    
    id: index + 1,
    itemName: product.ProductName,
    itemPrice: `₹${product.price}`,
    productVariant: product.value,
    Tax: 0, // Replace with actual tax value if available
    ItemDiscount: product.discount, // Replace with actual discount value if available
    quantity:product.quantity,
    TotalPrice: row.totalPrice || row.paymentDetails?.totalMaxPrice, // Calculate total price
  }));

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.5rem",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h4" sx={{ fontSize: "1.125rem" }}>
              {title} Order Details
            </Typography>
          </div>
        </div>

        <div className="g-2">
          <Button
            onClick={onClose}
            style={{
              marginRight: "1.5rem",
            }}
            variant="contained"
          >
            Back
          </Button>
          <Button variant="contained">Print Invoice</Button>
        </div>
      </div>
      <PageContainer title="Order Details" description="Order Details">
        <Box flexGrow={1}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={8}>
              <Grid xs={12} lg={12}>
                <DashboardCard>
                  <Grid container spacing={3}>
                    <Grid item sm={6}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontSize: "1rem",
                        }}
                      >
                        {row?.orderId}
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{
                          fontSize: "14px",
                          color: "#697a8d !important",
                          marginTop: "0.3rem",
                        }}
                      >
                        {row?.orderDate}
                      </Typography>
                    </Grid>
                    <Grid item sm={6}>
                      <Box
                        sx={{
                          height: "auto",
                          width: "100%",
                          display: "flex",
                          justifyContent: "end",
                          paddingRight: "1.5rem",
                        }}
                      >
                        <div>
                          <Typography
                            variant="h6"
                            sx={{
                              fontSize: "14px",
                              color: "#697a8d !important",
                            }}
                          >
                            Status:&nbsp; {row?.orderStatus}
                          </Typography>
                          <Typography
                            variant="h6"
                            sx={{
                              fontSize: "14px",
                              color: "#697a8d !important",
                              marginTop: "0.3rem",
                            }}
                          >
                            Payment Method:&nbsp;
                            {row?.paymentDetails?.paymentMethod}
                          </Typography>
                          <Typography
                            variant="h6"
                            sx={{
                              fontSize: "14px",
                              color: "#697a8d !important",
                              marginTop: "0.3rem",
                            }}
                          >
                            Payment Status:&nbsp;{" "}
                            {row?.paymentDetails?.paymentStatus}
                          </Typography>
                          {/* <Typography
                            variant="h6"
                            sx={{
                              fontSize: "14px",
                              color: "#697a8d !important",
                              marginTop: "0.3rem",
                            }}
                          >
                            Order Verification Code:&nbsp; 06450
                          </Typography> */}
                        </div>
                      </Box>
                    </Grid>
                    <Grid item sm={12}>
                      <Box sx={{ height: "100%", width: "100%" }}>
                        <DataGrid rows={rows} columns={columns} />
                      </Box>
                    </Grid>
                    <Grid item sm={12}>
                      <Box
                        sx={{
                          height: "auto",
                          width: "100%",
                          display: "flex",
                          justifyContent: "end",
                          paddingRight: "1.5rem",
                        }}
                      >
                        <div>
                          <Typography
                            variant="h6"
                            sx={{
                              fontSize: "14px",
                            }}
                          >
                            Item Price:&nbsp;{" "}
                            {row?.paymentDetails?.paymentAmount}
                          </Typography>
                          <Typography
                            variant="h6"
                            sx={{
                              fontSize: "14px",
                              marginTop: "0.9rem",
                            }}
                          >
                            Item Discount:&nbsp;{" "}
                            {row?.paymentDetails?.paymentDiscount || "0"}
                          </Typography>
                          <Typography
                            variant="h6"
                            sx={{
                              fontSize: "14px",
                              marginTop: "0.9rem",
                            }}
                          >
                            Total:&nbsp; {row?.totalPrice}
                          </Typography>
                        </div>
                      </Box>
                    </Grid>
                  </Grid>
                </DashboardCard>
              </Grid>
              <Grid container spacing={2} sx={{ marginTop: "20px" }}>
                <Grid item xs={12} lg={4}>
                  <DashboardCard title="Customer Information">
                    <div>
                      <Grid item xs={12}>
                        <Typography
                          variant="h6"
                          gutterBottom
                          style={{
                            marginTop: 10,
                            marginBottom: 10,
                            fontSize: "0.90rem",
                          }}
                        >
                          {row?.customerName}
                        </Typography>
                        <Typography
                          variant="h6"
                          gutterBottom
                          style={{
                            marginTop: 10,
                            marginBottom: 10,
                            fontSize: "0.90rem",
                            color: "#697a8d !important",
                          }}
                        >
                          17 Orders
                        </Typography>
                        <Typography
                          variant="h6"
                          gutterBottom
                          style={{
                            marginTop: 10,
                            marginBottom: 10,
                            fontSize: "0.90rem",
                            color: "#697a8d !important",
                          }}
                        >
                          {row?.customerNumber}
                        </Typography>
                        <Typography
                          variant="h6"
                          gutterBottom
                          style={{
                            marginTop: 10,
                            marginBottom: 10,
                            fontSize: "0.90rem",
                            color: "#697a8d !important",
                          }}
                        >
                          {row.customerEmail}
                        </Typography>
                      </Grid>
                    </div>
                  </DashboardCard>
                </Grid>

                <Grid item xs={12} lg={4}>
                  <DashboardCard title="Shipping Address">
                    <div>
                      <Grid item xs={12}>
                        <Typography
                          variant="h6"
                          gutterBottom
                          style={{
                            marginTop: 10,
                            marginBottom: 10,
                            fontSize: "0.90rem",
                          }}
                        >
                          Name:&nbsp; {row?.shippingAddress?.name}
                        </Typography>
                        <Typography
                          variant="h6"
                          gutterBottom
                          style={{
                            marginTop: 10,
                            marginBottom: 10,
                            fontSize: "0.90rem",
                            color: "#697a8d !important",
                          }}
                        >
                          Contact:&nbsp; {row?.shippingAddress?.number}
                        </Typography>
                        <Typography
                          variant="h6"
                          gutterBottom
                          style={{
                            marginTop: 10,
                            marginBottom: 10,
                            fontSize: "0.90rem",
                            color: "#697a8d !important",
                          }}
                        >
                          Country:&nbsp; {row?.shippingAddress?.country}
                        </Typography>
                        <Typography
                          variant="h6"
                          gutterBottom
                          style={{
                            marginTop: 10,
                            marginBottom: 10,
                            fontSize: "0.90rem",
                            color: "#697a8d !important",
                          }}
                        >
                          City:&nbsp; {row?.shippingAddress?.city}
                        </Typography>
                        <Typography
                          variant="h6"
                          gutterBottom
                          style={{
                            marginTop: 10,
                            marginBottom: 10,
                            fontSize: "0.90rem",
                            color: "#697a8d !important",
                          }}
                        >
                          Zip Code:&nbsp; {row?.shippingAddress?.pincode}
                        </Typography>
                      </Grid>
                    </div>
                  </DashboardCard>
                </Grid>
                <Grid item xs={12} lg={4}>
                  <DashboardCard title="Accountant Approval">
                    <div>
                      <Grid item xs={12}>
                        <Typography
                          variant="h6"
                          gutterBottom
                          style={{
                            marginTop: 10,
                            marginBottom: 10,
                            fontSize: "0.90rem",
                          }}
                        >
                          Name:&nbsp; Devid Jack
                        </Typography>
                        <Typography
                          variant="h6"
                          gutterBottom
                          style={{
                            marginTop: 10,
                            marginBottom: 10,
                            fontSize: "0.90rem",
                            color: "#697a8d !important",
                          }}
                        >
                          Date & Time:&nbsp; 31 May 2024, 03:00 PM
                        </Typography>
                        <Typography
                          variant="h6"
                          gutterBottom
                          style={{
                            marginTop: 10,
                            marginBottom: 10,
                            fontSize: "0.90rem",
                            color: "#697a8d !important",
                          }}
                        >
                          Payment Received Status:&nbsp; {row?.accountStatus}
                        </Typography>
                      </Grid>
                    </div>
                  </DashboardCard>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} lg={4}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  {/* <MonthlyEarnings /> */}
                  <DashboardCard title="Status Change">
                    <div>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Typography
                            variant="h6"
                            gutterBottom
                            style={{
                              marginTop: 10,
                              marginBottom: 10,
                              fontSize: "0.90rem",
                            }}
                          >
                            Change Order Status
                          </Typography>
                          <Select
                            size="small"
                            fullWidth
                            variant="outlined"
                            value={formValues.orderStatus || "Select Status"} // Assuming 'orderStatus' is the name you want to store
                            onChange={handleChange}
                            name="orderStatus" // Name to identify in the state
                          >
                            <MenuItem value={"Select Status"}>
                              Select Status
                            </MenuItem>
                            <MenuItem value={"Inventory"}>Inventory</MenuItem>
                            <MenuItem value={"InDelivery"}>InDelivery</MenuItem>
                            <MenuItem value={"ReadyToShip"}>
                              ReadyToShip
                            </MenuItem>
                            <MenuItem value={"Delivered"}>Delivered</MenuItem>

                            {/* Other menu items */}
                          </Select>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography
                            variant="h6"
                            gutterBottom
                            style={{
                              marginTop: 10,
                              marginBottom: 10,
                              fontSize: "0.90rem",
                            }}
                          >
                            Payment Status
                          </Typography>
                          <Select
                            size="small"
                            fullWidth
                            variant="outlined"
                            value={formValues.paymentStatus || "Select Status"} // Assuming 'paymentStatus' is the name you want to store
                            onChange={handleChange}
                            name="paymentStatus" // Name to identify in the state
                          >
                            <MenuItem value={"Select Status"}>
                              Select Status
                            </MenuItem>
                            <MenuItem value={"Paid"}>Paid</MenuItem>
                            <MenuItem value={"Unpaid"}>Unpaid</MenuItem>
                          </Select>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography
                            variant="h6"
                            gutterBottom
                            style={{
                              marginTop: 10,
                              marginBottom: 10,
                              fontSize: "0.90rem",
                            }}
                          >
                            Shipping Method
                          </Typography>
                          <Select
                            size="small"
                            fullWidth
                            variant="outlined"
                            value={formValues.shippingMethod || "Choose Delivery Type"} // Assuming 'shippingMethod' is the name you want to store
                            onChange={handleChange}
                            name="shippingMethod" // Name to identify in the state
                          >
                            <MenuItem value={"Choose Delivery Type"}>
                              Choose Delivery Type
                            </MenuItem>
                            <MenuItem value={"BySelfDeliveryMan"}>
                              By Self Delivery Man
                            </MenuItem>
                            <MenuItem value={"ByThirdPartyDeliveryService"}>
                              By Third Party Delivery Service
                            </MenuItem>
                          </Select>
                        </Grid>
                      </Grid>
                    </div>
                    <div
                      style={{
                        marginTop: 10,
                        textAlign: "end",
                      }}
                      className="mt-2"
                    >
                      <Button onClick={handleStatusSubmit} variant="contained">
                        Save
                      </Button>
                    </div>
                  </DashboardCard>
                </Grid>
                <Grid item xs={12}>
                  {/* <YearlyBreakup /> */}
                  <RecentTransactions />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} lg={8}>
              {/* <ProductPerformance /> */}
            </Grid>
            <Grid item xs={12}>
              {/* <Blog /> */}
            </Grid>
          </Grid>
        </Box>
      </PageContainer>
      <Toaster />
    </>
  );
};

export default OrderDetailsPage;
