import React, { useState } from "react";
import PageContainer from "../components/container/PageContainer";
import DashboardCard from "../components/shared/DashboardCard";
import CloseIcon from "@mui/icons-material/Close";
import { GridColDef } from "@mui/x-data-grid";
import CommonDataModel from "@/utils/models/CommonDataModel";
import { getAllCustomerAddress } from "@/utils/apis/Customer";
import FullFeaturedCrudGrid from "../components/dataGrid/newtemp";
import { Box } from "@mui/material";

const CustomerAddress = ({ id, onClose }: { id: any; onClose: () => void }) => {
  const CustomerAddressColumnDefinition: GridColDef[] = [
    {
      field: "name",
      headerName: "Customer Name",
      flex: 1,
      editable: true,
    },
    // { field: "id", headerName: "id", flex: 1, editable: true },
    {
      field: "shopName",
      headerName: "Shop Name",
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
      field: "number",
      headerName: "Number",
      align: "left",
      flex: 1,
      headerAlign: "left",
      editable: true,
    },
    {
      field: "status",
      headerName: "status",
      align: "left",
      flex: 1,
      headerAlign: "left",
      editable: true,
    },
  ];

  const [request, setRequest] = useState<boolean>();
  const [columnRow, setColumnRow] = useState([]);
  const [isClose, setIsClose] = useState(false);

  const [customersAddress, setCustomersAddress] = useState<CommonDataModel>({
    columns: CustomerAddressColumnDefinition,
    rows: columnRow,
  });

  React.useEffect(() => {
    getAllCustomerAddress(id).then?.((customersAddress) => {
      var data: any = [];
      for (let i = 0; i < customersAddress?.length; i++) {
        const element = {
          id: customersAddress[i].userId,
          name: customersAddress[i].name,
          status: customersAddress[i].status,
          email: customersAddress[i].email,
          shopName: customersAddress[i].shopName,
          number: customersAddress[i].number,
        };
        data.push(element);
      }
      setCustomersAddress({
        columns: CustomerAddressColumnDefinition,
        rows: data,
      });
      setCustomersAddress((prev) => ({
        ...prev,
        rows: data,
      }));
      setColumnRow(data);
    });
  }, [request]);
  const deleteCurrentVariantKey = () => {};
  const putCurrentVariantKey = () => {};

  const CurrentVariant = () => {};
  const handleVisibilityClick = () => {};

  return (
    <PageContainer title="Customer Address " description="Customer Address">
      {/* <Snackers
          open={snackbarOpen}
          closeSnacker={closeSnacker}
          message={message}
        /> */}
      <DashboardCard title="Customer Address ">
        <Box>
          <div style={{ display: "flex", justifyContent: "end" }}>
            <CloseIcon onClick={onClose} style={{ cursor: "pointer" }} />
          </div>
          <FullFeaturedCrudGrid
            rowData={customersAddress.rows}
            columnData={customersAddress.columns}
            setColumnRow={setCustomersAddress}
            hideEditButton={true}
            hideDeleteButton={true}
            postApi={CurrentVariant}
            putApi={putCurrentVariantKey}
            deleteApi={deleteCurrentVariantKey}
            handleVisibilityClick={handleVisibilityClick}
            showVisibilityIcon={false}
            setIsClose={setIsClose}
            isClose={isClose}
          />

          {/* <FullFeaturedCrudGridDemo /> */}
        </Box>
      </DashboardCard>
    </PageContainer>
  );
};

export default CustomerAddress;
