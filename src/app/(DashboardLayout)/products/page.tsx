"use client";
import React from "react";
import {
  Typography,
  Grid,
  CardContent,
  Box,
  Chip,
  TextField,
  Divider,
} from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import BlankCard from "@/app/(DashboardLayout)/components/shared/BlankCard";
import {
  DataGrid,
  GridColDef,
  GridFilterModel,
  GridValueGetterParams,
  GridToolbar,
} from "@mui/x-data-grid";
import CommonDataGrid from "../components/dataGrid/CommonDataGrid";
import { IconCalendarTime } from "@tabler/icons-react";
import FilterView from "../components/FilterView/FilterView";

const ProductsPage = () => {
  //filtering logic
  const CustomFilterComponent = ({ column, onFilterChange }: any) => {
    return (
      <TextField
        variant="standard"
        margin="normal"
        label={`Filter ${column.headerName}`}
        onChange={(e) => onFilterChange({ value: e.target.value })}
      />
    );
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "productName",
      headerName: "Product",
      width: 150,
      editable: true,
      filterable: true,
    },
    {
      field: "productCategory",
      headerName: "Category",
      width: 150,
      editable: true,
      filterable: true,
    },
    {
      field: "productSKU",
      headerName: "SKU",
      type: "number",
      width: 110,
      editable: true,
      filterable: true,
    },
    {
      field: "productPrice",
      headerName: "Price",
      type: "number",
      width: 110,
      editable: true,
    },
    // {
    //   field: 'productPrice',
    //   headerName: 'Price',
    //   description: 'This column has a value getter and is not sortable.',
    //   sortable: false,
    //   width: 160,
    //   valueGetter: (params: GridValueGetterParams) =>
    //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    // },
    {
      field: "stock",
      headerName: "QTY",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "productStatus",
      headerName: "Status",
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={params.value === "Active" ? "primary" : "default"}
        />
      ),
      filterable: true,
    },
  ];

  const rows = [
    {
      id: 1,
      productName: "Nike Sneakers",
      productCategory: "footwear",
      productSKU: 101,
      productPrice: 120,
      stock: 150,
      productStatus: "Active",
    },
    {
      id: 2,
      productName: "Adidas Running Shoes",
      productCategory: "footwear",
      productSKU: 102,
      productPrice: 90,
      stock: 200,
      productStatus: "Inactive",
    },
    {
      id: 3,
      productName: "Under Armour T-Shirt",
      productCategory: "apparel",
      productSKU: 201,
      productPrice: 30,
      stock: 300,
      productStatus: "Active",
    },
    {
      id: 4,
      productName: "Reebok CrossFit Gloves",
      productCategory: "accessories",
      productSKU: 301,
      productPrice: 25,
      stock: 50,
      productStatus: "Scheduled",
    },
    {
      id: 5,
      productName: "Puma Backpack",
      productCategory: "accessories",
      productSKU: 302,
      productPrice: 50,
      stock: 100,
      productStatus: "Active",
    },
    {
      id: 6,
      productName: "New Balance Running Shorts",
      productCategory: "apparel",
      productSKU: 202,
      productPrice: 40,
      stock: 80,
      productStatus: "Inactive",
    },
    {
      id: 7,
      productName: "Skechers Walking Shoes",
      productCategory: "footwear",
      productSKU: 103,
      productPrice: 80,
      stock: 120,
      productStatus: "Scheduled",
    },
    {
      id: 8,
      productName: "Columbia Winter Jacket",
      productCategory: "apparel",
      productSKU: 203,
      productPrice: 150,
      stock: 60,
      productStatus: "Active",
    },
    {
      id: 9,
      productName: "ASICS Tennis Racket",
      productCategory: "sports equipment",
      productSKU: 401,
      productPrice: 70,
      stock: 30,
      productStatus: "Inactive",
    },
    {
      id: 10,
      productName: "Merrell Hiking Boots",
      productCategory: "footwear",
      productSKU: 104,
      productPrice: 110,
      stock: 90,
      productStatus: "Active",
    },
    {
      id: 11,
      productName: "Fila Sweatshirt",
      productCategory: "apparel",
      productSKU: 204,
      productPrice: 45,
      stock: 110,
      productStatus: "Scheduled",
    },
    {
      id: 12,
      productName: "Salomon Ski Goggles",
      productCategory: "accessories",
      productSKU: 303,
      productPrice: 60,
      stock: 70,
      productStatus: "Active",
    },
    {
      id: 13,
      productName: "Converse Canvas Sneakers",
      productCategory: "footwear",
      productSKU: 105,
      productPrice: 55,
      stock: 180,
      productStatus: "Inactive",
    },
    {
      id: 14,
      productName: "Oakley Sunglasses",
      productCategory: "accessories",
      productSKU: 304,
      productPrice: 75,
      stock: 40,
      productStatus: "Active",
    },
    {
      id: 15,
      productName: "Tommy Hilfiger Polo Shirt",
      productCategory: "apparel",
      productSKU: 205,
      productPrice: 35,
      stock: 130,
      productStatus: "Scheduled",
    },
    {
      id: 16,
      productName: "Brooks Running Hat",
      productCategory: "accessories",
      productSKU: 305,
      productPrice: 20,
      stock: 95,
      productStatus: "Active",
    },
    {
      id: 17,
      productName: "Mizuno Volleyball",
      productCategory: "sports equipment",
      productSKU: 402,
      productPrice: 25,
      stock: 20,
      productStatus: "Inactive",
    },
    {
      id: 18,
      productName: "Vans Skateboard",
      productCategory: "sports equipment",
      productSKU: 403,
      productPrice: 90,
      stock: 55,
      productStatus: "Active",
    },
    {
      id: 19,
      productName: "Asolo Backpacking Boots",
      productCategory: "footwear",
      productSKU: 106,
      productPrice: 130,
      stock: 75,
      productStatus: "Scheduled",
    },
    {
      id: 20,
      productName: "The North Face Jacket",
      productCategory: "apparel",
      productSKU: 206,
      productPrice: 120,
      stock: 100,
      productStatus: "Active",
    },
  ];

  return (
    <PageContainer title="Products" description="All Prodcuts">
      <BlankCard>
        <CardContent sx={{ display: "flex", justifyContent: "center" }}>
          <Grid container spacing={2} justifyItems={"stretch"} xs={12} lg={12}>
            <Grid item spacing={2} xl={3} lg={3} md={6} xs={12}>
              <Grid
                container
                sx={{
                  justifyContent: "space-between",
                  padding: "0 0.8rem ",
                  "@media (min-width: 600px)": {
                    border: "none",
                  },
                  "@media (min-width: 900px)": {
                    borderRightColor: "primary.main",
                    borderRightStyle: "solid",
                    borderRightWidth: "0.1em",
                  },
                  "@media (min-width: 1200px)": {
                    borderRightColor: "primary.main",
                    borderRightStyle: "solid",
                    borderRightWidth: "0.1em",
                  },
                }}
              >
                <Grid item>
                  <Typography variant="h2" sx={{ marginBottom: "0.5rem" }}>
                    56
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ fontSize: "15px" }}
                  >
                    Pending Payment
                  </Typography>
                </Grid>
                <Grid>
                  <IconCalendarTime width={38} height={38} />
                </Grid>
              </Grid>
              <Divider
                sx={{
                  borderRadius: 1,
                  borderColor: "primary.main",
                  "@media (max-width: 900px)": {
                    marginTop: "16px",
                    marginRight: "0",
                  },
                  "@media (min-width: 900px)": {
                    marginTop: "16px",
                    marginRight: "16px",
                  },
                  "@media (min-width: 1200px)": {
                    display: "none",
                  },
                }}
              />
            </Grid>
            <Grid item spacing={2} xl={3} lg={3} md={6} xs={12}>
              <Grid
                container
                sx={{
                  justifyContent: "space-between",
                  padding: "0 0.8rem ",
                  "@media (min-width: 600px)": {
                    border: "none",
                  },
                  "@media (min-width: 900px)": {
                    border: "none",
                  },
                  "@media (min-width: 1200px)": {
                    borderRightColor: "primary.main",
                    borderRightStyle: "solid",
                    borderRightWidth: "0.1em",
                  },
                }}
              >
                <Grid item>
                  <Typography variant="h2" sx={{ marginBottom: "0.5rem" }}>
                    12,698
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ fontSize: "15px" }}
                  >
                    Completed
                  </Typography>
                </Grid>
                <Grid>
                  <IconCalendarTime width={38} height={38} />
                </Grid>
              </Grid>
              <Divider
                sx={{
                  borderRadius: 1,
                  borderColor: "primary.main",
                  "@media (max-width: 900px)": {
                    marginTop: "16px",
                    marginRight: "0",
                  },
                  "@media (min-width: 900px)": {
                    marginTop: "16px",
                    marginRight: "16px",
                  },
                  "@media (min-width: 1200px)": {
                    display: "none",
                  },
                }}
              />
            </Grid>
            <Grid item spacing={2} xl={3} lg={3} md={6} xs={12}>
              <Grid
                container
                sx={{
                  justifyContent: "space-between",
                  padding: "0 0.8rem ",
                  "@media (min-width: 600px)": {
                    border: "none",
                  },
                  "@media (min-width: 900px)": {
                    borderRightColor: "primary.main",
                    borderRightStyle: "solid",
                    borderRightWidth: "0.1em",
                  },
                  "@media (min-width: 1280px)": {
                    borderRightColor: "primary.main",
                    borderRightStyle: "solid",
                    borderRightWidth: "0.1em",
                  },
                }}
              >
                <Grid item>
                  <Typography variant="h2" sx={{ marginBottom: "0.5rem" }}>
                    124
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ fontSize: "15px" }}
                  >
                    Refunded
                  </Typography>
                </Grid>
                <Grid>
                  <IconCalendarTime width={38} height={38} />
                </Grid>
              </Grid>
              <Divider
                sx={{
                  borderRadius: 1,
                  borderColor: "primary.main",
                  "@media (max-width: 900px)": {
                    marginTop: "16px",
                    marginRight: "0",
                  },
                  "@media (min-width: 900px)": {
                    display: "none",
                  },
                  "@media (min-width: 1200px)": {
                    display: "none",
                  },
                }}
              />
            </Grid>
            <Grid item spacing={2} xl={3} lg={3} md={6} xs={12}>
              <Grid
                container
                sx={{ justifyContent: "space-between", padding: "0 0.8rem" }}
              >
                <Grid item>
                  <Typography variant="h2" sx={{ marginBottom: "0.5rem" }}>
                    32
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ fontSize: "15px" }}
                  >
                    Failed
                  </Typography>
                </Grid>
                <Grid>
                  <IconCalendarTime width={38} height={38} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </BlankCard>
      <div style={{ paddingTop: "0.8rem" }}>
        <CommonDataGrid columnDefinitions={columns} rows={rows} />
      </div>
    </PageContainer>
  );
};

export default ProductsPage;
