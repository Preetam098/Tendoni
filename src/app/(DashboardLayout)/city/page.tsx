"use client";
import PageContainer from "../components/container/PageContainer";
import DashboardCard from "../components/shared/DashboardCard";
import FullFeaturedCrudGrid from "../components/dataGrid/newtempArea";
import {
  deleteCity,
  getAllCity,
  postCity,
  putCity,
  putStatusChangeCity,
} from "@/utils/apis/City";
import React, { useEffect, useState } from "react";
import { randomId } from "@mui/x-data-grid-generator";
import { GridColDef } from "@mui/x-data-grid";
import CommonDataModel from "@/utils/models/CommonDataModel";
import FullFeaturedCrudGridDemo from "../components/dataGrid/newtempDemo";
import { CityInformation, CityPutInformation } from "@/utils/apis/City/type";
import Snackers from "@/utils/models/Snackers";
import { Switch } from "@mui/material";
//
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Grid } from "@mui/material";
import { getAllCountries, getCountryById } from "@/utils/apis/Countries";
import toast, { Toaster } from "react-hot-toast";
import { Button, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const statepage = () => {
  const [openForm, setOpenForm] = React.useState<any>(false);
  const [formData, setFormData] = React.useState<any>({
    countryId: "",
    stateId: "",
    cityName: "",
  });
  const [allCountry, setAllCountry] = React.useState<any>();
  const [filteredStates, setFilteredStates] = React.useState<any>([]);

  const handleChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target as HTMLSelectElement;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  const CityColumnDefinition: GridColDef[] = [
    { field: "name", headerName: "City Name", flex: 1, editable: true },
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
                putStatusChangeCity(params.row.id, newStatus)
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
  const [allCity, setAllCity] = useState<CommonDataModel>({
    columns: CityColumnDefinition,
    rows: columnRow,
  });

  var handleSwitchChange = (event: any, row: any) => {
    const newStatus = event.target.checked ? "Active" || "ACTIVE" : "Inactive";
    setAllCity((prev) => ({
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
    getAllCity().then?.((city) => {
      var data: any = [];
      for (let i = 0; i < city?.length; i++) {
        const element = {
          id: city[i].cityId,
          name: city[i].cityName,
          status: city[i].Status,
        };
        data.push(element);
      }
      setAllCity({
        columns: CityColumnDefinition,
        rows: data,
      });
      setAllCity((prev) => ({
        ...prev,
        rows: data,
      }));
      setColumnRow(data);
    });
  }, [request, isClose]);

  React.useEffect(() => {
    if (formData.countryId) {
      getCountryById(formData.countryId).then?.((state) => {
        if (state?.data && Array.isArray(state.data) && state.data.length > 0) {
          setFilteredStates(state.data[0]?.states || []);
        } else {
          setFilteredStates([]);
        }
      });
    } else {
      setFilteredStates([]);
    }
  }, [formData.countryId]);

  const postCityCon = () => {
    if (!formData?.countryId || !formData?.stateId || !formData?.cityName) {
      const missingFields = [
        !formData?.countryId && "the country",
        !formData?.stateId && "the state",
        !formData?.cityName && "the city",
      ]
        .filter(Boolean)
        .join(" and ");
      toast.error(`Please fill ${missingFields}`);
    } else {
      postCity(formData)
        .then((response) => {
          setSnackbarOpen(true);
          setRequest((prevRequest) => !prevRequest);
          setMessage(response.message);
          setOpenForm(false);
          setFormData({
            countryId: "",
            stateId: "",
            cityName: "",
          });
        })
        .catch((error) => {
          setSnackbarOpen(true);
          setRequest((prevRequest) => !prevRequest);
          setMessage(error);
        });
    }
  };

  const putCityCon = (newData: CityPutInformation) => {
    const foundObject = allCity.rows.find((obj) => obj.id === newData.id);
    foundObject.name = newData.name;
    foundObject.status =
      foundObject.status == "" ? "Inactive" : foundObject.status;
    putCity(foundObject)
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

  const deleteCityCon = (newData: string) => {
    deleteCity(newData).then((value) => {
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
                      value={formData?.countryId}
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
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      States
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={formData?.stateId}
                      label="State"
                      name="stateId"
                      onChange={handleChange}
                    >
                      {filteredStates && filteredStates.length > 0 ? (
                        filteredStates.map((item, index) => {
                          return (
                            <MenuItem key={index} value={item.stateId}>
                              {item.stateName}
                            </MenuItem>
                          );
                        })
                      ) : (
                        <MenuItem disabled>No states available</MenuItem>
                      )}
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <TextField
                    id="outlined-basic"
                    label="City Name"
                    name="cityName"
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
                onClick={postCityCon}
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

      <PageContainer title="City" description="City">
        <Snackers
          open={snackbarOpen}
          closeSnacker={closeSnacker}
          message={message}
        />
        <DashboardCard title="City">
          <FullFeaturedCrudGrid
            rowData={allCity.rows}
            columnData={allCity.columns}
            setColumnRow={setAllCity}
            postApi={postCityCon}
            putApi={putCityCon}
            deleteApi={deleteCityCon}
            setIsClose={setIsClose}
            isClose={isClose}
            handleModalOpen={handleOpen}
            openForm={openForm}
            showVisibilityIcon={false}
            handleVisibilityClick={handleVisibilityClick}
            hideEditButton={false}
            hideDeleteButton={false}
          />
        </DashboardCard>
      </PageContainer>
      <Toaster />
    </>
  );
};

export default statepage;
