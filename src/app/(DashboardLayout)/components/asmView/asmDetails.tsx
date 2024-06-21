import React, { useState, useEffect } from "react";
import { Typography, Grid, Box } from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton
} from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import NavDetails from "../salesManagerNav/NavDetails";
import { Visibility } from "@mui/icons-material";
import { useRouter } from "next/navigation";

const AsmViews = () => {
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
          <h2>Sales Manager Details</h2>
        </div>
      </div>
      <div>
        <NavDetails />
      </div>
      <PageContainer title="Sales Manager Details" description="Transaction">
        <Box flexGrow={1}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={12}>
              <Grid container spacing={3}>
                <Grid item xs={12} lg={12}>
                  <DashboardCard title="ASM Information">
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
                                  <b>ASM Name</b>
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
                                  <b>View</b>
                                </Typography>
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {[
                              {
                                AsmName: "Satish",
                                Asmphone: "78556765675",
                                AsmId: 1,
                                AsmAddress: "Bhopal",
                                Asmemail: "asm@gmail.com",
                              },
                              {
                                AsmName: "Satish",
                                Asmphone: "78556765675",
                                AsmId: 1,
                                AsmAddress: "Bhopal",
                                Asmemail: "asm@gmail.com",
                              },
                              {
                                AsmName: "Satish",
                                Asmphone: "78556765675",
                                AsmId: 1,
                                AsmAddress: "Bhopal",
                                Asmemail: "asm@gmail.com",
                              },
                            ].map((row, index) => (
                              <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{row.AsmName}</TableCell>
                                <TableCell>{row.Asmphone}</TableCell>
                                <TableCell>{row.AsmId}</TableCell>
                                <TableCell>{row.AsmAddress}</TableCell>
                                <TableCell>{row.Asmemail}</TableCell>
                                <TableCell>
                                  <IconButton>
                                    <Visibility onClick={() => router.push("/sm")}/>
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

export default AsmViews;
