"use client";
import PageContainer from "../../components/container/PageContainer";
import DashboardCard from "../../components/shared/DashboardCard";
import FullFeaturedCrudGrid from "../../components/dataGrid/newtemSaleManager";
import {
  deleteSalesMan,
  getAllSalesMan,
  postSalesMan,
  putSalesMan,
} from "@/utils/apis/SalesMan";
import React, { useEffect, useState } from "react";
import { randomId } from "@mui/x-data-grid-generator";
import { GridColDef } from "@mui/x-data-grid";
import CommonDataModel from "@/utils/models/CommonDataModel";
import {
  deleteSalesManager,
  getAllSalesManager,
  postSalesManager,
  putSalesManager,
  putSubStatusChangeSalesManager,
} from "@/utils/apis/SalesManager";
import {
  SaleManagerPost,
  SaleManagerput,
} from "@/utils/apis/SalesManager/type";
import Snackers from "@/utils/models/Snackers";
import { Switch } from "@mui/material";

const SalesmenPage = () => {
  const salesManagerColumnDefinition: GridColDef[] = [
    { field: "firstname", headerName: "First Name", flex: 1, editable: true },
    // { field: "id", headerName: "id", flex: 1, editable: true },

    {
      field: "lastname",
      headerName: "Last Name",
      align: "left",
      flex: 1,
      headerAlign: "left",
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      align: "left",
      flex: 1,
      headerAlign: "left",
      editable: true,
    },
    {
      field: "status",
      headerName: "Status",
      align: "left",
      headerAlign: "left",
      editable: true,

      flex: 1,
      renderCell: (params: any) => {
        if (params.id !== undefined) {
          return (
            <Switch
              checked={
                params.row.status === "Active" || params.row.status === "ACTIVE"
              }
              onChange={(event) => {
                const newStatus = event.target.checked
                  ? "Active" || "ACTIVE"
                  : "Inactive";
                // Update the status via API call
                putSubStatusChangeSalesManager(params.row.id, newStatus)
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
        params.checked =
          params.formattedValue === "Active" ||
          params.formattedValue === "ACTIVE";
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
    //  {
    //   field: "password",
    //   headerName: "Password",
    //   align: "left",
    //   flex: 1,
    //   headerAlign: "left",
    //   editable: true,
    // },
    // {
    //   field: "action",
    //   headerName: "Action",
    //   align: "left",
    //   flex: 1,
    //   headerAlign: "left",
    //   editable: true,
    // },
  ];
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isClose, setIsClose] = useState(false);
  // console.log(isClose, "isCloseisClose");

  const [message, setMessage] = useState("");
  const [request, setRequest] = useState<boolean>();

  const [columnRow, setColumnRow] = useState([]);
  const [allSalesManager, setAllSalesManager] = useState<CommonDataModel>({
    columns: salesManagerColumnDefinition,
    rows: columnRow,
  });

  var handleSwitchChange = (event: any, row: any) => {
    const newStatus = event.target.checked ? "Active" || "ACTIVE" : "Inactive";

    setAllSalesManager((prev) => ({
      ...prev,
      rows: prev.rows.map((r) =>
        r.id === row.id ? { ...r, status: newStatus } : r
      ),
    }));
  };

  React.useEffect(() => {
    getAllSalesManager().then?.((salesManager) => {
      var data: any = [];
      for (let i = 0; i < salesManager?.length; i++) {
        const element = {
          id: salesManager[i].adminId,
          firstname: salesManager[i].firstName,
          lastname: salesManager[i].lastName,
          email: salesManager[i].email,
          status: salesManager[i].status,
        };
        data.push(element);
      }
      //   setAllSalesManager(data);
      setAllSalesManager({
        columns: salesManagerColumnDefinition,
        rows: data,
      });
      setAllSalesManager((prev) => ({
        ...prev,
        rows: data,
      }));
      setColumnRow(data);
    });
  }, [request, isClose]);

  const postsalesmanager = (newData: any) => {
    const formData = new FormData();
    const foundObject = allSalesManager.rows.find(
      (obj) => obj.id === newData.id
    );
    formData.append("firstName", newData.firstName);
    formData.append("email", newData.email);
    formData.append(
      "status",
      foundObject.status === "" ? "Inactive" : foundObject.status
    );
    formData.append("adminId", newData.adminId);
    postSalesManager(formData)
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
  const putsalesmanager = (newData: any) => {
    console.log("newdata", newData);
    const formData = new FormData();
    const foundObject = allSalesManager.rows.find(
      (obj) => obj.id === newData.id
    );

    // Ensure newData.firstname and newData.lastname are strings
    if (Array.isArray(newData.firstname)) {
      formData.append("firstName", newData.firstname.join(", "));
    } else {
      formData.append("firstName", newData.firstname);
    }

    if (Array.isArray(newData.lastname)) {
      formData.append("lastName", newData.lastname.join(", "));
    } else {
      formData.append("lastName", newData.lastname);
    }

    formData.append("email", newData.email);
    formData.append(
      "status",
      foundObject.status === "" ? "Inactive" : foundObject.status
    );
    formData.append("adminId", newData.id);

    putSalesManager(formData)
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

  const deletesalesmanager = (id: string) => {
    deleteSalesManager(id).then((value) => {
      setRequest((prevRequest) => !prevRequest);
      setSnackbarOpen(true);
      setMessage("Delete Successfully ");
    });
  };
  const closeSnacker = () => {
    setSnackbarOpen(false);
  };
  const handleVisibilityClick = () => {};

  return (
    <PageContainer title="Sales Manager" description="Sales Manager">
      <Snackers
        open={snackbarOpen}
        closeSnacker={closeSnacker}
        message={message}
      />
      <DashboardCard title="Sales Manager">
        <FullFeaturedCrudGrid
          rowData={allSalesManager.rows}
          columnData={allSalesManager.columns}
          setColumnRow={setAllSalesManager}
          postApi={postsalesmanager}
          putApi={putsalesmanager}
          deleteApi={deletesalesmanager}
          setIsClose={setIsClose}
          isClose={isClose}
          showVisibilityIcon={false}
          handleVisibilityClick={handleVisibilityClick}
          hideEditButton={false}
          hideDeleteButton={false}
        />

        {/* <FullFeaturedCrudGridDemo /> */}
      </DashboardCard>
    </PageContainer>
  );
};

export default SalesmenPage;
