"use client";
import PageContainer from "../components/container/PageContainer";
import DashboardCard from "../components/shared/DashboardCard";
import FullFeaturedCrudGrid from "../components/dataGrid/newtempArea";
import toast, { Toaster } from "react-hot-toast";
import {
  deleteState,
  getAllStates,
  postState,
  putState,
  putStatusChangeState,
} from "@/utils/apis/State";
import AddIcon from "@mui/icons-material/Add";

import React, { useEffect, useState } from "react";
import { randomId } from "@mui/x-data-grid-generator";
import { GridColDef } from "@mui/x-data-grid";
import CommonDataModel from "@/utils/models/CommonDataModel";
import { StateInformation, StatePutInformation } from "@/utils/apis/State/type";
import Snackers from "@/utils/models/Snackers";
import { Button, Switch, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Grid } from "@mui/material";
import styled from "@emotion/styled";
import Paper from "@mui/material/Paper";
import { getAllCountries } from "@/utils/apis/Countries";

const statepage = () => {
  const [formData, setFormData] = React.useState<any>({
    countryId: "",
    stateName: "",
  });
  const [allCountry, setAllCountry] = React.useState<any>();

  const handleChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target as HTMLSelectElement;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  const countryColumnDefinition: GridColDef[] = [
    { field: "name", headerName: "State Name", flex: 1, editable: true },
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
                putStatusChangeState(params.row.id)
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
  const [openForm, setOpenForm] = React.useState<any>(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [columnRow, setColumnRow] = useState([]);
  const [allState, setAllState] = useState<CommonDataModel>({
    columns: countryColumnDefinition,
    rows: columnRow,
  });

  var handleSwitchChange = (event: any, row: any) => {
    const newStatus = event.target.checked ? "Active" || "ACTIVE" : "Inactive";

    setAllState((prev) => ({
      ...prev,
      rows: prev.rows.map((r) =>
        r.id === row.id ? { ...r, status: newStatus } : r
      ),
    }));
  };

  React.useEffect(() => {
    getAllCountries().then?.((country) => {
      setAllCountry(country);
    });

    getAllStates().then?.((state) => {
      var data: any = [];
      for (let i = 0; i < state?.length; i++) {
        const element = {
          id: state[i].stateId,
          name: state[i].stateName,
          status: state[i].Status,
        };
        data.push(element);
      }
      //   setAllSalesMan(data);
      setAllState({
        columns: countryColumnDefinition,
        rows: data,
      });
      setAllState((prev) => ({
        ...prev,
        rows: data,
      }));
      setColumnRow(data);
    });
  }, [request, isClose]);

  const postStateCon = () => {
    if (formData?.countryId == "") {
      const toastMessage = `Please fill ${
        formData?.countryId == "" ? "the country" : ""
      }${formData?.countryId == "" && formData?.stateName == "" ? " or " : ""}${
        formData?.stateName == "" ? "the state" : ""
      }`;
      toast.error(toastMessage);
    } else {
      postState(formData)
        .then((response) => {
          setSnackbarOpen(true);
          setRequest((prevRequest) => !prevRequest);
          setMessage(response.message);
          setOpenForm(false);
        })
        .catch((error) => {
          setSnackbarOpen(true);
          setRequest((prevRequest) => !prevRequest);
          setMessage(error);
          // console.error("Error posting product variant:", error);
        });
    }
  };

  const putStateCon = (newData: StatePutInformation) => {
    const foundObject = allState.rows.find((obj) => obj.id === newData.id);
    foundObject.name = newData.name;
    foundObject.status =
      foundObject.status == "" ? "Inactive" : foundObject.status;
    putState(foundObject)
      .then((response) => {
        // console.log(response, "responseresponse");
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

  const deleteStateCon = (newData: string) => {
    deleteState(newData).then((value) => {
      setRequest((prevRequest) => !prevRequest);
      setSnackbarOpen(true);
      setMessage("Delete Successfully ");
    });
  };
  const closeSnacker = () => {
    setSnackbarOpen(false);
  };
  const handleVisibilityClick = () => {};

  const handleOpen = () => {
    setOpenForm(!openForm);
  };

  const handleModalClose = () => {
    setOpenForm(false);
    const resetFormData = {};
    for (const key in formData) {
      resetFormData[key] = "";
    }
    setFormData(resetFormData);
  };
  return (
    <>
      <Box style={{ marginBottom: 12 }}>
        {openForm && (
          <DashboardCard title="Create State">
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Country
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={formData?.country}
                      label="country"
                      name="countryId"
                      onChange={handleChange}
                    >
                      {allCountry?.length ? (
                        allCountry.map((item, index) => (
                          <MenuItem key={index} value={item?.countryId}>
                            {item?.categoryName}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem disabled>No countries available</MenuItem>
                      )}
                    </Select>
                  </FormControl>
                </Box>
              </Grid>

              <Grid item xs={6}>
                <FormControl fullWidth>
                  <TextField
                    id="outlined-basic"
                    label="State Name"
                    name="stateName"
                    variant="outlined"
                    onChange={handleChange}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Box
              style={{
                marginTop: 12,
                textAlign: "right",
                display: "flex",
                alignItems: "center",
                justifyContent: "end",
                gap: 4,
              }}
            >
              <Button
                onClick={() => postStateCon(formData)}
                color="primary"
                startIcon={<AddIcon />}
              >
                Submit
              </Button>
              <Button onClick={handleModalClose} color="error">
                Discard
              </Button>
            </Box>
          </DashboardCard>
        )}
      </Box>

      <PageContainer title="State" description="State">
        <Snackers
          open={snackbarOpen}
          closeSnacker={closeSnacker}
          message={message}
        />
        <DashboardCard title="State">
          <FullFeaturedCrudGrid
            rowData={allState.rows}
            columnData={allState.columns}
            setColumnRow={setAllState}
            postApi={postStateCon}
            putApi={putStateCon}
            deleteApi={deleteStateCon}
            setIsClose={setIsClose}
            isClose={isClose}
            showVisibilityIcon={false}
            handleModalOpen={handleOpen}
            openForm={openForm}
            handleVisibilityClick={handleVisibilityClick}
            hideEditButton={false}
            hideDeleteButton={false}
          />

          {/* <FullFeaturedCrudGridDemo /> */}
        </DashboardCard>
      </PageContainer>
      <Toaster />
    </>
  );
};

export default statepage;
