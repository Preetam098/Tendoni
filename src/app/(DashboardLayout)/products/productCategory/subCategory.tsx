"use client";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import DataGridView from "../../components/dataGridView/dataGridView";
import {
  deleteCategories,
  getAllCategories,
  postCategories,
  putCategories,
} from "@apis/Category/index";
import React, { useEffect, useState } from "react";
import CommonDataModel from "@models/CommonDataModel";
import { GridCloseIcon, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import ProductCategoryModel from "@models/ProductCategoryModel";
import { Grid, Switch } from "@mui/material";
import ProductSubCategoryModel from "@models/ProductSubCategoryModel";
import FullFeaturedCrudGrid from "../../components/dataGrid/newtemp";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";
import {
  deleteSubCategory,
  getAllSubCategoriesByCategoryId,
  postSubCategory,
  putSubCategory,
  putSubStatusChangeCategory,
} from "@/utils/apis/subCategory";
import Snackers from "@/utils/models/Snackers";

const ImageEditor = ({ row, onCategoryImageChange }) => {
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
    if (row.subCategoryImage && typeof row.subCategoryImage === "string") {
      setPreview(row.subCategoryImage);
    }
  }, [row.subCategoryImage]);

  return (
    <>
      <input type="file" className="" onChange={handleFileChange} />
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
const Subcategories = ({ id, onClose }: { id: any; onClose: () => void }) => {
  const [isVariantIdVisible, setVariantIdVisible] = useState(false);
  const [request, setRequest] = useState<boolean>();
  const [isClose, setIsClose] = useState(false);

  const [selectedVariantId, setSelectedVariantId] = useState(null);
  const SubCategoryColumnDefinition: GridColDef[] = [
    // { field: "id", headerName: "ID", width: 90 },
    {
      field: "subCategoryName",
      headerName: "SubCategory Name",
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
                // Update the status via API call
                putSubStatusChangeCategory(params.row.id, newStatus)
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
    // {
    //   field: "subCategoryImages",
    //   headerName: "subCategory Image",
    //   width: 120,
    //   editable: true,
    //   renderCell: (params: any) => (
    //     <>
    //       <img
    //         src={params?.row?.subCategoryImages}
    //         style={{ width: "50px", height: "50px", borderRadius: 50 }}
    //       />
    //     </>
    //   ),
    // },
    {
      field: "subCategoryImage",
      headerName: "Subcategory Image",
      width: 120,
      editable: true,
      renderCell: (params: any) => {
        if (params.id !== undefined) {
          return (
            <img
              src={params.row.subCategoryImage}
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
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [rows, setRows] = useState<GridRowsProp>();
  const [arrayRows, setArrayRows] = useState<any[]>([]);

  const [columnRow, setColumnRow] = useState([]);
  const [categoryState, setCategoryState] = useState<CommonDataModel>({
    columns: SubCategoryColumnDefinition,
    rows: columnRow,
  });

  // const handleFileChange = (id: string, file: File) => {
  //   const reader = new FileReader();
  //   reader.onloadend = () => {
  //     const base64String = reader?.result?.toString() || "";
  //     setCategoryState((prev) => ({
  //       ...prev,
  //       rows: prev.rows.map((row) =>
  //         row.id === id ? { ...row, categoryImage: base64String } : row
  //       ),
  //     }));
  //   };
  //   reader.readAsDataURL(file);
  // };
  var handleSwitchChange = (event, row) => {
    const newStatus = event.target.checked ? "Active" : "Inactive";

    setSubCategoryState((prev) => ({
      ...prev,
      rows: prev.rows.map((r) =>
        r.id === row.id ? { ...r, status: newStatus } : r
      ),
    }));
  };

  // const [categoryState, setCategoryState] = useState<CommonDataModel>({
  //   columns: CategoryColumnDefinition,
  //   rows: arrayRows,
  // });

  const [subCategoryState, setSubCategoryState] = useState<CommonDataModel>({
    columns: SubCategoryColumnDefinition,
    rows: columnRow,
  });

  React.useEffect(() => {
    getAllSubCategoriesByCategoryId(id).then?.((subCategories) => {
      var data: any = [];
      for (let i = 0; i < subCategories?.subcategories?.length; i++) {
        const element = {
          categoryId: subCategories.subcategories[i].categoryId,
          id: subCategories.subcategories[i].subCategoryId,
          subCategoryName: subCategories.subcategories[i].subCategoryName,
          subCategoryImage: subCategories.subcategories[i].subCategoryImage,
          status: subCategories.subcategories[i].status,
        };
        data.push(element);
      }
      setSubCategoryState({
        columns: SubCategoryColumnDefinition,
        rows: data,
      });
      setSubCategoryState((prev) => ({
        ...prev,
        rows: data,
      }));
      setColumnRow(data);
    });
  }, [request, isClose]);

  const postSubCategoryState = (row: any) => {
    console.log("row", row);
    const formData = new FormData();
    const foundObject = subCategoryState.rows.find((obj) => obj.id === row.id);
    formData.append("subCategoryName", row.subCategoryName);
    formData.append(
      "status",
      foundObject.status === "" ? "Inactive" : foundObject.status
    );
    if (foundObject.subCategoryImage instanceof File) {
      formData.append("subCategoryImage", foundObject.subCategoryImage);
    }
    formData.append("categoryId", id);
    postSubCategory(formData)
      .then((response) => {
        // console.log(response, "responseresponse");
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
    // postCategories(foundObject);
  };
  const putSubCategoryState = (row: any) => {
    const formData = new FormData();
    const foundObject = subCategoryState.rows.find((obj) => obj.id === row.id);
    formData.append("subCategoryName", row.subCategoryName);
    formData.append(
      "status",
      foundObject.status === "" ? "Inactive" : foundObject.status
    );
    if (foundObject.subCategoryImage instanceof File) {
      formData.append("subCategoryImage", foundObject.subCategoryImage);
    }
    formData.append("subCategoryId", row.id);
    // postCategories(foundObject);
    putSubCategory(formData)
      .then((response) => {
        // console.log(response, "responseresponse");
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
  const deleteSubCategoryState = (subcategoriesId: any) => {
    deleteSubCategory(subcategoriesId, id).then((value) => {
      setRequest((prevRequest) => !prevRequest);
      setSnackbarOpen(true);
      setMessage("Delete Successfully ");
    });
  };

  const handleCategoryImageChange = (id, subCategoryImage) => {
    setSubCategoryState((prev) => ({
      ...prev,
      rows: prev.rows.map((r) =>
        r.id === id ? { ...r, subCategoryImage: subCategoryImage } : r
      ),
    }));
  };

  const handleVisibilityClick = (id: any) => {
    setSelectedVariantId(id);
    setVariantIdVisible(true);
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
          <DashboardCard title="Sub Categories">
            <>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>{/* Content goes here */}</div>

                {/* CloseIcon */}
                <CloseIcon onClick={onClose} style={{ cursor: "pointer" }} />
              </div>
              <FullFeaturedCrudGrid
                rowData={subCategoryState.rows}
                columnData={subCategoryState.columns}
                setColumnRow={setSubCategoryState}
                postApi={postSubCategoryState}
                // previewImg={preview}
                putApi={putSubCategoryState}
                deleteApi={deleteSubCategoryState}
                setIsClose={setIsClose}
                isClose={isClose}
                //   showVisibilityIcon={true}
                //   handleVisibilityClick={handleVisibilityClick}
              />
            </>
          </DashboardCard>
        </Grid>
        {/* <Grid item xs={12} md={12}>
          <DashboardCard title="Sub Categories">
            <DataGridView
              rowData={subCategoryState.rows}
              columnData={subCategoryState.columns}
            />
          </DashboardCard>
        </Grid> */}
      </Grid>
    </PageContainer>
  );
};

export default Subcategories;
