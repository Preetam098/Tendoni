"use client";
import React, { useEffect, useState, useRef } from "react";
import {
  TextField,
  Button,
  Typography,
  Grid,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import { getUserById, postusers, putUsers } from "@/utils/apis/Users";
import Snackers from "@/utils/models/Snackers";
import { getAllActiveRole } from "@/utils/apis/Role";
import { useRouter } from "next/navigation";
import { Level } from "../enum";
import CloseIcon from "@mui/icons-material/Close";
import { getAllCountries, getCountryById } from "@/utils/apis/Countries";
import { getCityById } from "@/utils/apis/City";
import { getStateById } from "@/utils/apis/State";

interface AddUsersPageProps {
  userIds?: any;
  onClose?: () => any;
  isUserIdVisible?: boolean;
}
interface Role {
  roleId: string;
  roleName: string;
}

const UserCreatePage: React.FC<AddUsersPageProps> = ({
  userIds,
  onClose,
  isUserIdVisible,
}) => {
  const [userId, setUserId] = useState<any>();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [roles, setroles] = useState<Role[]>([]);
  const [selectedRole, setSelectedRole] = useState<String>("0");
  const [selectedDepartment, setSelectedDepartment] = useState("0");
  const [selectedLevel, setSelectedLevel] = useState<Level>(Level.State);
  const [message, setMessage] = useState("");
  const [allCountry, setAllCountry] = React.useState<any>();

  const [usersInfo, setUsersInfo] = useState({
    firstName: "",
    lastName: "",
    MobileNo: "",
    Address: "",
    uploadAdhar: "",
    uploadpanCard: "",
    uploadImage: "",
    emailAddress: "",
    Password: "",
    ConfirmPassword: "",
    PanelId: "",
    Level: "",
    Document: "",
  });

  const [preview, setPreview] = useState({
    uploadAdhar: "/images/profile/upload-img.jpg",
    uploadpanCard: "/images/profile/upload-img.jpg",
    uploadImage: "/images/profile/upload-img.jpg",
    Document: "/images/profile/upload-img.jpg",
  });
  console.log("preview", preview);
  console.log(usersInfo?.uploadAdhar, "adhar");
  console.log("userinfo", usersInfo);

  const [formData, setFormData] = React.useState<any>({
    countryId: "",
    stateId: "",
    cityId: "",
    areaId: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type } = e.target;
    if (type === "file") {
      const files = e.target.files;
      const filePreviews = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setPreview((prev) => ({ ...prev, [name]: filePreviews[0] }));
      setUsersInfo({ ...usersInfo, [name]: files[0] });
    } else {
      const { value } = e.target;
      setUsersInfo({ ...usersInfo, [name]: value });
    }
  };

  const [filteredStates, setFilteredStates] = React.useState<any>([]);
  const [filteredCity, setFilteredCity] = React.useState<any>([]);
  const [filteredArea, setFilteredArea] = React.useState<any>([]);

  const handleChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target as HTMLSelectElement;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

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

  React.useEffect(() => {
    if (formData.countryId) {
      getStateById(formData.stateId).then?.((city) => {
        if (city?.data && Array.isArray(city.data) && city.data.length > 0) {
          setFilteredCity(city.data[0]?.cities || []);
        } else {
          setFilteredCity([]);
        }
      });
    } else {
      setFilteredCity([]);
    }
  }, [formData.stateId]);

  React.useEffect(() => {
    if (formData.cityId) {
      getCityById(formData.cityId).then?.((area) => {
        if (area?.data && Array.isArray(area.data) && area.data.length > 0) {
          setFilteredArea(area.data[0]?.areas || []);
        } else {
          setFilteredArea([]);
        }
      });
    } else {
      setFilteredArea([]);
    }
  }, [formData.cityId]);

  useEffect(() => {
    getAllActiveRole().then?.((roles: any) => {
      if (roles.length > 0) {
        setroles(roles);
      }
    });
  }, []);

  useEffect(() => {
    getAllCountries().then?.((countries) => {
      setAllCountry(countries);
    });
  }, []);

  const selectRole = async (role: string) => {
    setSelectedRole(role);
  };

  const selectDepartment = async (department) => {
    setSelectedDepartment(department);
  };

  const selectLevel = async (level: Level) => {
    setSelectedLevel(level);
  };

  const router = useRouter();

  var allUsersData = {
    firstName: usersInfo?.firstName,
    lastName: usersInfo?.lastName,
    email: usersInfo?.emailAddress,
    password: usersInfo?.Password,
    department: selectedDepartment,
    adharCard: usersInfo?.uploadAdhar,
    panCard: usersInfo?.uploadpanCard,
    image: usersInfo?.uploadImage,
    address: usersInfo?.Address,
    mobile: usersInfo?.MobileNo,
    roleId: selectedRole,
    panelId:
      selectedLevel === "Country"
        ? formData.countryId
        : selectedLevel === "State"
        ? formData.stateId
        : selectedLevel === "City"
        ? formData.cityId
        : selectedLevel === "Area"
        ? formData.areaId
        : "null",
    level: selectedLevel,
    document: usersInfo.Document,
  };

  const addProduct = () => {
    // Validate fields
    if (!usersInfo?.firstName) {
      setSnackbarOpen(true);
      setMessage("First Name is required.");
      return; // Prevent API call
    }
    if (!usersInfo?.lastName) {
      setSnackbarOpen(true);
      setMessage("Last Name is required.");
      return; // Prevent API call
    }
    if (!usersInfo?.uploadAdhar) {
      setSnackbarOpen(true);
      setMessage("Please upload Adhar Card.");
      return; // Prevent API call
    }
    if (!usersInfo?.uploadpanCard) {
      setSnackbarOpen(true);
      setMessage("Please upload Pan Card.");
      return; // Prevent API call
    }
    if (!usersInfo?.uploadImage) {
      setSnackbarOpen(true);
      setMessage("Please upload Image.");
      return; // Prevent API call
    }
    if (!usersInfo?.Document) {
      setSnackbarOpen(true);
      setMessage("Please upload Document.");
      return; // Prevent API call
    }
    if (!isUserIdVisible) {
      postusers(allUsersData)
        .then((response) => {
          setSnackbarOpen(true);
          setMessage(response.message);
          setUsersInfo({
            firstName: "",
            lastName: "",
            MobileNo: "",
            Address: "",
            uploadAdhar: "",
            uploadpanCard: "",
            uploadImage: "",
            emailAddress: "",
            Password: "",
            ConfirmPassword: "",
            PanelId: "",
            Level: "",
            Document: "",
          });
          setSelectedRole("0");
          setSelectedDepartment("0");
          setSelectedLevel(Level.State);
          router.push("/users");
        })
        .catch((error) => {
          setSnackbarOpen(true);
          setMessage(error);
        });
    } else {
      putUsers(allUsersData, userId)
        .then((response) => {
          setSnackbarOpen(true);
          onClose();
          setMessage(response.message);
          setUsersInfo({
            firstName: "",
            lastName: "",
            MobileNo: "",
            Address: "",
            uploadAdhar: "",
            uploadpanCard: "",
            uploadImage: "",
            emailAddress: "",
            Password: "",
            ConfirmPassword: "",
            PanelId: "",
            Level: "",
            Document: "",
          });
          setSelectedRole("0");
          setSelectedDepartment("0");
          setSelectedLevel(Level.State);
          router.push("/users");
        })
        .catch((error) => {
          setSnackbarOpen(true);
          setMessage(error);
        });
    }
  };

  const closeSnacker = () => {
    setSnackbarOpen(false);
  };

  let apiCalled = false;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isUserIdVisible && !apiCalled) {
          const user = await getUserById(userIds);
          console.log("user", user);
          var Users = user.data;
          setUserId(Users?.adminId);
          apiCalled = true;
          setUsersInfo((prevState) => ({
            ...prevState,
            firstName: Users.firstName,
            lastName: Users.lastName,
            MobileNo: Users.mobile,
            Address: Users.address,
            uploadAdhar: Users.adharCard,
            uploadpanCard: Users.panCard,
            uploadImage: Users.image,
            emailAddress: Users.email,
            Password: Users.password,
            PanelId: Users.panelId,
            Level: Users.level,
            Document: Users.document,
          }));
          setPreview((prevState) => ({
            ...prevState,
            uploadAdhar: Users.adharCard ? Users.adharCard : "",
            uploadpanCard: Users.panCard ? Users?.panCard : "",
            uploadImage: Users.image ? Users?.image : "",
            Document: Users.document ? Users.document : "",
          }));
          setSelectedRole(Users.roleId);
          setSelectedDepartment("0");
          setSelectedLevel(Level.State);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        apiCalled = false;
      }
    };

    fetchData();
  }, [isUserIdVisible]);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.5rem",
        }}
      >
        <Snackers
          open={snackbarOpen}
          closeSnacker={closeSnacker}
          message={message}
        />
        <div>
          <>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography variant="h3" sx={{ fontSize: "1.250rem" }}>
                {isUserIdVisible ? "User Details " : "Add a New User"}
              </Typography>
            </div>
            <Typography
              variant="h6"
              sx={{
                fontSize: "14px",
                color: "#697a8d !important",
                marginTop: "0.3rem",
              }}
            >
              Aug 17, 2023, 5:48 (ET)
            </Typography>
          </>
        </div>
        <div
          style={{
            display: "flex",
            gap: "1rem",
          }}
        ></div>
        <Button
          style={{ marginLeft: "50rem" }}
          variant="contained"
          onClick={() => {
            setUsersInfo({
              firstName: "",
              lastName: "",
              MobileNo: "",
              Address: "",
              uploadAdhar: "",
              uploadpanCard: "",
              uploadImage: "",
              emailAddress: "",
              Password: "",
              ConfirmPassword: "",
              PanelId: "",
              Level: "",
              Document: "",
            });
            setSelectedRole("0");
            setSelectedDepartment("0");
          }}
        >
          Reset
        </Button>

        <Button variant="contained" onClick={addProduct}>
          {isUserIdVisible ? "Update" : "Submit"}
        </Button>
      </div>
      <PageContainer title="Add New User" description="Add New User">
        <Box flexGrow={1}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={12}>
              <Grid container spacing={3}>
                <Grid item xs={12} lg={12}>
                  <Grid item xs={12} lg={12}>
                    {isUserIdVisible ? (
                      <CloseIcon
                        onClick={onClose}
                        style={{
                          cursor: "pointer",
                          position: "absolute",
                          right: "61px",
                        }}
                      />
                    ) : (
                      ""
                    )}
                    <DashboardCard title="User">
                      <Grid container xs={12} spacing={4}>
                        <Grid item xs={6}>
                          <Typography
                            variant="h6"
                            gutterBottom
                            style={{
                              marginTop: 10,
                              marginBottom: 10,
                              fontSize: "0.75rem",
                            }}
                          >
                            First NAME
                          </Typography>

                          <TextField
                            label="First Name"
                            fullWidth
                            size="small"
                            name="firstName"
                            value={usersInfo.firstName}
                            onChange={handleInputChange}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <Typography
                            variant="h6"
                            gutterBottom
                            style={{
                              marginTop: 10,
                              marginBottom: 10,
                              fontSize: "0.75rem",
                            }}
                          >
                            Last Name
                          </Typography>
                          <TextField
                            name="lastName"
                            label="Last Name"
                            fullWidth
                            size="small"
                            value={usersInfo.lastName}
                            onChange={handleInputChange}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <Typography
                            variant="h6"
                            gutterBottom
                            style={{
                              marginTop: 10,
                              marginBottom: 10,
                              fontSize: "0.75rem",
                            }}
                          >
                            Mobile No.
                          </Typography>
                          <TextField
                            type="number"
                            name="MobileNo"
                            label="Mobile No."
                            fullWidth
                            size="small"
                            value={usersInfo.MobileNo}
                            onChange={handleInputChange}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <Typography
                            variant="h6"
                            gutterBottom
                            style={{
                              marginTop: 10,
                              marginBottom: 10,
                              fontSize: "0.75rem",
                            }}
                          >
                            Department
                          </Typography>
                          <FormControl fullWidth sx={{ marginBottom: 2 }}>
                            <InputLabel id="Department"> Department</InputLabel>
                            <Select
                              labelId="Department"
                              id="Department"
                              label="Department"
                              defaultValue="SelectDepartment"
                              placeholder="Select Department"
                              fullWidth
                              size="small"
                              onChange={(event) => {
                                selectDepartment(event.target.value);
                              }}
                            >
                              <MenuItem value="SelectDepartment">
                                Select Department
                              </MenuItem>
                              <MenuItem value="CEO">CEO</MenuItem>
                              <MenuItem value="Accountant">Accountant</MenuItem>
                              <MenuItem value="Sales Manager">
                                Sales Manager
                              </MenuItem>
                              <MenuItem value="Assistant Sales Manager">
                                Assistant Sales Manager
                              </MenuItem>
                              <MenuItem value="Sales Man">Sales Man</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>

                        <Grid item xs={6}>
                          <Typography
                            variant="h6"
                            gutterBottom
                            style={{
                              marginTop: 10,
                              marginBottom: 10,
                              fontSize: "0.75rem",
                            }}
                          >
                            Role
                          </Typography>
                          <FormControl fullWidth sx={{ marginBottom: 2 }}>
                            <InputLabel id="Category"> Role</InputLabel>
                            <Select
                              labelId="Role"
                              id="Role"
                              value={selectedRole}
                              label="Role"
                              defaultValue="Select Role"
                              placeholder="Select Role"
                              fullWidth
                              size="small"
                              onChange={(event: any) => {
                                selectRole(event.target.value);
                              }}
                              MenuProps={{
                                PaperProps: {
                                  style: {
                                    maxHeight: 48 * 4.5 + 8,
                                  },
                                },
                              }}
                            >
                              <MenuItem value="0">Select Role</MenuItem>
                              {roles &&
                                roles.map((roles, index) => (
                                  <MenuItem key={index} value={roles?.roleId}>
                                    {roles?.roleName}
                                  </MenuItem>
                                ))}
                            </Select>
                          </FormControl>
                        </Grid>

                        <Grid item xs={6}>
                          <Typography
                            variant="h6"
                            gutterBottom
                            style={{
                              marginTop: 10,
                              marginBottom: 10,
                              fontSize: "0.75rem",
                            }}
                          >
                            Level
                          </Typography>
                          <FormControl fullWidth size="small">
                            <InputLabel>Level</InputLabel>
                            <Select
                              label="Level"
                              value={selectedLevel}
                              onChange={(e) =>
                                selectLevel(e.target.value as Level)
                              }
                            >
                              {Object.values(Level).map((level) => (
                                <MenuItem key={level} value={level}>
                                  {level}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>

                        <Grid item xs={3}>
                          <FormControl fullWidth sx={{ marginBottom: 2 }}>
                            <InputLabel id="Category"> Country</InputLabel>
                            <Select
                              label="Country"
                              name="countryId"
                              value={formData?.countryId}
                              fullWidth
                              size="medium"
                              onChange={handleChange}
                            >
                              {allCountry?.length ? (
                                allCountry.map((item, index) => (
                                  <MenuItem key={index} value={item?.countryId}>
                                    {item?.categoryName}
                                  </MenuItem>
                                ))
                              ) : (
                                <MenuItem disabled>
                                  No countries available
                                </MenuItem>
                              )}
                            </Select>
                          </FormControl>
                        </Grid>

                        <Grid item xs={3}>
                          <FormControl fullWidth sx={{ marginBottom: 2 }}>
                            <InputLabel id="Category"> State</InputLabel>
                            <Select
                              label="State"
                              name="stateId"
                              value={formData?.stateId}
                              fullWidth
                              size="medium"
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
                                <MenuItem disabled>
                                  No states available
                                </MenuItem>
                              )}
                            </Select>
                          </FormControl>
                        </Grid>

                        <Grid item xs={3}>
                          <FormControl fullWidth sx={{ marginBottom: 2 }}>
                            <InputLabel id="Category"> City</InputLabel>
                            <Select
                              label="Select City"
                              name="cityId"
                              value={formData?.cityId}
                              fullWidth
                              size="medium"
                              onChange={handleChange}
                            >
                              {filteredCity && filteredCity.length > 0 ? (
                                filteredCity.map((item, index) => {
                                  return (
                                    <MenuItem key={index} value={item.cityId}>
                                      {item.cityName}
                                    </MenuItem>
                                  );
                                })
                              ) : (
                                <MenuItem disabled>No city available</MenuItem>
                              )}
                            </Select>
                          </FormControl>
                        </Grid>

                        <Grid item xs={3}>
                          <FormControl fullWidth sx={{ marginBottom: 2 }}>
                            <InputLabel id="Category"> Area</InputLabel>
                            <Select
                              label="Select Area"
                              name="areaId"
                              value={formData?.areaId}
                              fullWidth
                              size="medium"
                              onChange={handleChange}
                            >
                              {filteredArea && filteredArea.length > 0 ? (
                                filteredArea.map((item, index) => {
                                  return (
                                    <MenuItem key={index} value={item.areaId}>
                                      {item.areaName}
                                    </MenuItem>
                                  );
                                })
                              ) : (
                                <MenuItem disabled>No area available</MenuItem>
                              )}
                            </Select>
                          </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                          <Typography
                            variant="h6"
                            gutterBottom
                            style={{
                              marginTop: 10,
                              marginBottom: 10,
                              fontSize: "0.75rem",
                            }}
                          >
                            Address
                          </Typography>
                          <TextField
                            name="Address"
                            label="Address"
                            fullWidth
                            size="small"
                            multiline
                            rows={4}
                            value={usersInfo.Address}
                            onChange={handleInputChange}
                          />
                        </Grid>

                        <Grid item xs={3}>
                          <Typography
                            variant="h6"
                            gutterBottom
                            style={{
                              marginTop: 10,
                              marginBottom: 10,
                              fontSize: "0.75rem",
                            }}
                          >
                            Upload Adhar Card
                          </Typography>
                          <div
                            style={{
                              border: "1px solid lightgray",
                              padding: "10px",
                              borderRadius: "5px",
                              width: "80%",
                            }}
                          >
                            <input
                              type="file"
                              name="uploadAdhar"
                              onChange={handleInputChange}
                            />
                          </div>
                          <div style={{ marginTop: "10px" }}>
                            <img
                              width={200}
                              height={200}
                              className="w-20 h-20 rounded-lg border-2 border-black"
                              src={preview?.uploadAdhar}
                              style={{
                                border: "1px solid #DBAA00",
                                borderRadius: "5px",
                              }}
                            ></img>
                          </div>
                        </Grid>

                        <Grid item xs={3}>
                          <Typography
                            variant="h6"
                            gutterBottom
                            style={{
                              marginTop: 10,
                              marginBottom: 10,
                              fontSize: "0.75rem",
                            }}
                          >
                            Upload Pan Card
                          </Typography>
                          <div
                            style={{
                              border: "1px solid lightgray",
                              padding: "10px",
                              borderRadius: "5px",
                              width: "80%",
                            }}
                          >
                            <input
                              type="file"
                              name="uploadpanCard"
                              onChange={handleInputChange}
                            />
                          </div>
                          <div style={{ marginTop: "10px" }}>
                            <img
                              width={200}
                              height={200}
                              className="w-20 h-20 rounded-lg border-2 border-black"
                              src={preview?.uploadpanCard}
                              style={{
                                border: "1px solid #DBAA00",
                                borderRadius: "5px",
                              }}
                            ></img>
                          </div>
                        </Grid>

                        <Grid item xs={3}>
                          <Typography
                            variant="h6"
                            gutterBottom
                            style={{
                              marginTop: 10,
                              marginBottom: 10,
                              fontSize: "0.75rem",
                            }}
                          >
                            Upload Image
                          </Typography>
                          <div
                            style={{
                              border: "1px solid lightgray",
                              padding: "10px",
                              borderRadius: "5px",
                              width: "80%",
                            }}
                          >
                            <input
                              type="file"
                              name="uploadImage"
                              onChange={handleInputChange}
                            />
                          </div>
                          <div style={{ marginTop: "10px" }}>
                            <img
                              width={200}
                              height={200}
                              className="w-20 h-20 rounded-lg border-2 border-black"
                              src={preview?.uploadImage}
                              style={{
                                border: "1px solid #DBAA00",
                                borderRadius: "5px",
                              }}
                            ></img>
                          </div>
                        </Grid>
                        <Grid item xs={3}>
                          <Typography
                            variant="h6"
                            gutterBottom
                            style={{
                              marginTop: 10,
                              marginBottom: 10,
                              fontSize: "0.75rem",
                            }}
                          >
                            Other Documents
                          </Typography>
                          <div
                            style={{
                              border: "1px solid lightgray",
                              padding: "10px",
                              borderRadius: "5px",
                              width: "80%",
                            }}
                          >
                            <input
                              type="file"
                              name="Document"
                              onChange={handleInputChange}
                            />
                          </div>
                          <div style={{ marginTop: "10px" }}>
                            <img
                              width={200}
                              height={200}
                              className="w-20 h-20 rounded-lg border-2 border-black"
                              src={preview?.Document}
                              style={{
                                border: "1px solid #DBAA00",
                                borderRadius: "5px",
                              }}
                            ></img>
                          </div>
                        </Grid>
                      </Grid>
                    </DashboardCard>
                  </Grid>
                </Grid>
                <Grid item xs={12} lg={12}>
                  {isUserIdVisible ? (
                    <CloseIcon
                      onClick={onClose}
                      style={{
                        cursor: "pointer",
                        position: "absolute",
                        right: "61px",
                      }}
                    />
                  ) : (
                    ""
                  )}
                  <DashboardCard>
                    <Grid container xs={12} spacing={4}>
                      <Grid item xs={4}>
                        <Typography
                          variant="h6"
                          gutterBottom
                          style={{
                            marginTop: 10,
                            marginBottom: 10,
                            fontSize: "0.75rem",
                          }}
                        >
                          Email Address
                        </Typography>

                        <TextField
                          type="email"
                          label="Email Address"
                          fullWidth
                          size="small"
                          name="emailAddress"
                          value={usersInfo.emailAddress}
                          onChange={handleInputChange}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <Typography
                          variant="h6"
                          gutterBottom
                          style={{
                            marginTop: 10,
                            marginBottom: 10,
                            fontSize: "0.75rem",
                          }}
                        >
                          Password
                        </Typography>
                        <TextField
                          type="password"
                          name="Password"
                          label="Password"
                          fullWidth
                          size="small"
                          value={usersInfo.Password}
                          onChange={handleInputChange}
                          autoComplete="new-password"
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <Typography
                          variant="h6"
                          gutterBottom
                          style={{
                            marginTop: 10,
                            marginBottom: 10,
                            fontSize: "0.75rem",
                          }}
                        >
                          Confirm Password
                        </Typography>
                        <TextField
                          type="password"
                          name="ConfirmPassword"
                          label="Confirm Password"
                          fullWidth
                          size="small"
                          value={usersInfo.ConfirmPassword}
                          onChange={handleInputChange}
                          autoComplete="new-password"
                        />
                      </Grid>
                    </Grid>
                  </DashboardCard>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </PageContainer>
    </>
  );
};

export default UserCreatePage;
