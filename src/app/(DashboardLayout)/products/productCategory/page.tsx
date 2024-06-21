"use client";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import DataGridView from "../../components/dataGridView/dataGridView";
import {
  deleteCategories,
  getAllCategories,
  postCategories,
  putCategories,
  putStatusChangeCategory,
} from "@apis/Category/index";
import React, { useEffect, useState } from "react";
import CommonDataModel from "@models/CommonDataModel";
import { GridColDef, GridRowsProp } from "@mui/x-data-grid";
import ProductCategoryModel from "@models/ProductCategoryModel";
import { Grid, Switch } from "@mui/material";
import ProductSubCategoryModel from "@models/ProductSubCategoryModel";
import FullFeaturedCrudGrid from "../../components/dataGrid/newtemp";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Subcategories from "./subCategory";
import Snackers from "@/utils/models/Snackers";

const ImageEditor = ({ row, onCategoryImageChange }: any) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFile(files[0]);
      onCategoryImageChange(row.id, files[0]);
      setPreview(URL.createObjectURL(files[0]));
    }
  };

  useEffect(() => {
    if (row.categoryImage && typeof row.categoryImage === "string") {
      setPreview(row.categoryImage);
    }
  }, [row.categoryImage]);

  return (
    <>
      <input type="file" onChange={handleFileChange} />
      {preview && (
        <img
          src={preview}
          style={{ width: "50px", height: "50px", borderRadius: 50 }}
          alt="Preview"
        />
      )}
    </>
  );
};

const CategoryListPage = () => {
  const [isVariantIdVisible, setVariantIdVisible] = useState(false);
  const [selectedVariantId, setSelectedVariantId] = useState(null);
  const [request, setRequest] = useState<boolean>();

  const CategoryColumnDefinition: GridColDef[] = [
    {
      field: "categoryName",
      headerName: "Category Name",
      flex: 1,
      editable: true,
    },
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
                putStatusChangeCategory(params.row.id, newStatus)
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
    {
      field: "categoryImage",
      headerName: "Category Image",
      width: 120,
      editable: true,
      renderCell: (params: any) => {
        if (params.id !== undefined) {
          return (
            <img
              src={params.row.categoryImage}
              style={{ width: "50px", height: "50px", borderRadius: 50 }}
              alt="Category"
            />
          );
        } else {
          return null;
        }
      },
      renderEditCell: (params: any) => (
        <ImageEditor
          row={params.row}
          onCategoryImageChange={handleCategoryImageChange}
        />
      ),
    },
  ];

  const [rows, setRows] = useState<GridRowsProp>();
  const [arrayRows, setArrayRows] = useState<any[]>([]);
  const [isClose, setIsClose] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [columnRow, setColumnRow] = useState([]);
  const [categoryState, setCategoryState] = useState<CommonDataModel>({
    columns: CategoryColumnDefinition,
    rows: columnRow,
  });

  var handleSwitchChange = (event: any, row: any) => {
    const newStatus = event.target.checked ? "Active" : "Inactive";
    setCategoryState((prev) => ({
      ...prev,
      rows: prev.rows.map((r) =>
        r.id === row.id ? { ...r, status: newStatus } : r
      ),
    }));
  };

  React.useEffect(() => {
    getAllCategories().then?.((category) => {
      var data: any = [];
      for (let i = 0; i < category?.length; i++) {
        const element = {
          id: category[i].categoryId,
          categoryName: category[i].categoryName,
          status: category[i].status,
          categoryImage: category[i].categoryImage,
        };
        data.push(element);
      }
      setCategoryState({
        columns: CategoryColumnDefinition,
        rows: data,
      });
      setColumnRow(data);
    });
  }, [request, isClose]);

  const postCategoryState = (row: any) => {
    const formData = new FormData();
    const foundObject = categoryState.rows.find((obj) => obj.id === row.id);

    formData.append("categoryName", row.categoryName);
    formData.append(
      "status",
      foundObject.status === "" ? "Inactive" : foundObject.status
    );
    if (foundObject.categoryImage instanceof File) {
      formData.append("categoryImage", foundObject.categoryImage);
    }

    postCategories(formData)
      .then((response) => {
        setSnackbarOpen(true);
        setRequest((prevRequest) => !prevRequest);
        setMessage(response.message);
      })
      .catch((error) => {
        setSnackbarOpen(true);
        setRequest((prevRequest) => !prevRequest);
        setMessage(error);
      });
  };

  const putCategoryState = (row: any) => {
    const formData = new FormData();
    const foundObject = categoryState.rows.find((obj) => obj.id === row.id);

    formData.append("categoryName", row.categoryName);
    formData.append(
      "status",
      foundObject.status === "" ? "Inactive" : foundObject.status
    );
    if (foundObject.categoryImage instanceof File) {
      formData.append("categoryImage", foundObject.categoryImage);
    }
    formData.append("categoryId", row.id);
    putCategories(formData)
      .then((response) => {
        setSnackbarOpen(true);
        setRequest((prevRequest) => !prevRequest);
        setMessage(response.message);
      })
      .catch((error) => {
        setSnackbarOpen(true);
        setRequest((prevRequest) => !prevRequest);
        setMessage(error);
      });
  };

  const handleCategoryImageChange = (id: any, file: File) => {
    setCategoryState((prev) => ({
      ...prev,
      rows: prev.rows.map((r) =>
        r.id === id ? { ...r, categoryImage: file } : r
      ),
    }));
  };

  const handleVisibilityClick = (id: any) => {
    setSelectedVariantId(id);
    setVariantIdVisible(true);
  };

  const deletecategories = (id: string) => {
    deleteCategories(id).then((value) => {
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
      title="Tendoni | All Categories"
      description="this is Sample page"
    >
      <Snackers
        open={snackbarOpen}
        closeSnacker={closeSnacker}
        message={message}
      />
      <Grid container spacing={2} sx={{ width: "100%" }}>
        <Grid item xs={12} md={12}>
          {isVariantIdVisible ? (
            <Subcategories
              id={selectedVariantId}
              onClose={() => setVariantIdVisible(false)}
            />
          ) : (
            <DashboardCard title="All Categories">
              <FullFeaturedCrudGrid
                rowData={categoryState.rows}
                columnData={categoryState.columns}
                setColumnRow={setCategoryState}
                postApi={postCategoryState}
                putApi={putCategoryState}
                deleteApi={deletecategories}
                showVisibilityIcon={true}
                handleVisibilityClick={handleVisibilityClick}
                setIsClose={setIsClose}
                isClose={isClose}
                hideEditButton={false}
                hideDeleteButton={false}
              />
            </DashboardCard>
          )}
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default CategoryListPage;
