"use client";
import PageContainer from "../components/container/PageContainer";
import DashboardCard from "../components/shared/DashboardCard";
import FullFeaturedCrudGrid from "../components/dataGrid/newtempmodel";
import {
  deleteRole,
  getAllRole,
  postRole,
  putRole,
  putStatusChangeRole,
} from "@/utils/apis/Role";
import React, { useEffect, useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import CommonDataModel from "@/utils/models/CommonDataModel";
import { RoleInformation, RolePutInformation } from "@/utils/apis/Role/type";
import Snackers from "@/utils/models/Snackers";
import { Switch } from "@mui/material";

const rolepage = () => {
  const RoleColumnDefinition: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1, editable: true },

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
                putStatusChangeRole(params.row.id)
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
  const [allRole, setAllRole] = useState<CommonDataModel>({
    columns: RoleColumnDefinition,
    rows: columnRow,
  });

  var handleSwitchChange = (event: any, row: any) => {
    const newStatus = event.target.checked ? "Active" || "ACTIVE" : "Inactive";

    setAllRole((prev) => ({
      ...prev,
      rows: prev.rows.map((r) =>
        r.id === row.id ? { ...r, status: newStatus } : r
      ),
    }));
  };

  React.useEffect(() => {
    getAllRole().then?.((role) => {
      var data: any = [];
      for (let i = 0; i < role?.length; i++) {
        const element = {
          id: role[i].roleId,
          name: role[i].roleName,
          status: role[i].Status,
        };
        data.push(element);
      }
      //   setAllSalesMan(data);
      setAllRole({
        columns: RoleColumnDefinition,
        rows: data,
      });
      setAllRole((prev) => ({
        ...prev,
        rows: data,
      }));
      setColumnRow(data);
    });
  }, [request, isClose]);

  const postRoleCon = (newData: RoleInformation) => {
    const foundObject = allRole.rows.find((obj) => obj.id === newData.id);
    foundObject.name = newData.name;
    foundObject.status =
      foundObject.status == "" ? "Inactive" : foundObject.status;

    postRole(foundObject)
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
  const putRoleCon = (newData: RolePutInformation) => {
    const foundObject = allRole.rows.find((obj) => obj.id === newData.id);
    foundObject.name = newData.name;
    foundObject.status =
      foundObject.status == "" ? "Inactive" : foundObject.status;
    putRole(foundObject)
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
  const deleteRoleCon = (newData: string) => {
    deleteRole(newData).then((value) => {
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
    <PageContainer title="Role" description="Role">
      <Snackers
        open={snackbarOpen}
        closeSnacker={closeSnacker}
        message={message}
      />
      <DashboardCard title="Role">
        <FullFeaturedCrudGrid
          rowData={allRole.rows}
          columnData={allRole.columns}
          setColumnRow={setAllRole}
          postApi={postRoleCon}
          putApi={putRoleCon}
          deleteApi={deleteRoleCon}
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

export default rolepage;
