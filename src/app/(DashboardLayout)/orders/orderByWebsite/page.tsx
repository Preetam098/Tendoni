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

const OrderDetailsByWebsitePage = () => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "Sr No.", width: 90 },
    {
      field: "itemName",
      headerName: "Item Details",
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
      field: "TotalPrice",
      headerName: "Total Price",
      type: "number",
      width: 150,
      editable: true,
      filterable: true,
    },
  ];

  const rows = [
    {
      id: 1,
      itemName: "Nike Sneakers",
      itemPrice: "$123",
      productVariant: "200gm",
      Tax: 101,
      ItemDiscount: 120,
      TotalPrice: 150,
    },
    {
      id: 2,
      itemName: "Nike Sneakers",
      itemPrice: "$123",
      productVariant: "200gm",
      Tax: 101,
      ItemDiscount: 120,
      TotalPrice: 150,
    },
    {
      id: 3,
      itemName: "Nike Sneakers",
      itemPrice: "$123",
      productVariant: "200gm",
      Tax: 101,
      ItemDiscount: 120,
      TotalPrice: 150,
    },
    {
      id: 4,
      itemName: "Nike Sneakers",
      itemPrice: "$123",
      productVariant: "200gm",
      Tax: 101,
      ItemDiscount: 120,
      TotalPrice: 150,
    },
    {
      id: 5,
      itemName: "Nike Sneakers",
      itemPrice: "$123",
      productVariant: "200gm",
      Tax: 101,
      ItemDiscount: 120,
      TotalPrice: 150,
    },
    {
      id: 6,
      itemName: "Nike Sneakers",
      itemPrice: "$123",
      productVariant: "200gm",
      Tax: 101,
      ItemDiscount: 120,
      TotalPrice: 150,
    },
    {
      id: 7,
      itemName: "Nike Sneakers",
      itemPrice: "$123",
      productVariant: "200gm",
      Tax: 101,
      ItemDiscount: 120,
      TotalPrice: 150,
    },
    {
      id: 8,
      itemName: "Nike Sneakers",
      itemPrice: "$123",
      productVariant: "200gm",
      Tax: 101,
      ItemDiscount: 120,
      TotalPrice: 150,
    },
    {
      id: 9,
      itemName: "Nike Sneakers",
      itemPrice: "$123",
      productVariant: "200gm",
      Tax: 101,
      ItemDiscount: 120,
      TotalPrice: 150,
    },
    {
      id: 10,
      itemName: "Nike Sneakers",
      itemPrice: "$123",
      productVariant: "200gm",
      Tax: 101,
      ItemDiscount: 120,
      TotalPrice: 150,
    },
  ];
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
              Order Details By Website
            </Typography>
          </div>
        </div>
        <div>
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
                        Order Id #001
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{
                          fontSize: "14px",
                          color: "#697a8d !important",
                          marginTop: "0.3rem",
                        }}
                      >
                        Aug 17, 2023, 5:48 (ET)
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
                            Status:&nbsp; Pending
                          </Typography>
                          <Typography
                            variant="h6"
                            sx={{
                              fontSize: "14px",
                              color: "#697a8d !important",
                              marginTop: "0.3rem",
                            }}
                          >
                            Payment Method:&nbsp; Online
                          </Typography>
                          <Typography
                            variant="h6"
                            sx={{
                              fontSize: "14px",
                              color: "#697a8d !important",
                              marginTop: "0.3rem",
                            }}
                          >
                            Payment Status:&nbsp; Unpaind
                          </Typography>
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
                            Item Price:&nbsp; 200
                          </Typography>
                          <Typography
                            variant="h6"
                            sx={{
                              fontSize: "14px",
                              marginTop: "0.9rem",
                            }}
                          >
                            Product Variant:&nbsp; 200gm
                          </Typography>
                          <Typography
                            variant="h6"
                            sx={{
                              fontSize: "14px",
                              marginTop: "0.9rem",
                            }}
                          >
                            Item Discount:&nbsp; 10
                          </Typography>
                          <Typography
                            variant="h6"
                            sx={{
                              fontSize: "14px",
                              marginTop: "0.9rem",
                            }}
                          >
                            Total:&nbsp; 06450
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
                          Devid Jack
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
                          1234567890
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
                          customer@gmail.com
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
                          Contact:&nbsp; 1234567890
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
                          Country:&nbsp; India
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
                          City:&nbsp; Bhopal
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
                          Zip Code:&nbsp; 2413
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
                          Payment Received Status:&nbsp; Approved
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
                          defaultValue={"Select Options"}
                        >
                          <MenuItem value={"Select Options"}>
                            Select Options
                          </MenuItem>
                          <MenuItem value={"Confirmed"}>Confirmed</MenuItem>
                          <MenuItem value={"Pending"}>Pending</MenuItem>
                          <MenuItem value={"Packging"}>Packging</MenuItem>
                          <MenuItem value={"OutofDelivery"}>
                            Out of Delivery
                          </MenuItem>
                          <MenuItem value={"Delivered"}>Delivered</MenuItem>
                          <MenuItem value={"Returned"}>Returned</MenuItem>
                          <MenuItem value={"FailedofDeliver"}>
                            Failed of Deliver
                          </MenuItem>
                          <MenuItem value={"Canceled"}>Canceled</MenuItem>
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
                          defaultValue={"Select Options"}
                        >
                          <MenuItem value={"Select Options"}>
                            Select Options
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
                          defaultValue={"Choose Delivery Type"}
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
    </>
  );
};

export default OrderDetailsByWebsitePage;
