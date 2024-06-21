"use client";

import React, { useState } from "react";
import PageContainer from "../../components/container/PageContainer";
import DashboardCard from "../../components/shared/DashboardCard";
import FullFeaturedCrudGrid from "../../components/dataGrid/newtemp";
import {
  deleteProduct,
  getAllProducts,
  putStatusChangeProduct,
} from "@/utils/apis/Product";
import { GridColDef } from "@mui/x-data-grid";
import CommonDataModel from "@/utils/models/CommonDataModel";
import AddProductPage from "../addNewProduct/page";
import Snackers from "@/utils/models/Snackers";
import { Switch } from "@mui/material";

const ProductDetails = () => {
  const productsColumnDefinition: GridColDef[] = [
    { field: "Product", headerName: "Product Name", flex: 1, editable: true },
    // { field: "id", headerName: "id", flex: 1, editable: true },

    {
      field: "Variants",
      headerName: "Variants Count",
      align: "left",
      flex: 1,
      headerAlign: "left",
      editable: true,
    },
    {
      field: "productStatus",
      headerName: "Status",
      flex: 1,
      editable: true,
      renderCell: (params: any) => {
        if (params.id !== undefined) {
          return (
            <Switch
              checked={params.row.productStatus === "Active"}
              onChange={(event) => {
                const newStatus = event.target.checked ? "Active" : "Inactive";
                // Update the status via API call
                putStatusChangeProduct(params.row.id, newStatus)
                  .then((response) => {
                    setSnackbarOpen(true);
                    setRequest(!request);
                    setMessage(response.message);
                  })
                  .catch((error) => {
                    setSnackbarOpen(true);
                    setRequest(!request);
                    setMessage(error);
                  });
              }}
              color="primary"
              inputProps={{ "aria-label": "primary checkbox" }}
            />
          );
        } else {
          return null;
        }
      },
    },
    {
      field: "ProductImage",
      headerName: "Product Image",
      align: "left",
      flex: 1,
      headerAlign: "left",
      editable: true,
      renderCell: (params: any) => {
        if (params.id !== undefined) {
          return (
            <img
              src={params.row.ProductImage}
              style={{ width: "50px", height: "50px", borderRadius: 50 }}
              alt="Category"
            />
          );
        } else {
          return null;
        }
      },
    },
  ];
  const [request, setRequest] = useState<boolean>();
  const [isClose, setIsClose] = useState(false);

  const [isVariantIdVisible, setVariantIdVisible] = useState(false);
  const [selectedVariantId, setSelectedVariantId] = useState<any>("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [message, setMessage] = useState("");

  const [columnRow, setColumnRow] = useState([]);
  const [allproducts, setProducts] = useState<CommonDataModel>({
    columns: productsColumnDefinition,
    rows: columnRow,
  });

  React.useEffect(() => {
    getAllProducts().then?.((products) => {
      var data: any = [];
      for (let i = 0; i < products?.length; i++) {
        const element = {
          id: products[i].productId,
          Product: products[i].productName,
          Variants: products[i].variants.length,
          ProductImage: products[i].productImages[0],
          productStatus: products[i].productStatus,
        };
        data.push(element);
      }
      setProducts(data);
      setProducts({
        columns: productsColumnDefinition,
        rows: data,
      });
      setProducts((prev) => ({
        ...prev,
        rows: data,
      }));
      setColumnRow(data);
    });
  }, [request, isClose, isVariantIdVisible]);

  const deleteProductKey = (data: any) => {
    deleteProduct(data).then((value) => {
      setRequest((prevRequest) => !prevRequest);
      setSnackbarOpen(true);
      setMessage("Delete Successfully ");
    });
  };
  const handleVisibilityClick = (id: any) => {
    setSelectedVariantId(id);
    setVariantIdVisible(true);
  };

  const closeSnacker = () => {
    setSnackbarOpen(false);
  };
  const putCurrentVariantKey = () => {};
  const CurrentVariant = () => {};
  const handleClose = () => {
    setVariantIdVisible(false);
  };
  return (
    <>
      <PageContainer title="Product Details" description="Product Details">
        <Snackers
          open={snackbarOpen}
          closeSnacker={closeSnacker}
          message={message}
        />
        {isVariantIdVisible ? (
          <AddProductPage
            // id={selectedVariantId || ""}
            onClose={handleClose}
            isVariantIdVisible={isVariantIdVisible}
            productIds={selectedVariantId}
          />
        ) : (
          <DashboardCard title="Product Details">
            <FullFeaturedCrudGrid
              rowData={allproducts.rows}
              columnData={allproducts.columns}
              setColumnRow={setProducts}
              postApi={CurrentVariant}
              putApi={putCurrentVariantKey}
              deleteApi={deleteProductKey}
              showVisibilityIcon={true}
              handleVisibilityClick={handleVisibilityClick}
              hideEditButton={true}
              setIsClose={setIsClose}
              isClose={isClose}
              hideDeleteButton={false}
            />

            {/* <FullFeaturedCrudGridDemo /> */}
          </DashboardCard>
        )}
      </PageContainer>
    </>
  );
};

export default ProductDetails;
