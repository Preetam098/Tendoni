import React, { useState, useEffect } from "react";
import { Typography, Grid, Box } from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import { LocationOn } from "@mui/icons-material";

const SmViews = () => {
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
          <h2>Sales Manager Details</h2>
        </div>
      </div>
      <div></div>
      <PageContainer title="Sales Manager Details" description="Transaction">
        <Box flexGrow={1}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={12}>
              <Grid container spacing={3}>
                <Grid item xs={12} lg={12}>
                  <DashboardCard title="Sales Man Information">
                    <>
                      <TableContainer>
                        <Table style={{ width: "100%" }}>
                          <TableHead>
                            <TableRow>
                              <TableCell>
                                <Typography
                                  variant="subtitle1"
                                  fontSize="0.75rem"
                                >
                                  <b>Sr No.</b>
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Typography
                                  variant="subtitle1"
                                  fontSize="0.75rem"
                                >
                                  <b>Sales Man Name</b>
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Typography
                                  variant="subtitle1"
                                  fontSize="0.75rem"
                                >
                                  <b>Phone No.</b>
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Typography
                                  variant="subtitle1"
                                  fontSize="0.75rem"
                                >
                                  <b>Id</b>
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Typography
                                  variant="subtitle1"
                                  fontSize="0.75rem"
                                >
                                  <b>Address</b>
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Typography
                                  variant="subtitle1"
                                  fontSize="0.75rem"
                                >
                                  <b>Email</b>
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Typography
                                  variant="subtitle1"
                                  fontSize="0.75rem"
                                >
                                  <b>Track</b>
                                </Typography>
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {[
                              {
                                smName: "Satish",
                                smphone: "78556765675",
                                smId: 1,
                                smAddress: "Bhopal",
                                smemail: "sm@gmail.com",
                              },
                              {
                                smName: "Satish",
                                smphone: "78556765675",
                                smId: 1,
                                smAddress: "Bhopal",
                                smemail: "sm@gmail.com",
                              },
                              {
                                smName: "Satish",
                                smphone: "78556765675",
                                smId: 1,
                                smAddress: "Bhopal",
                                smemail: "sm@gmail.com",
                              },
                            ].map((row, index) => (
                              <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{row.smName}</TableCell>
                                <TableCell>{row.smphone}</TableCell>
                                <TableCell>{row.smId}</TableCell>
                                <TableCell>{row.smAddress}</TableCell>
                                <TableCell>{row.smemail}</TableCell>
                                <TableCell>
                                  <IconButton>
                                    <LocationOn />
                                  </IconButton>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
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

export default SmViews;
