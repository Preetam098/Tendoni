"use client";
import React, { useState } from "react";
import { Typography, Grid, Box } from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";

const PermissionLogPage = () => {
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
          <h2>Permission Logs</h2>
        </div>
      </div>
      <PageContainer title="Permission Logs" description="Permission Logs">
        <Box flexGrow={1}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={12}>
              <Grid container spacing={3}>
                <Grid item xs={12} lg={12}>
                  <DashboardCard title="Permission Logs">
                    <>
                      <TableContainer>
                        <Table>
                          <TableHead
                            sx={{
                              borderBottom: "2px solid lightgray",
                              backgroundColor: "#fafafa",
                            }}
                          >
                            <TableRow>
                              <TableCell>
                                <Typography
                                  variant="subtitle1"
                                  fontSize="0.75rem"
                                >
                                  <b>User Name</b>
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Typography
                                  variant="subtitle1"
                                  fontSize="0.75rem"
                                >
                                  <b>Event</b>
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Typography
                                  variant="subtitle1"
                                  fontSize="0.75rem"
                                >
                                  <b>Roles</b>
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Typography
                                  variant="subtitle1"
                                  fontSize="0.75rem"
                                >
                                  <b>Timestamp</b>
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Typography
                                  variant="subtitle1"
                                  fontSize="0.75rem"
                                >
                                  <b>Description</b>
                                </Typography>
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {[
                              {
                                UserName: "Satish",
                                Event: "Added",
                                Roles: "Admin",
                                Timestamp: "12 Apl 2024 5:00 AM",
                                Description:
                                  "New Permission Logged Successfully",
                              },
                              {
                                UserName: "Satish",
                                Event: "Added",
                                Roles: "Admin",
                                Timestamp: "12 Apl 2024 5:00 AM",
                                Description:
                                  "New Permission Logged Successfully",
                              },
                              {
                                UserName: "Satish",
                                Event: "Added",
                                Roles: "Admin",
                                Timestamp: "12 Apl 2024 5:00 AM",
                                Description:
                                  "New Permission Logged Successfully",
                              },
                            ].map((row, index) => (
                              <TableRow key={index}>
                                <TableCell>{row.UserName}</TableCell>
                                <TableCell>{row.Event}</TableCell>
                                <TableCell>{row.Roles}</TableCell>
                                <TableCell>{row.Timestamp}</TableCell>
                                <TableCell>{row.Description}</TableCell>
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

export default PermissionLogPage;
