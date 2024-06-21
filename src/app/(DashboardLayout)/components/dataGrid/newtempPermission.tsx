// FullFeaturedCrudGrid.tsx

import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Button, Grid, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { RoleInformation } from "@/utils/apis/Role/type";
import { DataGrid, GridColDef, GridToolbarContainer } from "@mui/x-data-grid";
import { postRole } from "@/utils/apis/Role";
import apiBaseUrl from "@/utils/apis";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import Snackers from "@/utils/models/Snackers";

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
}

const FullFeaturedCrudGrid: React.FC<CommonDataGridProps> = ({
  rowData,
  columnData,
  postApi,
}) => {
  const [permissions, setPermissions] = useState([
    { id: "create", name: "Create", value: false },
    { id: "read", name: "Read", value: false },
    { id: "update", name: "Update", value: false },
    { id: "delete", name: "Delete", value: false },
  ]);

  const [permissionsArray, setPermissionsArray] = useState([]);

  function EditToolbar() {
    const router = useRouter();

    const [roleName, setRoleName] = useState("");

    const handleSave = async () => {
      try {
        if (roleName.trim() === "") {
          alert("Please enter a role name");
          return;
        }
        if (permissionsArray.length === 0) {
          alert("Please allow at least one permission");
          return;
        }
        const { data } = await axios.get(`${apiBaseUrl}/getAllRoles`);
        router.push("/role");
        const { roleId, status } = data;
        console.log("This is roleName", roleName);
        const newData = {
          roleId: "",
          Status: "",
          name: roleName,
          permission: permissionsArray,
        };
        const response = await postRole(newData);
        if (response.error === false) {
          console.log("Role saved successfully");
        } else {
          console.error("Error saving role:", response.message);
        }
      } catch (error) {
        console.error("Error during save:", error);
      }
    };

    return (
      <GridToolbarContainer style={{ display: "flex" }}>
        <Grid container justifyContent="space-between" spacing={2}>
          <Grid item style={{ width: "80%" }}>
            <TextField
              label="Enter Role"
              variant="outlined"
              size="small"
              style={{ width: "100%" }}
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
            />
          </Grid>
          <Grid
            item
            style={{ display: "flex", width: "20%" }}
            justifyContent="flex-end"
          >
            <Grid>
              <Button
                style={{
                  backgroundColor: "#DBAA00",
                  color: "white",
                  padding: "8px 10px",
                  width: "40%",
                  marginRight: "6px",
                }}
                onClick={handleSave}
              >
                Save
              </Button>
            </Grid>
            <Grid>
              <Button
                style={{
                  backgroundColor: "#DBAA00",
                  color: "white",
                  padding: "8px 10px",
                  width: "40%",
                }}
                onClick={() => router.push("/role")}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </GridToolbarContainer>
    );
  }

  const processRowUpdate = (newRow: any) => {
    const updatedRow = { ...newRow };
    var copyrows = [...rowData, updatedRow];
    if (newRow.isNew == true) {
      postApi(updatedRow);
    }
    return updatedRow;
  };

  const columns: GridColDef[] = columnData;

  const handlePermissionChange = (id, value, name) => {
    setPermissions((prevPermissions) =>
      prevPermissions.map((permission) =>
        permission.id === id ? { ...permission, value: value } : permission
      )
    );
    if (value === true) {
      setPermissionsArray([...permissionsArray, id.concat(name)]);
    } else {
      let newArray = permissionsArray.filter(
        (item) => item !== id.concat(name)
      );
      setPermissionsArray(newArray);
    }
  };

  const TableData = [
    // ...columns,
    ...(columns || []),
    {
      field: "create",
      type: "checkbox",
      headerName: "Create",
      flex: 1,
      cellClassName: "create",
      renderCell: (params) => (
        // <div>{console.log(params.row.name)}</div>
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
