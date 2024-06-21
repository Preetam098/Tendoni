"use client";
import React, { useState, useEffect } from "react";
import { TextField, Typography, Grid, Box, IconButton } from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import RecruitmentView from "../../components/recruitmentNav/recruitmentView";

const hiredPage = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <div>
          <h2>Hired Candidate</h2>
        </div>
      </div>
      <>
        <RecruitmentView />
      </>
      <PageContainer title="Hired" description="Hired">
        <Box flexGrow={1}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={12}>
              <Grid container spacing={3}>
                <Grid item xs={12} lg={12}>
                  <DashboardCard title="Hired Candidate">
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>
                              <Typography
                                variant="subtitle1"
                                fontSize="0.75rem"
                              >
                                <b>Name</b>
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography
                                variant="subtitle1"
                                fontSize="0.75rem"
                              >
                                <b>Mobile No.</b>
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography
                                variant="subtitle1"
                                fontSize="0.75rem"
                              >
                                <b>Email Id</b>
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
                                <b>Position</b>
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography
                                variant="subtitle1"
                                fontSize="0.75rem"
                              >
                                <b>Status</b>
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography
                                variant="subtitle1"
                                fontSize="0.75rem"
                              >
                                <b>Action</b>
                              </Typography>
                            </TableCell>
                          </TableRow>
                        </TableHead>

                        <TableBody>
                          {[
                            {
                              name: "Satish",
                              mobileNo: "1234567890",
                              emailId: "satish@gmail.com",
                              address: "Bhopal",
                              position: "Sales Man",
                              status: "Hired",
                            },
                          ].map((row, index) => (
                            <TableRow key={index}>
                              <TableCell>{row.name}</TableCell>
                              <TableCell>{row.mobileNo}</TableCell>
                              <TableCell>{row.emailId}</TableCell>
                              <TableCell>{row.address}</TableCell>
                              <TableCell>{row.position}</TableCell>
                              <TableCell>{row.status}</TableCell>
                              <TableCell>
                                <IconButton>
                                  <VisibilityIcon />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </DashboardCard>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <DashboardCard>
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
                        Notes
                      </Typography>
                      <TextField
                        name="Notes"
                        label="Notes"
                        fullWidth
                        size="small"
                        multiline
                        rows={4}
                        disabled
                      />
                    </Grid>
                  </DashboardCard>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <DashboardCard>
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
                        Resume
                      </Typography>
                      <div style={{ marginTop: "10px" }}>
                        <img
                          width={200}
                          height={200}
                          className="w-20 h-20 rounded-lg border-2 border-black"
                          src="/images/profile/upload-img.jpg"
                          style={{
                            border: "1px solid #DBAA00",
                            borderRadius: "5px",
                          }}
                        ></img>
                      </div>
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

export default hiredPage;
