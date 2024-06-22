"use client";
import React, { useState } from "react";
import PageContainer from "../../components/container/PageContainer";
import DashboardCard from "../../components/shared/DashboardCard";
import CloseIcon from "@mui/icons-material/Close";
import { GridColDef } from "@mui/x-data-grid";
import CommonDataModel from "@/utils/models/CommonDataModel";
import {
  getAllCustomerAddress,
  getEcommerceCustomerAddress,
} from "@/utils/apis/Customer";
import FullFeaturedCrudGrid from "../../components/dataGrid/newtemp";
import { Box } from "@mui/material";

const CustomerDetails = ({ id, onClose }) => {
  console.log(id, "iiidd");
  const CustomerAddressColumnDefinition: GridColDef[] = [
    {
      field: "name",
      headerName: "Customer Name",
      flex: 1,
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
    { field: "addressLine1", headerName: "Address Line 1", flex: 1 },
    { field: "addressLine2", headerName: "Address Line 2", flex: 1 },
    { field: "zipcode", headerName: "Zipcode", flex: 1 },
    { field: "state", headerName: "State", flex: 1 },
    { field: "city", headerName: "City", flex: 1 },
    { field: "country", headerName: "Country", flex: 1 },
    { field: "landmark", headerName: "Landmark", flex: 1 },
  ];

  const [request, setRequest] = useState<boolean>();
  const [columnRow, setColumnRow] = useState([]);
  const [isClose, setIsClose] = useState(false);
  const [customersAddress, setCustomersAddress] = useState<CommonDataModel>({
    columns: CustomerAddressColumnDefinition,
    rows: columnRow,
  });

  React.useEffect(() => {
    getEcommerceCustomerAddress(id).then?.((customersAddress) => {
      if (!customersAddress) {
        setCustomersAddress(null);
        setColumnRow(null);
        return;
      }
      var data: any = [];
      for (let i = 0; i < customersAddress?.length; i++) {
        const element = {
          id: customersAddress[i].addressId,
          name: customersAddress[i].name,
          number: customersAddress[i].number,
          addressLine1: customersAddress[i].addressLine1,
          addressLine2: customersAddress[i].addressLine2,
          city: customersAddress[i].city,
          country: customersAddress[i].country,
          landmark: customersAddress[i].landmark,
          state: customersAddress[i].state,
          zipcode: customersAddress[i].zipcode
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


  console.log(customersAddress , 'address')
  return (
    <PageContainer title="Customer Address " description="Customer Address">
     
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

          
        </Box>
      </DashboardCard>
    </PageContainer>
  );
};

export default CustomerDetails;
