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
import { useRouter } from "next/router";
import NavView from "../salesManNav/NavView";

const TransactionView = () => {
  const [selectedValues, setSelectedValues] = useState({
    orderType: "Select Options",
    dateType: "Select Options",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [showDateFields, setShowDateFields] = useState(false);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleDateTypeChange = (event) => {
    setSelectedValues({
      ...selectedValues,
      dateType: event.target.value,
    });
    setShowDateFields(event.target.value === "CustomDate");
  };

  const handleOrderTypeChange = (event) => {
    setSelectedValues({
      ...selectedValues,
      orderType: event.target.value,
    });
  };

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
          <h2>Sales Man Details</h2>
        </div>
      </div>
      <div>
        <NavView />
      </div>
      <PageContainer title="Sale Man Details" description="Transaction">
        <Box flexGrow={1}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={12}>
              <Grid container spacing={3}>
                <Grid item xs={12} lg={12}>
                  <DashboardCard title="Transaction Table">
                    <>
                      <Grid container xs={12} spacing={4}>
                        <Grid item xs={4}>
                          <TextField
                            fullWidth
                            variant="outlined"
                            size="small"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton>
                                    <SearchIcon />
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <Select
                            size="small"
                            fullWidth
                            variant="outlined"
                            value={selectedValues.orderType}
                            onChange={handleOrderTypeChange}
                          >
                            <MenuItem value={"Select Options"}>
                              Select Options
                            </MenuItem>
                            <MenuItem value={"All"}>All</MenuItem>
                            <MenuItem value={"Disburse"}>Disburse</MenuItem>
                            <MenuItem value={"Hold"}>Hold</MenuItem>
                          </Select>
                        </Grid>
                        <Grid item xs={3}>
                          <Select
                            value={selectedValues.dateType}
                            onChange={handleDateTypeChange}
                            size="small"
                            fullWidth
                            variant="outlined"
                          >
                            <MenuItem value={"Select Options"}>
                              Select Options
                            </MenuItem>
                            <MenuItem value={"All"}>All</MenuItem>
                            <MenuItem value={"ThisYear"}>This Year</MenuItem>
                            <MenuItem value={"ThisMonth"}>This Month</MenuItem>
                            <MenuItem value={"ThisWeek"}>This Week</MenuItem>
                            <MenuItem value={"CustomDate"}>
                              Custom Date
                            </MenuItem>
                          </Select>
                        </Grid>
                        <Grid item xs={2}>
                          <div>
                            <Button variant="contained">Filter</Button>
                          </div>
                        </Grid>
                        {showDateFields && (
                          <>
                            <Grid item xs={3}>
                              <TextField
                                label="Start Date"
                                type="date"
                                size="small"
                                variant="outlined"
                                fullWidth
                                InputLabelProps={{
                                  shrink: true,
                                }}
                              />
                            </Grid>
                            <Grid item xs={3}>
                              <TextField
                                label="End Date"
                                type="date"
                                size="small"
                                variant="outlined"
                                fullWidth
                                InputLabelProps={{
                                  shrink: true,
                                }}
                              />
                            </Grid>
                          </>
                        )}
                      </Grid>
                      <TableContainer>
                        <Table style={{ width: "150%" }}>
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
                                  <b>Customer Name</b>
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Typography
                                  variant="subtitle1"
                                  fontSize="0.75rem"
                                >
                                  <b>Order Id</b>
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Typography
                                  variant="subtitle1"
                                  fontSize="0.75rem"
                                >
                                  <b>Transaction Id</b>
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Typography
                                  variant="subtitle1"
                                  fontSize="0.75rem"
                                >
                                  <b>Order Amount</b>
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Typography
                                  variant="subtitle1"
                                  fontSize="0.75rem"
                                >
                                  <b>Received By</b>
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Typography
                                  variant="subtitle1"
                                  fontSize="0.75rem"
                                >
                                  <b>Delivered By</b>
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Typography
                                  variant="subtitle1"
                                  fontSize="0.75rem"
                                >
                                  <b>Delivery Charge</b>
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Typography
                                  variant="subtitle1"
                                  fontSize="0.75rem"
                                >
                                  <b>Payment Method</b>
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Typography
                                  variant="subtitle1"
                                  fontSize="0.75rem"
                                >
                                  <b>Tax</b>
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
                            </TableRow>
                          </TableHead>

                          <TableBody>
                            {[
                              {
                                SalesManName: "Satish",
                                customerName: "Ajay",
                                orderId: 1,
                                transactionId: 234,
                                orderAmount: "$45",
                                deleveryCharge: "$35",
                                receivedBy: "admin",
                                deleveredBy: "admin",
                                paymentMethod: "Cash On Delivery",
                                tax: "$38",
                                status: "Pending",
                              },
                              {
                                SalesManName: "Satish",
                                customerName: "Ajay",
                                orderId: 1,
                                transactionId: 234,
                                orderAmount: "$45",
                                deleveryCharge: "$35",
                                receivedBy: "admin",
                                deleveredBy: "admin",
                                paymentMethod: "Cash On Delivery",
                                tax: "$38",
                                status: "Pending",
                              },
                            ].map((row, index) => (
                              <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{row.SalesManName}</TableCell>
                                <TableCell>{row.customerName}</TableCell>
                                <TableCell>{row.orderId}</TableCell>
                                <TableCell>{row.transactionId}</TableCell>
                                <TableCell>{row.orderAmount}</TableCell>
                                <TableCell>{row.deleveryCharge}</TableCell>
                                <TableCell>{row.receivedBy}</TableCell>
                                <TableCell>{row.deleveredBy}</TableCell>
                                <TableCell>{row.paymentMethod}</TableCell>
                                <TableCell>{row.tax}</TableCell>
                                <TableCell>{row.status}</TableCell>
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

export default TransactionView;
