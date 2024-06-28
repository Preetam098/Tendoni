"use client";
import PageContainer from "../components/container/PageContainer";
import DashboardCard from "../components/shared/DashboardCard";
import FullFeaturedCrudGrid from "../components/dataGrid/newtempUser";
import {
  deleteUsers,
  getAllUsers,
  postusers,
  putUsers,
  putStatusChangeUsers,
} from "@/utils/apis/Users";
import React, { useEffect, useState } from "react";
import { randomId } from "@mui/x-data-grid-generator";
import { GridColDef } from "@mui/x-data-grid";
import CommonDataModel from "@/utils/models/CommonDataModel";
import { usersInformation, usersputInformation } from "@/utils/apis/Users/type";
import Snackers from "@/utils/models/Snackers";
import { Switch } from "@mui/material";
import UsersDetails from "./usersDetails/page";

const UsersPage = () => {
  const UsersColumnDefinition: GridColDef[] = [
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
      field: "Mobile",
      headerName: "Mobile No.",
      align: "left",
      flex: 1,
      headerAlign: "left",
      editable: true,
    },
    {
      field: "Department",
      headerName: "Department",
      align: "left",
      flex: 1,
      headerAlign: "left",
      editable: true,
    },
    {
      field: "Address",
      headerName: "Address",
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
                putStatusChangeUsers(params.row.id, newStatus)
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
  const [allUsers, setAllUsers] = useState<CommonDataModel>({
    columns: UsersColumnDefinition,
    rows: columnRow,
  });
  const [userData, setUserData] = useState("");
  const [isUser, setIsUser] = useState(false);

  var handleSwitchChange = (event: any, row: any) => {
    const newStatus = event.target.checked ? "Active" || "ACTIVE" : "Inactive";

    setAllUsers((prev) => ({
      ...prev,
      rows: prev.rows.map((r) =>
        r.id === row.id ? { ...r, status: newStatus } : r
      ),
    }));
  };

  React.useEffect(() => {
    getAllUsers().then?.((users) => {
      var data: any = [];
      for (let i = 0; i < users?.length; i++) {
        const element = {
          id: users[i].adminId,
          email: users[i].email,
          status: users[i].status,
          firstname: users[i].firstName,
          lastname: users[i].lastName,
          Mobile: users[i].mobile,
          Department: users[i].department,
          Address: users[i].address,
        };
        data.push(element);
      }
      //   setAllSalesMan(data);
      setAllUsers({
        columns: UsersColumnDefinition,
        rows: data,
      });
      setAllUsers((prev) => ({
        ...prev,
        rows: data,
      }));
      setColumnRow(data);
    });
  }, [request, isClose]);

  const postusersUs = (newData: usersInformation) => {
    const foundObject = allUsers.rows.find((obj) => obj.id === newData.id);
    foundObject.name = newData.name;
    foundObject.email = newData.Email;
    foundObject.status =
      foundObject.status == "" ? "Inactive" : foundObject.status;

    postusers(foundObject)
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
  const putUsersUs = (editData: {
    newData: usersputInformation;
    userId: string;
  }) => {
    const { newData, userId } = editData;
    const foundObject = allUsers.rows.find((obj) => obj.id === newData.id);
    if (foundObject) {
      foundObject.name = newData.name;
      foundObject.email = newData.Email;
      foundObject.status =
        foundObject.status === "" ? "Inactive" : foundObject.status;

      putUsers(foundObject, userId)
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
    } else {
      console.error("User not found");
    }
  };

  const deleteusers = (newData: string) => {
    deleteUsers(newData).then((value) => {
      setRequest((prevRequest) => !prevRequest);
      setSnackbarOpen(true);
      setMessage("Delete Successfully ");
    });
  };
  const closeSnacker = () => {
    setSnackbarOpen(false);
  };

  const handleVisibilityClick = (id, data) => {
    console.log("daata", data);
    setUserData(data);
    setIsUser(true);
  };

  return (
    <>
      {isUser ? (
        <UsersDetails
          data={userData}
          onClose={() => setIsUser(false)}
        />
      ) : (
        <PageContainer title="Users" description="Users">
          <Snackers
            open={snackbarOpen}
            closeSnacker={closeSnacker}
            message={message}
          />
          <DashboardCard title="Users">
            <FullFeaturedCrudGrid
              rowData={allUsers.rows}
              columnData={allUsers.columns}
              setColumnRow={setAllUsers}
              postApi={postusersUs}
              putApi={putUsersUs}
              deleteApi={deleteusers}
              setIsClose={setIsClose}
              isClose={isClose}
              showVisibilityIcon={true}
              handleVisibilityClick={handleVisibilityClick}
              hideEditButton={false}
              hideDeleteButton={false}
            />

            {/* <FullFeaturedCrudGridDemo /> */}
          </DashboardCard>
        </PageContainer>
      )}
    </>
  );
};

export default UsersPage;

