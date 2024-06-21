import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  IconButton,
  InputAdornment,
} from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import { Dropzone, ExtFile, FileMosaic } from "@files-ui/react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import GetAppIcon from "@mui/icons-material/GetApp";
import NavView from "../salesManNav/NavView";
import { useRouter } from "next/navigation";

const StatsView = () => {
  const router = useRouter();
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
          <h2>Sales Man Details</h2>
        </div>
      </div>
      <div>
        <NavView />
      </div>
      <PageContainer title="" description="Filter">
        <Box flexGrow={1}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={12}>
              <Grid container spacing={3}>
                <Grid item xs={12} lg={12}>
                  <Grid item xs={12} lg={12}>
                    <DashboardCard title="Order Info">
                      <Grid container xs={12} spacing={4}>
                        <Grid item xs={4}>
                          <div
                            style={{
                              display: "flex",
                              gap: "72%",
                              border: "1px solid #ccc",
                              padding: "10px",
                              borderRadius: "5px",
                              backgroundColor: "#DBAA00",
                            }}
                          >
                            <Typography
                              variant="h6"
                              gutterBottom
                              style={{
                                marginTop: 10,
                                marginBottom: 10,
                                fontSize: "1rem",
                              }}
                            >
                              Pending
                            </Typography>
                            <Typography
                              variant="h6"
                              gutterBottom
                              style={{
                                marginTop: 10,
                                marginBottom: 10,
                                fontSize: "1rem",
                              }}
                            >
                              0
                            </Typography>
                          </div>
                        </Grid>
                        <Grid item xs={4}>
                          <div
                            style={{
                              display: "flex",
                              gap: "72%",
                              border: "1px solid #ccc",
                              padding: "10px",
                              borderRadius: "5px",
                              backgroundColor: "#DBAA00",
                            }}
                          >
                            <Typography
                              variant="h6"
                              gutterBottom
                              style={{
                                marginTop: 10,
                                marginBottom: 10,
                                fontSize: "1rem",
                              }}
                            >
                              Delivered
                            </Typography>
                            <Typography
                              variant="h6"
                              gutterBottom
                              style={{
                                marginTop: 10,
                                marginBottom: 10,
                                fontSize: "1rem",
                              }}
                            >
                              1
                            </Typography>
                          </div>
                        </Grid>
                        <Grid item xs={4}>
                          <div
                            style={{
                              display: "flex",
                              gap: "90%",
                              border: "1px solid #ccc",
                              padding: "10px",
                              borderRadius: "5px",
                              backgroundColor: "#DBAA00",
                            }}
                          >
                            <Typography
                              variant="h6"
                              gutterBottom
                              style={{
                                marginTop: 10,
                                marginBottom: 10,
                                fontSize: "1rem",
                              }}
                            >
                              All
                            </Typography>
                            <Typography
                              variant="h6"
                              gutterBottom
                              style={{
                                marginTop: 10,
                                marginBottom: 10,
                                fontSize: "1rem",
                              }}
                            >
                              1
                            </Typography>
                          </div>
                        </Grid>
                      </Grid>
                    </DashboardCard>
                  </Grid>
                </Grid>
                <Grid item xs={12} lg={12}>
                  <DashboardCard>
                    <TableContainer>
                      <Table>
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
                                <b>Order</b>
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography
                                variant="subtitle1"
                                fontSize="0.75rem"
                              >
                                <b>Date</b>
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography
                                variant="subtitle1"
                                fontSize="0.75rem"
                              >
                                <b>Customer</b>
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography
                                variant="subtitle1"
                                fontSize="0.75rem"
                              >
                                <b>Payment Status</b>
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography
                                variant="subtitle1"
                                fontSize="0.75rem"
                              >
                                <b>Total</b>
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography
                                variant="subtitle1"
                                fontSize="0.75rem"
                              >
                                <b>Order Status</b>
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
                              orderId: 1,
                              order: "123",
                              date: "2024-05-06",
                              customer: "Jack Dev",
                              paymentStatus: "Paid",
                              total: "$338",
                              oderStatus: "Pending",
                            },
                          ].map((row, index) => (
                            <TableRow key={index}>
                              <TableCell>{index + 1}</TableCell>
                              <TableCell>{row.order}</TableCell>
                              <TableCell>{row.date}</TableCell>
                              <TableCell>{row.customer}</TableCell>
                              <TableCell>{row.paymentStatus}</TableCell>
                              <TableCell>{row.total}</TableCell>
                              <TableCell>{row.oderStatus}</TableCell>
                              <TableCell>
                                <IconButton>
                                  <VisibilityIcon onClick={() => router.push("/orders/orderDetails")}/>
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
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

export default StatsView;
