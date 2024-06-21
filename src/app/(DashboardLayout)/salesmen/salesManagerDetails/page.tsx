"use client";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import { Typography, Grid, Box } from "@mui/material";
import NavDetails from "../../components/salesManagerNav/NavDetails";
import { useState } from "react";

const SalesManagerDetailsPage = () => {
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
        <div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h4" sx={{ fontSize: "1.125rem" }}>
              Sales Manager Details
            </Typography>
          </div>
        </div>
      </div>

      <NavDetails />

      <PageContainer title="Sales Manager Details" description="Sales Manager Details">
        <Box flexGrow={1}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={12}>
              <DashboardCard>
                <Grid container>
                  <Grid item sm={5}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: "1rem",
                      }}
                    >
                      Sales Manager Information
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: "14px",
                        color: "#697a8d !important",
                        marginTop: "0.9rem",
                      }}
                    >
                      Name:&nbsp; Satish
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: "14px",
                        color: "#697a8d !important",
                        marginTop: "0.3rem",
                      }}
                    >
                      Email:&nbsp; satish@gmail.com
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: "14px",
                        color: "#697a8d !important",
                        marginTop: "0.3rem",
                      }}
                    >
                      Address:&nbsp; Bhopal
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: "14px",
                        color: "#697a8d !important",
                        marginTop: "0.3rem",
                      }}
                    >
                      Phone:&nbsp; 1234567890
                    </Typography>
                  </Grid>
                  <Grid item sm={5}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: "1rem",
                      }}
                    >
                      Bank Information
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: "14px",
                        color: "#697a8d !important",
                        marginTop: "0.9rem",
                      }}
                    >
                      Bank Name:&nbsp; Digital Bank
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: "14px",
                        color: "#697a8d !important",
                        marginTop: "0.3rem",
                      }}
                    >
                      Branch:&nbsp; Bhopal
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: "14px",
                        color: "#697a8d !important",
                        marginTop: "0.3rem",
                      }}
                    >
                      Holder Name:&nbsp; Pankaj
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: "14px",
                        color: "#697a8d !important",
                        marginTop: "0.3rem",
                      }}
                    >
                      A/C No:&nbsp; 12345875
                    </Typography>
                  </Grid>
                  <Grid item sm={2}>
                    <>
                      <div
                        style={{
                          backgroundColor: "red",
                          padding: "10px",
                          display: "flex",
                          justifyContent: "center",
                          borderRadius: "5px",
                        }}
                      >
                        <button
                          style={{
                            backgroundColor: "red",
                            border: "none",
                            fontSize: "1rem",
                            color: "white",
                          }}
                        >
                          Active
                        </button>
                      </div>
                    </>
                  </Grid>
                </Grid>
              </DashboardCard>
            </Grid>
            <Grid item xs={12} lg={12}>
              <DashboardCard>
                <Grid container>
                  <Grid item sm={4}>
                    <Typography
                      variant="h6"
                      sx={{ fontSize: "1rem", marginBottom: "0.9rem" }}
                    >
                      Image
                    </Typography>
                    <div style={{ marginTop: "10px" }}>
                      <img
                        src="/images/profile/upload-img.jpg"
                        width={200}
                        height={200}
                        alt="images"
                        style={{
                          border: "1px solid #DBAA00",
                          borderRadius: "5px",
                        }}
                      />
                    </div>
                  </Grid>
                  <Grid item sm={4}>
                    <Typography
                      variant="h6"
                      sx={{ fontSize: "1rem", marginBottom: "0.9rem" }}
                    >
                      Aadhar Card
                    </Typography>
                    <div style={{ marginTop: "10px" }}>
                      <img
                        src="/images/profile/upload-img.jpg"
                        width={200}
                        height={200}
                        alt="images"
                        style={{
                          border: "1px solid #DBAA00",
                          borderRadius: "5px",
                        }}
                      />
                    </div>
                  </Grid>
                  <Grid item sm={4}>
                    <Typography
                      variant="h6"
                      sx={{ fontSize: "1rem", marginBottom: "0.9rem" }}
                    >
                      PAN Card
                    </Typography>
                    <div style={{ marginTop: "10px" }}>
                      <img
                        src="/images/profile/upload-img.jpg"
                        width={200}
                        height={200}
                        alt="images"
                        style={{
                          border: "1px solid #DBAA00",
                          borderRadius: "5px",
                        }}
                      />
                    </div>
                  </Grid>
                </Grid>
              </DashboardCard>
            </Grid>
          </Grid>
        </Box>
      </PageContainer>
    </>
  );
};

export default SalesManagerDetailsPage;
