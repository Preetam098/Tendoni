import React from 'react'

const CreateCountryPage = () => {
  return (
    <div>CreateCountryPage</div>
  )
}

export default CreateCountryPage

// "use client"
// import PageContainer from "../components/container/PageContainer";
// import DashboardCard from "../components/shared/DashboardCard";
// import FullFeatazuredCrudGrid from "../components/dataGrid/newtempArea";
// import {
//   deleteCountry,
//   getAllCountries,
//   postCountries,
//   putCountry,
//   putStatusChangeCountry,
// } from "@/utils/apis/Countries";
// import React, { useEffect, useState } from "react";
// import { randomId } from "@mui/x-data-grid-generator";
// import { GridColDef } from "@mui/x-data-grid";
// import CommonDataModel from "@/utils/models/CommonDataModel";
// import FullFeaturedCrudGridDemo from "../components/dataGrid/newtempDemo";
// import {
//   CountriesInformation,
//   CountriesputInformation,
// } from "@/utils/apis/Countries/type";
// import Snackers from "@/utils/models/Snackers";
// import { Switch } from "@mui/material";
// //

// import Box from "@mui/material/Box";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select, { SelectChangeEvent } from "@mui/material/Select";
// import { Grid } from "@mui/material";
// import toast, { Toaster } from "react-hot-toast";
// import { Button, TextField } from "@mui/material";
// import AddIcon from "@mui/icons-material/Add";

// const countrypage = () => {
//   const [formData, setFormData] = React.useState<any>({
//     countryId: "",
//     countryName: "",
//   });
//   const [openForm, setOpenForm] = React.useState<any>(false);
//   const [AllCountries, setAllCountries] = React.useState<any>(false);

//   const handleChange = (event: SelectChangeEvent) => {
//     const { value } = event.target;
//     const selectedCountry = AllCountries.find(
//       (item) => item.countryId === value
//     );
//     setFormData({
//       ...formData,
//       countryId: value,
//       countryName: selectedCountry?.categoryName || "",
//     });
//   };

//   console.log(formData, "formdata");

//   const countryColumnDefinition: GridColDef[] = [
//     { field: "name", headerName: "Country Name", flex: 1, editable: true },
//     // { field: "id", headerName: "id", flex: 1, editable: true },

//     // {
//     //   field: "email",
//     //   headerName: "Email",
//     //   align: "left",
//     //   flex: 1,
//     //   headerAlign: "left",
//     //   editable: true,
//     // },
//     {
//       field: "status",
//       headerName: "Status",
//       align: "left",
//       headerAlign: "left",
//       editable: true,

//       flex: 1,
//       renderCell: (params: any) => {
//         if (params.id !== undefined) {
//           return (
//             <Switch
//               checked={
//                 params.row.status === "Active" || params.row.status === "ACTIVE"
//               }
//               onChange={(event) => {
//                 const newStatus = event.target.checked
//                   ? "Active" || "ACTIVE"
//                   : "Inactive";
//                 // Update the status via API call
//                 putStatusChangeCountry(params.row.id)
//                   .then((response) => {
//                     setSnackbarOpen(true);
//                     setRequest(!request);
//                     setMessage(response.message);
//                   })
//                   .catch((error) => {
//                     setSnackbarOpen(true);
//                     setRequest(!request);
//                     setMessage(error);
//                   });
//               }}
//               color="primary"
//               inputProps={{ "aria-label": "primary checkbox" }}
//             />
//           );
//         } else {
//           return null;
//         }
//       },
//       renderEditCell: (params: any) => {
//         params.checked =
//           params.formattedValue === "Active" ||
//           params.formattedValue === "ACTIVE";
//         return (
//           <Switch
//             checked={params.checked}
//             onChange={(event) => {
//               handleSwitchChange(event, params.row);
//             }}
//             color="primary"
//             inputProps={{ "aria-label": "primary checkbox" }}
//           />
//         );
//       },
//     },
//   ];
//   const [request, setRequest] = useState<boolean>();
//   const [isClose, setIsClose] = useState(false);

//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [message, setMessage] = useState("");
//   const [columnRow, setColumnRow] = useState([]);
//   const [allCountry, setAllCountry] = useState<CommonDataModel>({
//     columns: countryColumnDefinition,
//     rows: columnRow,
//   });

//   var handleSwitchChange = (event: any, row: any) => {
//     const newStatus = event.target.checked ? "Active" || "ACTIVE" : "Inactive";
//     setAllCountry((prev) => ({
//       ...prev,
//       rows: prev.rows.map((r) =>
//         r.id === row.id ? { ...r, status: newStatus } : r
//       ),
//     }));
//   };

