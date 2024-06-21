"use client";
import PageContainer from "../../components/container/PageContainer";
import DashboardCard from "../../components/shared/DashboardCard";
import FullFeaturedCrudGrid from "../../components/dataGrid/newtempPermissionUpdate";
import { getAllPermissions } from "@/utils/apis/Permission";
import React, { useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import CommonDataModel from "@/utils/models/CommonDataModel";


const updateRolepage = ({ params }) => {
  const PermissionColumnDefinition: GridColDef[] = [
    { field: "name", headerName: "Permissions", flex: 1, editable: true },
  ];
  const [request, setRequest] = useState<boolean>();
  const [isClose, setIsClose] = useState(false);

  const [columnRow, setColumnRow] = useState([]);
  const [allPermission, setAllPermission] = useState<CommonDataModel>({
    columns: PermissionColumnDefinition,
    rows: columnRow,
  });

  React.useEffect(() => {
    getAllPermissions().then?.((permission) => {
      var data: any = [];
      for (let i = 0; i < permission?.length; i++) {
        const element = {
          id: i,
          createrole: permission[i].create,
          name: permission[i].permissionName,
          readrole: permission[i].read,
          updaterole: permission[i].update,
          deleterole: permission[i].delete,
        };
        data.push(element);
      }
      //   setAllSalesMan(data);
      setAllPermission({
        columns: PermissionColumnDefinition,
        rows: data,
      });
      setAllPermission((prev) => ({
        ...prev,
        rows: data,
      }));
      setColumnRow(data);
    });
  }, [request, isClose]);

  const handleVisibilityClick = () => {};
  return (
    <PageContainer title="Edit Role" description="Update role">
      <DashboardCard title="Edit Role">
        <FullFeaturedCrudGrid
          userId={params.roleId}
          rowData={allPermission.rows}
          columnData={allPermission.columns}
          setColumnRow={setAllPermission}
          setIsClose={setIsClose}
          isClose={isClose}
          showVisibilityIcon={false}
          handleVisibilityClick={handleVisibilityClick}
          getRowId={(row) => row.id}
        />
        {/* <FullFeaturedCrudGridDemo /> */}
      </DashboardCard>
    </PageContainer>
  );
};

export default updateRolepage;
