"use client";
import React, { useState, useEffect } from "react";
import PageContainer from "../components/container/PageContainer";
import DashboardCard from "../components/shared/DashboardCard";
import { GridColDef } from "@mui/x-data-grid";
import CommonDataModel from "@/utils/models/CommonDataModel";
import { getAllCustomer, getAllWebsiteCustomer } from "@/utils/apis/Customer";
import FullFeaturedCrudGrid from "../components/dataGrid/newtemp";
import CustomerAddress from "./customerDetails/page";

const CustomerPage = () => {
  const CustomerColumnDefinition: GridColDef[] = [
    {
      field: "name",
      headerName: "Customer Name",
      flex: 1,
      editable: true,
    },
    // {
    //   field: "shopName",
    //   headerName: "Shop Name",
    //   align: "left",
    //   flex: 1,
    //   headerAlign: "left",
    //   editable: true,
    // },
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
    // {
    //   field: "status",
    //   headerName: "Status",
    //   align: "left",
    //   flex: 1,
    //   headerAlign: "left",
    //   editable: true,
    // },
  ];

  const [request, setRequest] = useState<boolean>(false);
  const [isCustomerUserVisible, setCustomerUserVisible] = useState(false);
  const [customerId, setCustomerId] = useState("");
  const [columnRow, setColumnRow] = useState([]);
  const [isClose, setIsClose] = useState(false);
  const [customer, setCustomers] = useState<CommonDataModel>({
    columns: CustomerColumnDefinition,
    rows: columnRow,
  });

  useEffect(() => {
    getAllWebsiteCustomer().then?.((customers) => {
      var data: any = [];
      for (let i = 0; i < customers?.length; i++) {
        const element = {
          id: customers[i].customerId,
          name: customers[i].name,
          email: customers[i].email,
          number: customers[i].number,
        };
        data.push(element);
      }
      setCustomers({
        columns: CustomerColumnDefinition,
        rows: data,
      });

      setColumnRow(data);
    });
  }, [request]);

  const handleVisibilityClick = (id) => {
    setCustomerId(id);
    setCustomerUserVisible(true);
  };

  const CurrentVariant = () => {};
  const deleteCurrentVariantKey = () => {};
  const putCurrentVariantKey = () => {};

  return (
    <>
      <PageContainer title="Customer " description="Customer">
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
          </DashboardCard>
        )}
      </PageContainer>
    </>
  );
};

export default CustomerPage;