//   React.useEffect(() => {
//     getAllCountries().then?.((country) => {
//       setAllCountries(country);
//       var data: any = [];
//       for (let i = 0; i < country?.length; i++) {
//         const element = {
//           name: country[i].categoryName,
//           id: country[i].countryId,
//           status: country[i].Status,
//         };
//         data.push(element);
//       }
//       setAllCountry({
//         columns: countryColumnDefinition,
//         rows: data,
//       });
//       setAllCountry((prev) => ({
//         ...prev,
//         rows: data,
//       }));
//       setColumnRow(data);
//     });
//   }, [request, isClose]);

//   const postCountriesCon = () => {
//     if (formData?.countryId == "") {
//       const toastMessage = `Please fill ${
//         formData?.countryId == "" ? "the country" : " "
//       }`;
//       toast.error(toastMessage);
//     } else {
//       postCountries(formData)
//         .then((response) => {
//           setSnackbarOpen(true);
//           setRequest((prevRequest) => !prevRequest);
//           setMessage(response.message);
//           setOpenForm(false);
//         })
//         .catch((error) => {
//           setSnackbarOpen(true);
//           setRequest((prevRequest) => !prevRequest);
//           setMessage(error);
//           // console.error("Error posting product variant:", error);
//         });
//     }
//   };

//   const putCountryCon = (newData: CountriesputInformation) => {
//     const foundObject = allCountry.rows.find((obj) => obj.id === newData.id);
//     foundObject.name = newData.name;
//     foundObject.status =
//       foundObject.status == "" ? "Inactive" : foundObject.status;
//     putCountry(foundObject)
//       .then((response) => {
//         setSnackbarOpen(true);
//         setRequest((prevRequest) => !prevRequest);
//         setMessage(response.message);
//       })
//       .catch((error) => {
//         setSnackbarOpen(true);
//         setRequest((prevRequest) => !prevRequest);
//         setMessage(error);
//       });
//   };

//   const deleteCountryCon = (newData: string) => {
//     deleteCountry(newData).then((value) => {
//       setRequest((prevRequest) => !prevRequest);
//       setSnackbarOpen(true);
//       setMessage("Delete Successfully ");
//     });
//   };
//   const closeSnacker = () => {
//     setSnackbarOpen(false);
//   };
//   const handleVisibilityClick = () => {};

//   const handleOpen = () => {
//     setOpenForm(!openForm);
//   };
//   const handleModalClose = () => {
//     setOpenForm(false);
//     const resetFormData = {};
//     for (const key in formData) {
//       resetFormData[key] = "";
//     }
//     setFormData(resetFormData);
//   };

//   return (
//     <>
//       <Box style={{ marginBottom: 12 }}>
//         {openForm && (
//           <DashboardCard title="Create State">
//             <Grid container spacing={2}>
//               <Grid item xs={6}>
//                 <Box sx={{ minWidth: 120 }}>
//                   <FormControl fullWidth>
//                     <InputLabel id="demo-simple-select-label">
//                       Country
//                     </InputLabel>
//                     <Select
//                       labelId="demo-simple-select-label"
//                       id="demo-simple-select"
//                       value={formData?.countryId}
//                       label="country"
//                       name="countryId"
//                       onChange={handleChange}
//                     >
//                       {AllCountries?.length ? (
//                         AllCountries?.map((item, index) => (
//                           <MenuItem key={index} value={item?.countryId}>
//                             {item?.categoryName}
//                           </MenuItem>
//                         ))
//                       ) : (
//                         <MenuItem disabled>No countries available</MenuItem>
//                       )}
//                     </Select>
//                   </FormControl>
//                 </Box>
//               </Grid>
//             </Grid>
//             <Box
//               style={{
//                 marginTop: 12,
//                 textAlign: "right",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "end",
//                 gap: 4,
//               }}
//             >
//               <Button
//                 onClick={postCountriesCon}
//                 color="primary"
//                 startIcon={<AddIcon />}
//               >
//                 Submit
//               </Button>
//               <Button onClick={handleModalClose} color="error">
//                 Discard
//               </Button>
//             </Box>
//           </DashboardCard>
//         )}
//       </Box>
//       <PageContainer title="Country" description="Country">
//         <Snackers
//           open={snackbarOpen}
//           closeSnacker={closeSnacker}
//           message={message}
//         />
//         <DashboardCard title="Country">
//           <FullFeaturedCrudGrid
//             rowData={allCountry.rows}
//             columnData={allCountry.columns}
//             setColumnRow={setAllCountry}
//             postApi={postCountriesCon}
//             putApi={putCountryCon}
//             deleteApi={deleteCountryCon}
//             handleModalOpen={handleOpen}
//             openForm={openForm}
//             setIsClose={setIsClose}
//             isClose={isClose}
//             showVisibilityIcon={false}
//             handleVisibilityClick={handleVisibilityClick}
//             hideEditButton={false}
//             hideDeleteButton={false}
//           />

//           {/* <FullFeaturedCrudGridDemo /> */}
//         </DashboardCard>
//       </PageContainer>
//       <Toaster />
//     </>
//   );
// };

// export default countrypage;
