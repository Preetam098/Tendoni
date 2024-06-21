"use client";
import PageContainer from "../components/container/PageContainer";
import DashboardCard from "../components/shared/DashboardCard";
import FullFeaturedCrudGrid from "../components/dataGrid/newtemp";
import {
  deleteCountry,
  getAllCountries,
  postCountries,
  putCountry,
  putStatusChangeCountry,
} from "@/utils/apis/Countries";
import React, { useEffect, useState } from "react";
import { randomId } from "@mui/x-data-grid-generator";
import { GridColDef } from "@mui/x-data-grid";
import CommonDataModel from "@/utils/models/CommonDataModel";
import FullFeaturedCrudGridDemo from "../components/dataGrid/newtempDemo";
import {
  CountriesInformation,
  CountriesputInformation,
} from "@/utils/apis/Countries/type";
import Snackers from "@/utils/models/Snackers";
import { Switch } from "@mui/material";

const countrypage = () => {
  const countryColumnDefinition: GridColDef[] = [
    { field: "name", headerName: "Country Name", flex: 1, editable: true },
    // { field: "id", headerName: "id", flex: 1, editable: true },

    // {
    //   field: "email",
    //   headerName: "Email",
    //   align: "left",
    //   flex: 1,
    //   headerAlign: "left",
    //   editable: true,
    // },
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
                putStatusChangeCountry(params.row.id)
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
  const [allCountry, setAllCountry] = useState<CommonDataModel>({
    columns: countryColumnDefinition,
    rows: columnRow,
  });

  var handleSwitchChange = (event: any, row: any) => {
    const newStatus = event.target.checked ? "Active" || "ACTIVE" : "Inactive";

    setAllCountry((prev) => ({
      ...prev,
      rows: prev.rows.map((r) =>
        r.id === row.id ? { ...r, status: newStatus } : r
      ),
    }));
  };

  React.useEffect(() => {
    getAllCountries().then?.((country) => {
      var data: any = [];
      for (let i = 0; i < country?.length; i++) {
        const element = {
          name: country[i].categoryName,
          id: country[i].countryId,
          status: country[i].Status,
        };
        data.push(element);
      }
      setAllCountry({
        columns: countryColumnDefinition,
        rows: data,
      });
      setAllCountry((prev) => ({
        ...prev,
        rows: data,
      }));
      setColumnRow(data);
    });
  }, [request, isClose]);

  const postCountriesCon = (newData: CountriesInformation) => {
    const foundObject = allCountry.rows.find(
      (obj) => obj.id === newData.id
    );
    foundObject.countryName = newData.name;
    foundObject.status =
      foundObject.status == "" ? "Inactive" : foundObject.status;
    postCountries(foundObject)
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

  const putCountryCon = (newData: CountriesputInformation) => {
    const foundObject = allCountry.rows.find(
      (obj) => obj.id === newData.id
    );
    foundObject.name = newData.name;
    foundObject.status =
      foundObject.status == "" ? "Inactive" : foundObject.status;
    putCountry(foundObject)
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
  };

  const deleteCountryCon = (newData: string) => {
    deleteCountry(newData).then((value) => {
      setRequest((prevRequest) => !prevRequest);
      setSnackbarOpen(true);
      setMessage("Delete Successfully ");
    });
  };
  const closeSnacker = () => {
    setSnackbarOpen(false);
  };
  const handleVisibilityClick = () => {};
  return (
    <PageContainer title="Country" description="Country">
      <Snackers
        open={snackbarOpen}
        closeSnacker={closeSnacker}
        message={message}
      />
      <DashboardCard title="Country">
        <FullFeaturedCrudGrid
          rowData={allCountry.rows}
          columnData={allCountry.columns}
          setColumnRow={setAllCountry}
          postApi={postCountriesCon}
          putApi={putCountryCon}
          deleteApi={deleteCountryCon}
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

export default countrypage;
