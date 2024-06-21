"use client";
import React, { useState } from "react";
import PageContainer from "../../components/container/PageContainer";
import DashboardCard from "../../components/shared/DashboardCard";
import { GridColDef } from "@mui/x-data-grid";
import CommonDataModel from "@/utils/models/CommonDataModel";
import { getAllCustomer } from "@/utils/apis/Customer";
import FullFeaturedCrudGrid from "../../components/dataGrid/newtemp";
import CustomerAddress from "../customerAddress";

const CustomerDetails = () => {
  const CustomerColumnDefinition: GridColDef[] = [
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
  const [isCustomerUserVisible, setCustomerUserVisible] = useState(false);
  const [customerId, setCustomerId] = useState(null);
  const [columnRow, setColumnRow] = useState([]);
  const [isClose, setIsClose] = useState(false);

  const [customer, setCustomers] = useState<CommonDataModel>({
    columns: CustomerColumnDefinition,
    rows: columnRow,
  });

  React.useEffect(() => {
    getAllCustomer().then?.((customers) => {
      var data: any = [];
      for (let i = 0; i < customers?.length; i++) {
        const element = {
          id: customers[i].userId,
          name: customers[i].name,
          status: customers[i].status,
          email: customers[i].email,
          shopName: customers[i].shopName,
          number: customers[i].number,
        };
        data.push(element);
      }
      setCustomers({
        columns: CustomerColumnDefinition,
        rows: data,
      });
      setCustomers((prev) => ({
        ...prev,
        rows: data,
      }));
      setColumnRow(data);
    });
  }, [request]);

  const handleVisibilityClick = (id: any) => {
    setCustomerId(id);
    setCustomerUserVisible(true);
  };
  const CurrentVariant = () => {};
  const deleteCurrentVariantKey = () => {};
  const putCurrentVariantKey = () => {};
  return (
    <>
      <PageContainer title="Customer " description="Customer">
        {/* <Snackers
          open={snackbarOpen}
          closeSnacker={closeSnacker}
          message={message}
        /> */}
        {isCustomerUserVisible ? (
          <CustomerAddress
            id={customerId}
            onClose={() => setCustomerUserVisible(false)}
          />
        ) : (
          <DashboardCard title="Customer">
            <FullFeaturedCrudGrid
              rowData={customer.rows}
              columnData={customer.columns}
              setColumnRow={setCustomers}
              hideEditButton={true}
              hideDeleteButton={true}
              postApi={CurrentVariant}
              putApi={putCurrentVariantKey}
              deleteApi={deleteCurrentVariantKey}
              showVisibilityIcon={true}
              handleVisibilityClick={handleVisibilityClick}
              setIsClose={setIsClose}
              isClose={isClose}
            />

            {/* <FullFeaturedCrudGridDemo /> */}
          </DashboardCard>
        )}
      </PageContainer>
    </>
  );
};

export default CustomerDetails;
