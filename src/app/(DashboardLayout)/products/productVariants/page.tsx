"use client";
import PageContainer from "../../components/container/PageContainer";
import DashboardCard from "../../components/shared/DashboardCard";
import FullFeaturedCrudGrid from "../../components/dataGrid/newtemp";
import React, { useEffect, useState } from "react";
import {
  deleteProductVariant,
  getAllProductVariant,
  postProductVariant,
  putProductVariant,
  putStatusChangeVariant,
} from "@/utils/apis/Product variant";
import { GridColDef } from "@mui/x-data-grid";
import CommonDataModel from "@/utils/models/CommonDataModel";
import VariantsID from "./variant";
import VariantCurrent from "./variant";
import {
  productVariantInformation,
  productVariantInformationUpdate,
} from "@/utils/apis/Product variant/type";
import { Button, Switch } from "@mui/material";
import Snackers from "@/utils/models/Snackers";

const ProductVariantsPage = () => {
  const productVariantColumnDefinition: GridColDef[] = [
    {
      field: "variantName",
      headerName: "variantName",
      flex: 1,
      editable: true,
    },
    // { field: "id", headerName: "id", flex: 1, editable: true },

    {
      field: "status",
      headerName: "Status",
      flex: 1,
      editable: true,
      renderCell: (params: any) => {
        if (params.id !== undefined) {
          return (
            <Switch
              checked={params.row.status === "Active"}
              onChange={(event) => {
                const newStatus = event.target.checked ? "Active" : "Inactive";
                // Update the status via API call
                putStatusChangeVariant(params.row.id, newStatus)
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
      renderEditCell: (params: any) => {
        params.checked = params.formattedValue === "Active";
        return (
          <Switch
            checked={params.checked}
            onChange={(event) => {
              handleSwitchChange(event, params.row);
            }}
            color="primary"
            inputProps={{ "aria-label": "primary checkbox" }}
          />
        );
      },
    },
  ];
  const [request, setRequest] = useState<boolean>();
  const [isClose, setIsClose] = useState(false);

  const [isVariantIdVisible, setVariantIdVisible] = useState(false);
  const [selectedVariantId, setSelectedVariantId] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [message, setMessage] = useState("");

  const [columnRow, setColumnRow] = useState([]);
  const [allProductVariants, setProductVariants] = useState<CommonDataModel>({
    columns: productVariantColumnDefinition,
    rows: columnRow,
  });

  var handleSwitchChange = (event: any, row: any) => {
    const newStatus = event.target.checked ? "Active" : "Inactive";

    setProductVariants((prev) => ({
      ...prev,
      rows: prev.rows.map((r) =>
        r.id === row.id ? { ...r, status: newStatus } : r
      ),
    }));
  };

  React.useEffect(() => {
    getAllProductVariant().then?.((productVariant) => {
      var data: any = [];
      for (let i = 0; i < productVariant?.length; i++) {
        const element = {
          id: productVariant[i].variantId,
          variantName: productVariant[i].variantName,
          status: productVariant[i].status,
        };
        data.push(element);
      }
      setProductVariants({
        columns: productVariantColumnDefinition,
        rows: data,
      });
      setProductVariants((prev) => ({
        ...prev,
        rows: data,
      }));
      setColumnRow(data);
    });
  }, [request, isClose]);
  const handleVisibilityClick = (id: any) => {
    setSelectedVariantId(id);
    setVariantIdVisible(true);
  };

  const postproductvariant = (newData: productVariantInformation) => {
    const foundObject = allProductVariants.rows.find(
      (obj) => obj.id === newData.id
    );
    foundObject.variantName = newData.variantName;
    foundObject.status =
      foundObject.status == "" ? "Inactive" : foundObject.status;

    postProductVariant(foundObject)
      .then((response) => {
        setSnackbarOpen(true);
        setRequest((prevRequest) => !prevRequest);
        setMessage(response.message);
      })
      .catch((error) => {
        setSnackbarOpen(true);
        setRequest((prevRequest) => !prevRequest);
        setMessage(error);
        // console.error("Error posting product variant:", error);
      });
  };
  const putproductvariant = (newData: productVariantInformationUpdate) => {
    const foundObject = allProductVariants.rows.find(
      (obj) => obj.id === newData.id
    );
    foundObject.variantName = newData.variantName;
    foundObject.status =
      foundObject.status == "" ? "Inactive" : foundObject.status;
    putProductVariant(foundObject)
      .then((response) => {
        setSnackbarOpen(true);
        setRequest((prevRequest) => !prevRequest);
        setMessage(response.message);
      })
      .catch((error) => {
        setSnackbarOpen(true);
        setRequest((prevRequest) => !prevRequest);
        setMessage(error);
        // console.error("Error posting product variant:", error);
      });
  };

  const deleteVariantKey = (data: any) => {
    deleteProductVariant(data).then((value) => {
      setRequest((prevRequest) => !prevRequest);
      setSnackbarOpen(true);
      setMessage("Delete Successfully ");
    });
  };

  const closeSnacker = () => {
    setSnackbarOpen(false);
  };

  return (
    <PageContainer
      title="Tendoni | Product Variants"
      description="this is Sample page"
    >
      <Snackers
        open={snackbarOpen}
        closeSnacker={closeSnacker}
        message={message}
      />

      {isVariantIdVisible ? (
        <VariantCurrent
          id={selectedVariantId}
          onClose={() => setVariantIdVisible(false)}
        />
      ) : (
        <DashboardCard title="All Variants">
          <FullFeaturedCrudGrid
            rowData={allProductVariants.rows}
            columnData={allProductVariants.columns}
            setColumnRow={setProductVariants}
            postApi={postproductvariant}
            putApi={putproductvariant}
            deleteApi={deleteVariantKey}
            showVisibilityIcon={true}
            handleVisibilityClick={handleVisibilityClick}
            setIsClose={setIsClose}
            isClose={isClose}
            hideEditButton={false}
            hideDeleteButton={false}
          />
        </DashboardCard>
      )}
    </PageContainer>
  );
};

export default ProductVariantsPage;
