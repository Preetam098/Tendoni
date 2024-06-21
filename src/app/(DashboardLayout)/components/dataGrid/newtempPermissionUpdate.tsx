// FullFeaturedCrudGrid.tsx

import React, { ChangeEvent, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Button, Grid, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import { getAllRole, updatePostRole } from "@/utils/apis/Role";
import apiBaseUrl from "@/utils/apis";
import axios from "axios";

interface CommonDataGridProps {
  rowData: any;
  columnData: any[];
  setColumnRow: (newModel: any) => void;
  postApi: (newData: any) => void;
  putApi: (editData: any) => void;
  deleteApi: (deleteData: any) => void;
  showVisibilityIcon: boolean;
  handleVisibilityClick: (id: any) => void;
  hideEditButton: boolean;
  hideDeleteButton: boolean;
  setIsClose: any;
  isClose: any;
  userId: any;
}

const FullFeaturedCrudGrid: React.FC<CommonDataGridProps> = ({
  rowData,
  columnData,
  postApi,
  userId,
}) => {
  const [permissions, setPermissions] = useState([
    { id: "create", name: "Create", value: false },
    { id: "read", name: "Read", value: false },
    { id: "update", name: "Update", value: false },
    { id: "delete", name: "Delete", value: false },
  ]);

  const [permissionsArray, setPermissionsArray] = useState([]);
  const [roleId, setRoleID] = useState("");
  const [RoleData, setRoleData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllRole();
      const currentUser = data.find((user) => user.roleId === userId);

      if (currentUser) {
        setPermissionsArray(currentUser.permissions);
        setRoleID(currentUser.roleId);
        setRoleData(currentUser.roleName);
      }
    };
    fetchData();
  }, [userId]);

  const EditToolbar = () => {
    const router = useRouter();
    const [roleName, setRoleName] = useState({
      roleName: RoleData ? RoleData : " ",
    });

    const updateChanges = async () => {
      try {
        const { data } = await axios.get(`${apiBaseUrl}/getAllRoles`);
        router.push("/role");
        const updateData = {
          roleId: roleId,
          Status: "",
          name: roleName,
          permission: permissionsArray,
        };
        const response = await updatePostRole(updateData);
        if (!response.error) {
          console.log("Update Role successful");
        } else {
          console.error("Error updating role:", response.message);
        }
      } catch (error) {
        console.error("Error during update:", error);
      }
    };

    const handleChange = (event) => {
      setRoleName(event.target.value);
    };

    console.log("here role name", roleName);
    return (
      <>
        <GridToolbarContainer style={{ display: "flex" }}>
          <Grid container justifyContent="space-between" spacing={2}>
            <Grid item style={{ width: "70%" }}>
              <TextField
                label="Role Name"
                name="roleName"
                style={{ width: "100%" }}
                variant="outlined"
                value={roleName?.roleName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item style={{ display: "flex", justifyContent: "flex-end" }}>
              <Grid>
                <Button
                  style={{
                    backgroundColor: "#DBAA00",
                    color: "white",
                    padding: "8px 10px",
                    width: "90%",
                    marginRight: "50px",
                  }}
                  onClick={updateChanges}
                >
                  Update Changes
                </Button>
              </Grid>
              <Grid>
                <Button
                  style={{
                    backgroundColor: "#DBAA00",
                    color: "white",
                    padding: "8px 10px",
                    width: "10%",
                  }}
                  onClick={() => router.push("/role")}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </GridToolbarContainer>
      </>
    );
  };

  const processRowUpdate = (newRow: any) => {
    if (newRow.isNew) {
      postApi(newRow);
    }
    return newRow;
  };

  const handlePermissionChange = (id, value, name) => {
    setPermissions((prevPermissions) =>
      prevPermissions.map((permission) =>
        permission.id === id ? { ...permission, value: value } : permission
      )
    );
    const permissionKey = id.concat(name);
    setPermissionsArray((prevArray) =>
      value
        ? [...prevArray, permissionKey]
        : prevArray.filter((item) => item !== permissionKey)
    );
  };

  const TableData = [
    ...(columnData || []),
    {
      field: "create",
      type: "checkbox",
      headerName: "Create",
      flex: 1,
      cellClassName: "create",
      renderCell: (params) => (
        <input
          type="checkbox"
          checked={permissionsArray.includes("create".concat(params.row.name))}
          onChange={(e) =>
            handlePermissionChange("create", e.target.checked, params.row.name)
          }
        />
      ),
    },
    {
      field: "read",
      type: "checkbox",
      headerName: "Read",
      flex: 1,
      cellClassName: "read",
      renderCell: (params) => (
        <input
          type="checkbox"
          checked={permissionsArray.includes("read".concat(params.row.name))}
          onChange={(e) =>
            handlePermissionChange("read", e.target.checked, params.row.name)
          }
        />
      ),
    },
    {
      field: "update",
      type: "checkbox",
      headerName: "Update",
      flex: 1,
      cellClassName: "update",
      renderCell: (params) => (
        <input
          type="checkbox"
          checked={permissionsArray.includes("update".concat(params.row.name))}
          onChange={(e) =>
            handlePermissionChange("update", e.target.checked, params.row.name)
          }
        />
      ),
    },
    {
      field: "delete",
      type: "checkbox",
      headerName: "Delete",
      flex: 1,
      cellClassName: "delete",
      renderCell: (params) => (
        <input
          type="checkbox"
          checked={permissionsArray.includes("delete".concat(params.row.name))}
          onChange={(e) =>
            handlePermissionChange("delete", e.target.checked, params.row.name)
          }
        />
      ),
    },
  ];

  return (
    <Box>
      <DataGrid
        rows={rowData}
        columns={TableData}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar,
        }}
      />
      {!rowData || (rowData.length === 0 && <p>No data available</p>)}
    </Box>
  );
};

export default FullFeaturedCrudGrid;
