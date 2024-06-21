"use client";
import React, { useState } from "react";
import { Typography, Grid, Box, IconButton } from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import { useRouter } from "next/navigation";
import { Router } from "react-router-dom";

const UserLogPage = () => {
  const router = useRouter();
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
          <h2>Email Template</h2>
        </div>
      </div>
      <PageContainer title="Email Template" description="Email Template">
        <Box flexGrow={1}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={12}>
              <Grid container spacing={3}>
                <Grid item xs={12} lg={12}>
                  <DashboardCard title="Email Template">
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
                                <Typography variant="subtitle1" fontSize="1rem">
                                  <b>SN</b>
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Typography variant="subtitle1" fontSize="1rem">
                                  <b>Email Template</b>
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Typography variant="subtitle1" fontSize="1rem">
                                  <b>Subject</b>
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Typography variant="subtitle1" fontSize="1rem">
                                  <b>Action</b>
                                </Typography>
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {[
                              {
                                EmailTemplate: "Welcome Email",
                                Subject: "Welcome to our platform",
                              },
                              {
                                EmailTemplate: "Password Reset",
                                Subject: "Reset your password",
                              },
                              {
                                EmailTemplate: "Newsletter",
                                Subject: "Monthly newsletter",
                              },
                            ].map((row, index) => (
                              <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{row.EmailTemplate}</TableCell>
                                <TableCell>{row.Subject}</TableCell>
                                <TableCell>
                                  <IconButton>
                                    <EditIcon
                                      onClick={() =>
                                        router.push(
                                          "/mailSetting/editEmailTemplete"
                                        )
                                      }
                                    />
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

export default UserLogPage;
