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
          <h2>Sms Template</h2>
        </div>
      </div>
      <PageContainer title="Sms Template" description="Sms Template">
        <Box flexGrow={1}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={12}>
              <Grid container spacing={3}>
                <Grid item xs={12} lg={12}>
                  <DashboardCard title="Sms Template">
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
                                  <b>Sms Template</b>
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
                              },
                              {
                                EmailTemplate: "Password Reset",
                              },
                              {
                                EmailTemplate: "Newsletter",
                              },
                            ].map((row, index) => (
                              <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{row.EmailTemplate}</TableCell>
                                <TableCell>
                                  <IconButton>
                                    <EditIcon
                                      onClick={() =>
                                        router.push(
                                          "/smsConfiguration/smsEditTemplete"
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
