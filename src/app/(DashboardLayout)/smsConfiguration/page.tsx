"use client";
import React, { useState } from "react";
import {
  Grid,
  Box,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Switch,
} from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";

const MailSettingPage = () => {
  const [richTextValue, setRichTextValue] = useState<string>();
  const [sendRegistrationOtp, setSendRegistrationOtp] =
    useState<boolean>(false);
  const [forgetPasswordOtp, setForgetPasswordOtp] = useState<boolean>(false);
  const [orderConfirmation, setOrderConfirmation] = useState<boolean>(false);

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
          <h2>Sms Configuration</h2>
        </div>
      </div>
      <PageContainer title="Sms Configuration" description="Sms Configuration">
        <Box flexGrow={1}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={12}>
              <Grid container spacing={3}>
                <Grid item xs={12} lg={12}>
                  <DashboardCard title="Sms Configuration">
                    <>
                      <Typography variant="subtitle1" fontSize="1rem">
                        Account SID
                      </Typography>
                      <TextField
                        fullWidth
                        label="Account SID"
                        type="text"
                      ></TextField>

                      <Typography
                        variant="subtitle1"
                        fontSize="1rem"
                        style={{ marginTop: "1rem" }}
                      >
                        Auth Token
                      </Typography>
                      <TextField
                        fullWidth
                        label="Auth Token"
                        type="text"
                      ></TextField>

                      <Typography
                        variant="subtitle1"
                        fontSize="1rem"
                        style={{ marginTop: "1rem" }}
                      >
                        Twilio Phone Number
                      </Typography>
                      <TextField
                        fullWidth
                        label="Twilio Phone Number"
                        type="text"
                      ></TextField>

                      <Box style={{ marginTop: "1rem" }}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={sendRegistrationOtp}
                              onChange={(e) =>
                                setSendRegistrationOtp(e.target.checked)
                              }
                              name="sendRegistrationOtp"
                              color="primary"
                            />
                          }
                          label="Send Registration OTP"
                        />
                        <FormControlLabel
                          control={
                            <Switch
                              checked={forgetPasswordOtp}
                              onChange={(e) =>
                                setForgetPasswordOtp(e.target.checked)
                              }
                              name="forgetPasswordOtp"
                              color="primary"
                            />
                          }
                          label="Forget Password OTP"
                        />
                        <FormControlLabel
                          control={
                            <Switch
                              checked={orderConfirmation}
                              onChange={(e) =>
                                setOrderConfirmation(e.target.checked)
                              }
                              name="orderConfirmation"
                              color="primary"
                            />
                          }
                          label="Order Confirmation"
                        />
                      </Box>

                      <Button variant="contained" style={{ marginTop: "1rem" }}>
                        Update
                      </Button>
                    </>
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
