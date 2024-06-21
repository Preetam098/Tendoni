"use client";
import React, { useState } from "react";
import { Typography, Grid, Box, TextField, Button } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { MapView } from "../components/Map/map";

const MailSettingPage = () => {
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
          <h2>Google Map Tracking</h2>
        </div>
      </div>
      <PageContainer
        title="Google Map Tracking Setup"
        description="Google Map Tracking Setup"
      >
        <Box flexGrow={1}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={12}>
              <Grid container spacing={3}>
                <Grid item xs={12} lg={12}>
                  <DashboardCard title="Google Map Tracking Setup">
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
                          Map Api Key(Client)
                        </Typography>

                        <TextField
                          label="Map Api Key(Client)"
                          fullWidth
                          size="small"
                          name="firstName"
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
                          Map Api Key (Server )
                        </Typography>
                        <TextField
                          name="lastName"
                          label="Map Api Key (Server )"
                          fullWidth
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <MapView />
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

export default MailSettingPage;
