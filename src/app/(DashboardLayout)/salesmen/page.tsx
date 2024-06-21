"use client";
import PageContainer from "../components/container/PageContainer";
import DashboardCard from "../components/shared/DashboardCard";
import FullFeaturedCrudGrid from "../components/dataGrid/newtempSalesMan";
import {
  deleteSalesMan,
  getAllSalesMan,
  postSalesMan,
  putSalesMan,
  putSubStatusChangeSalesMan,
} from "@/utils/apis/SalesMan";
import React, { useEffect, useState } from "react";
import { randomId } from "@mui/x-data-grid-generator";
import { GridColDef } from "@mui/x-data-grid";
import CommonDataModel from "@/utils/models/CommonDataModel";
import FullFeaturedCrudGridDemo from "../components/dataGrid/newtempDemo";
import {
  saleManInformation,
  saleManputInformation,
} from "@/utils/apis/SalesMan/type";
import Snackers from "@/utils/models/Snackers";
import { Switch } from "@mui/material";

const SalesmenPage = () => {
  const salesManColumnDefinition: GridColDef[] = [
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
                putSubStatusChangeSalesMan(params.row.id, newStatus)
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
  ];
  const [request, setRequest] = useState<boolean>();
  const [isClose, setIsClose] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [columnRow, setColumnRow] = useState([]);
  const [allSalesMan, setAllSalesMan] = useState<CommonDataModel>({
    columns: salesManColumnDefinition,
    rows: columnRow,
  });

  var handleSwitchChange = (event: any, row: any) => {
    const newStatus = event.target.checked ? "Active" || "ACTIVE" : "Inactive";

    setAllSalesMan((prev) => ({
      ...prev,
      rows: prev.rows.map((r) =>
        r.id === row.id ? { ...r, status: newStatus } : r
      ),
    }));
  };

  React.useEffect(() => {
    getAllSalesMan().then?.((salesMan) => {
      var data: any = [];
      for (let i = 0; i < salesMan?.length; i++) {
        const element = {
          id: salesMan[i].adminId,
          firstname: salesMan[i].firstName,
          lastname: salesMan[i].lastName,
          email: salesMan[i].email,
          status: salesMan[i].status,
        };
        data.push(element);
      }
      //   setAllSalesMan(data);
      setAllSalesMan({
        columns: salesManColumnDefinition,
        rows: data,
      });
      setAllSalesMan((prev) => ({
        ...prev,
        rows: data,
      }));
      setColumnRow(data);
    });
  }, [request, isClose]);

  const postsalesman = (newData: saleManInformation) => {
    const foundObject = allSalesMan.rows.find((obj) => obj.id === newData.id);
    foundObject.name = newData.name;
    foundObject.email = newData.email;
    foundObject.status =
      foundObject.status == "" ? "Inactive" : foundObject.status;

    postSalesMan(foundObject)
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
  const putsalesman = (newData: any) => {
    console.log("newdata", newData);
    const formData = new FormData();
    const foundObject = allSalesMan.rows.find((obj) => obj.id === newData.id);
    formData.append("firstName", newData.firstname);
    formData.append("lastName", newData.lastname);
    formData.append("email", newData.email);
    formData.append(
      "status",
      foundObject.status === "" ? "Inactive" : foundObject.status
    );
    formData.append("adminId", newData.id);
    putSalesMan(formData)
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
  const deletesalesman = (newData: string) => {
    deleteSalesMan(newData).then((value) => {
      setRequest((prevRequest) => !prevRequest);
      setSnackbarOpen(true);
      setMessage("Delete Successfully ");
    });
  };
  const closeSnacker = () => {
    setSnackbarOpen(false);
  };
  const handleVisibilityClick = () => {};
  // console.log(allSalesMan, "allSalesMan");
  return (
    <PageContainer title="Salesmen" description="Salesmen">
      <Snackers
        open={snackbarOpen}
        closeSnacker={closeSnacker}
        message={message}
      />
      <DashboardCard title="Salesmen">
        <FullFeaturedCrudGrid
          rowData={allSalesMan.rows}
          columnData={allSalesMan.columns}
          setColumnRow={setAllSalesMan}
          postApi={postsalesman}
          putApi={putsalesman}
          deleteApi={deletesalesman}
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
