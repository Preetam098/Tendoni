"use client";
import React, { useState } from "react";
import PageContainer from "../components/container/PageContainer";
import DashboardCard from "../components/shared/DashboardCard";
import FullFeaturedCrudGrid from "../components/dataGrid/newtempUser";
import {
  deleteUsers,
  getAllUsers,
  putStatusChangeUsers,
} from "@/utils/apis/Users";
import { GridColDef } from "@mui/x-data-grid";
import CommonDataModel from "@/utils/models/CommonDataModel";
import UserCreatePage from "./createuser/page";
import Snackers from "@/utils/models/Snackers";
import { Switch } from "@mui/material";

const Users = ({ data, onClose }) => {
  console.log("data", data);
  const UsersColumnDefinition: GridColDef[] = [
    { field: "firstName", headerName: "First Name", flex: 1, editable: true },
    // { field: "id", headerName: "id", flex: 1, editable: true },

    {
      field: "lastName",
      headerName: "Last Name",
      align: "left",
      flex: 1,
      headerAlign: "left",
      editable: true,
    },

    {
      field: "email",
      headerName: "Email Address",
      align: "left",
      flex: 1,
      headerAlign: "left",
      editable: true,
    },

    {
      field: "userImage",
      headerName: "Users Image",
      align: "left",
      flex: 1,
      headerAlign: "left",
      editable: true,
      renderCell: (params: any) => {
        if (params.id !== undefined) {
          return (
            <img
              src={params.row.userImage}
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

  const [isUsersIdVisible, setUsersIdVisible] = useState(false);
  const [selectedUsersId, setSelectedUsersId] = useState<any>("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [message, setMessage] = useState("");

  const [columnRow, setColumnRow] = useState([]);
  const [allusers, setUsers] = useState<CommonDataModel>({
    columns: UsersColumnDefinition,
    rows: columnRow,
  });

  React.useEffect(() => {
    getAllUsers().then?.((users) => {
      var data: any = [];
      for (let i = 0; i < users?.length; i++) {
        const element = {
          id: users[i].adminId,
          firstName: users[i].firstName,
          lastName: users[i].lastName,
          email: users[i].email,
          userImage: users[i].image,
        };
        data.push(element);
      }
      setUsers(data);
      setUsers({
        columns: UsersColumnDefinition,
        rows: data,
      });
      setUsers((prev) => ({
        ...prev,
        rows: data,
      }));
      setColumnRow(data);
    });
  }, [request, isClose, isUsersIdVisible]);

  const deleteUsersKey = (data: any) => {
    deleteUsers(data).then((value) => {
      setRequest((prevRequest) => !prevRequest);
      setSnackbarOpen(true);
      setMessage("Delete Successfully ");
    });
  };
  const handleVisibilityClick = (id: any) => {
    setSelectedUsersId(id);
    setUsersIdVisible(true);
  };

  const closeSnacker = () => {
    setSnackbarOpen(false);
  };
  const handleClose = () => {
    setUsersIdVisible(false);
  };
  return (
    <>
      <PageContainer title="Users" description="Users Details">
        <Snackers
          open={snackbarOpen}
          closeSnacker={closeSnacker}
          message={message}
        />
        {isUsersIdVisible ? (
          <UserCreatePage
            onClose={handleClose}
            isUserIdVisible={isUsersIdVisible}
            userIds={selectedUsersId}
          />
        ) : (
          <DashboardCard title="User">
            <FullFeaturedCrudGrid
              rowData={allusers.rows}
              columnData={allusers.columns}
              setColumnRow={setUsers}
              deleteApi={deleteUsersKey}
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

export default Users;

