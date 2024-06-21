"use client";
import React, { useState } from "react";
import {
  Typography,
  Grid,
  Box,
  MenuItem,
  TextField,
  Button,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Tooltip,
  Divider,
} from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const MailSettingPage = () => {
  const [mailSetting, setMailSetting] = useState("None");
  const [mailEncryption, setMailEncryption] = useState("TLS");

  const initialCheckboxState = {
    onCreate: false,
    onUpdate: false,
    onDelete: false,
  };

  const [stockAdjustment, setStockAdjustment] = useState(initialCheckboxState);
  const [salesReturn, setSalesReturn] = useState(initialCheckboxState);
  const [salesManager, setSalesManager] = useState(initialCheckboxState);
  const [salesMan, setSalesMan] = useState(initialCheckboxState);
  const [order, setOrder] = useState(initialCheckboxState);
  const [staffMembers, setStaffMembers] = useState(initialCheckboxState);

  const handleCheckboxChange = (section, event) => {
    const { name, checked } = event.target;
    switch (section) {
      case "stockAdjustment":
        setStockAdjustment({ ...stockAdjustment, [name]: checked });
        break;
      case "salesReturn":
        setSalesReturn({ ...salesReturn, [name]: checked });
        break;
      case "salesManager":
        setSalesManager({ ...salesManager, [name]: checked });
        break;
      case "salesMan":
        setSalesMan({ ...salesMan, [name]: checked });
        break;
      case "order":
        setOrder({ ...order, [name]: checked });
        break;
      case "staffMembers":
        setStaffMembers({ ...staffMembers, [name]: checked });
        break;
      default:
        break;
    }
  };

  const renderCheckboxGroup = (title, sectionState, sectionName) => (
    <>
      <Typography
        variant="h6"
        gutterBottom
        style={{
          fontSize: "1rem",
          marginBottom: 10,
          display: "flex",
          alignItems: "center",
        }}
      >
        {title}
        <Tooltip title="Notification will be sent to warehouse email">
          <InfoOutlinedIcon style={{ cursor: "pointer", marginLeft: 5 }} />
        </Tooltip>
      </Typography>
      <FormControl component="fieldset">
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={sectionState.onCreate}
                onChange={(e) => handleCheckboxChange(sectionName, e)}
                name="onCreate"
              />
            }
            label="On create"
          />
          <FormControlLabel
            sx={{ marginTop: -1 }}
            control={
              <Checkbox
                checked={sectionState.onUpdate}
                onChange={(e) => handleCheckboxChange(sectionName, e)}
                name="onUpdate"
              />
            }
            label="On update"
          />
          <FormControlLabel
            sx={{ marginTop: -1 }}
            control={
              <Checkbox
                checked={sectionState.onDelete}
                onChange={(e) => handleCheckboxChange(sectionName, e)}
                name="onDelete"
              />
            }
            label="On delete"
          />
        </FormGroup>
      </FormControl>
      <Divider style={{ marginBottom: 20, marginTop: 20 }} />
    </>
  );

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "0.9rem",
        }}
      >
        <div>
          <h2>Mail Setting</h2>
        </div>
      </div>
      <PageContainer title="Mail Setting" description="Mail Setting">
        <Box flexGrow={1}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={12}>
              <Grid container spacing={3}>
                <Grid item xs={12} lg={8}>
                  <div>
                    <DashboardCard title="Mail Driver">
                      <>
                        <TextField
                          defaultValue="None"
                          select
                          fullWidth
                          margin="normal"
                          value={mailSetting}
                          onChange={(e) => setMailSetting(e.target.value)}
                        >
                          <MenuItem value="None">None</MenuItem>
                          <MenuItem value="SMTP">SMTP</MenuItem>
                        </TextField>
                        <Button variant="contained">Update</Button>
                      </>
                    </DashboardCard>
                  </div>
                  <div style={{ marginTop: "20px" }}>
                    <DashboardCard title="Mail Configuration">
                      <>
                        <Grid container spacing={2}>
                          <Grid item xs={12} md={6}>
                            <TextField
                              type="text"
                              label="Mail Host"
                              fullWidth
                              margin="normal"
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <TextField
                              type="text"
                              label="Email"
                              fullWidth
                              margin="normal"
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <TextField
                              type="text"
                              label="SMTP Username"
                              fullWidth
                              margin="normal"
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <TextField
                              type="password"
                              label="SMTP Password"
                              fullWidth
                              margin="normal"
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <TextField
                              type="text"
                              label="Mail Port"
                              fullWidth
                              margin="normal"
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <TextField
                              select
                              label="Mail Encryption"
                              fullWidth
                              margin="normal"
                              value={mailEncryption}
                              onChange={(e) =>
                                setMailEncryption(e.target.value)
                              }
                            >
                              <MenuItem value="TLS">TLS</MenuItem>
                              <MenuItem value="SSL">SSL</MenuItem>
                            </TextField>
                          </Grid>
                        </Grid>
                        <Button
                          variant="contained"
                          style={{ marginTop: "20px" }}
                        >
                          Update
                        </Button>
                      </>
                    </DashboardCard>
                  </div>
                </Grid>

                <Grid
                  item
                  xs={12}
                  lg={4}
                  sx={{ overflowY: "auto", maxHeight: "600px" }}
                >
                  <DashboardCard title="Send Mail For">
                    {renderCheckboxGroup(
                      "Stock Adjustment",
                      stockAdjustment,
                      "stockAdjustment"
                    )}
                    {renderCheckboxGroup(
                      "Sales Return / Credit Note",
                      salesReturn,
                      "salesReturn"
                    )}
                    {renderCheckboxGroup(
                      "Sales Manager",
                      salesManager,
                      "salesManager"
                    )}
                    {renderCheckboxGroup("Sales Man", salesMan, "salesMan")}
                    {renderCheckboxGroup("Order", order, "order")}
                    {renderCheckboxGroup(
                      "Staff Members",
                      staffMembers,
                      "staffMembers"
                    )}
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

export default MailSettingPage;
