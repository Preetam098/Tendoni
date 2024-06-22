"use client";
import React, { useState } from "react";
import {
  Typography,
  Grid,
  Box,
  Popover,
  MenuItem,
  Drawer,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider,
} from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import {
  Visibility,
  MoreVert,
  Delete,
  Payment,
  AddCircleOutline,
  CloudDownload,
  Close,
} from "@mui/icons-material";
import AccountNav from "../components/accountNav/NavView";
import { getAllOrder, getAllWebsiteOrder } from "@/utils/apis/Order";
import { approvePayment, postPayment } from "@/utils/apis/Payment";
import toast, { Toaster } from "react-hot-toast";



const OrderPage = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewPaymentModalOpen, setIsNewPaymentModalOpen] = useState(false);
  const [paymentDate, setPaymentDate] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const [amount, setAmount] = useState("");
  const [notes, setNotes] = useState("");
  const [allOrders, setAllOrders] = useState<any>("");
  const[orderData , setOrderData] = useState<any>('')
  const[message , setMessage] = useState('')
  const[dueDate ,setDueDate] = useState('')

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const handleViewClick = (row) => {
    setSidebarOpen(true);
    handlePopoverClose();
  };

  const handlePopoverOpen = (event,row) => {
console.log(row , 'row')
    setOrderData(row)
    setAnchorEl(event.currentTarget);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  const handleDeleteClick = () => {
    console.log("Delete clicked");
    handlePopoverClose();
  };

  const handlePaymentClick = () => {
    setIsModalOpen(true);
    handlePopoverClose();
  };

  const handleAddPaymentClick = (orderData) => {
    setIsNewPaymentModalOpen(true);
    handlePopoverClose();
  };

  const handleDownloadClick = () => {
    console.log("Download Invoice clicked");
    handlePopoverClose();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleNewPaymentCloseModal = () => {
    setIsNewPaymentModalOpen(false);
  };

  const handleCreatePayment = () => {
    const payload=({
      orderId:orderData.orderId,
      paymentDate,
      paymentMode,
      amount,
      notes,
    })
    postPayment(payload)
    .then((response) => {
      toast.success(`${response.message}`);
      setMessage(response.message);
      setSidebarOpen(false);
      setIsNewPaymentModalOpen(false)
    })
    .catch((error) => {
      setMessage(error);
    });
  };


  const handleApproved =()=>{
    let errors = {};
    if (!dueDate) {
      errors.dueDate = "Due Date is required";
      toast.error('Due Date is required')
    }
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    const payload =({
        orderData:orderData?.orderId,
        dueDate,
    })
    approvePayment(payload)
    .then((response) => {
     
      toast.success(`${response.message}`);
      setMessage(response.message);
      setSidebarOpen(false);
      
    })
    .catch((error) => {
      setMessage(error);
    });
  }

  React.useEffect(() => {
    getAllOrder().then((orders) => {
      const data = orders.map((order, index) => ({
        id: order.orderId,
        srNo: index + 1,
        orderId: order.orderId,
        orderDate: order.orderDate,
        orderStatus: order.orderState,
        customerName: order.customerName,
        accountApproval: order.approvalStatus,
        accountStatus: order.accountantStatus,
        shippingAddress: order.shippingAddress,
        products: order.products,
        paymentDetails: order.paymentDetails,
      }));
      setAllOrders(data);
    });
  } , [])

  console.log(allOrders,'ordel')

  const paymentData = [
    {
      txnsNo: "001",
      paymentDate: "2024-05-01",
      amount: "1000",
      paymentMode: "Credit Card",
    },
    {
      txnsNo: "002",
      paymentDate: "2024-05-02",
      amount: "2000",
      paymentMode: "Cash",
    },
    {
      txnsNo: "003",
      paymentDate: "2024-05-03",
      amount: "1500",
      paymentMode: "Bank Transfer",
    },
  ];

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
          <h2>Sales Return / Credit Note</h2>
        </div>
      </div>
      <AccountNav />

      <PageContainer title="Salesman Orders" description="Transaction">
        <Box flexGrow={1}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={12}>
              <Grid container spacing={3}>
                <Grid item xs={12} lg={12}>
                  <DashboardCard title="Salesman Orders">
                    <>
                      <TableContainer>
                        <Table
                          sx={{
                            border: "1px solid lightgray",
                            "& .MuiTableCell-root": {
                              border: "1px solid lightgray",
                            },
                          }}
                        >
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
                                  <b>Order Id</b>
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Typography
                                  variant="subtitle1"
                                  fontSize="0.75rem"
                                >
                                  <b>Order Date</b>
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
                                  <b>Order Status</b>
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Typography
                                  variant="subtitle1"
                                  fontSize="0.75rem"
                                >
                                  <b>Total Amount</b>
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Typography
                                  variant="subtitle1"
                                  fontSize="0.75rem"
                                >
                                  <b>Paid Amount</b>
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Typography
                                  variant="subtitle1"
                                  fontSize="0.75rem"
                                >
                                  <b>Due Amount</b>
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
                                  <b>Action</b>
                                </Typography>
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {allOrders && allOrders.map((row, index) => (
                              <TableRow >
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{row.orderId}</TableCell>
                                <TableCell>{row.orderDate}</TableCell>
                                <TableCell>{row.customerName}</TableCell>
                                <TableCell>{row.orderStatus}</TableCell>
                                <TableCell>{row.paymentDetails?.paymentAmount}</TableCell>
                                <TableCell>{row.paymentDetails?.paidAmount || '-'}</TableCell>
                                <TableCell>{row.paymentDetails?.DueAmount || '-'}</TableCell>
                                <TableCell>{row.paymentDetails?.paymentStatus}</TableCell>
                                <TableCell>
                                  <IconButton
                                    aria-owns={
                                      open ? "mouse-over-popover" : undefined
                                    }
                                    aria-haspopup="true"
                                    onClick={(e)=>handlePopoverOpen(e , row)}
                                  >
                                    <MoreVert />
                                  </IconButton>
                                  <Popover
                                    id="mouse-over-popover"
                                    open={open}
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                      vertical: "bottom",
                                      horizontal: "left",
                                    }}
                                    transformOrigin={{
                                      vertical: "top",
                                      horizontal: "right",
                                    }}
                                    onClose={handlePopoverClose}
                                  >
                                    <MenuItem onClick={()=>handleViewClick(row)}>
                                      <IconButton>
                                        <Visibility />
                                      </IconButton>
                                      View
                                    </MenuItem>
                                    <MenuItem onClick={handleDeleteClick}>
                                      <IconButton>
                                        <Delete />
                                      </IconButton>
                                      Delete
                                    </MenuItem>
                                    <MenuItem onClick={handlePaymentClick}>
                                      <IconButton>
                                        <Payment />
                                      </IconButton>
                                      View Payment
                                    </MenuItem>
                                    <MenuItem onClick={()=>handleAddPaymentClick(orderData)}>
                                      <IconButton>
                                        <AddCircleOutline />
                                      </IconButton>
                                      Add New Payment
                                    </MenuItem>
                                    <MenuItem onClick={handleDownloadClick}>
                                      <IconButton>
                                        <CloudDownload />
                                      </IconButton>
                                      Download Invoice
                                    </MenuItem>
                                  </Popover>
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

      <Drawer
        anchor="right"
        open={sidebarOpen}
        onClose={handleSidebarClose}
        PaperProps={{ style: { width: "60%" } }}
      >
        <Box p={2} role="presentation">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h6">
              SALE-RET-79{" "}
              <span
                style={{
                  border: "1px solid #ffccc7",
                  backgroundColor: "#fff2f0",
                  color: "#ff4d4f",
                  borderColor: "#ffccc7",
                  paddingInline: "7px",
                  fontSize: "12px",
                  borderRadius: "4px",
                }}
              >
                Unpaid
              </span>
            </Typography>
            <Box>
              <Button variant="contained" onClick={()=>handleAddPaymentClick(orderData)}>
                Add New Payment
              </Button>
              <Button variant="contained" onClick={handleApproved} style={{ marginLeft: "5px" }}>
                Approved Payment
              </Button>
              <IconButton onClick={handleSidebarClose}>
                <Close />
              </IconButton>
            </Box>
          </Box>
          <hr />
          <br />
          <TableContainer>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Typography variant="subtitle1">Order Date :</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle1">Order Status</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle1">Customer :</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography variant="subtitle1">
                   {orderData?.orderDate}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle1">
                      <span
                        style={{
                          color: "#389e0d",
                          borderColor: "#b7eb8f",
                          backgroundColor: "#f6ffed",
                          paddingInline: "7px",
                          borderRadius: "4px",
                          border: "1px solid #d9d9d9",
                          fontSize: "12px",
                        }}
                      >
                   {orderData?.orderStatus}
                      
                      </span>
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle1">
                   {orderData?.customerName}
                    
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Typography variant="subtitle1">
                      Payment Status :
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle1">
                      Order Taken By :
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle1">Total Amount :</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography variant="subtitle1">
                      <span
                        style={{
                          border: "1px solid #ffccc7",
                          backgroundColor: "#fff2f0",
                          color: "#00FF00",
                          borderColor: "#ffccc7",
                          paddingInline: "7px",
                          fontSize: "12px",
                          borderRadius: "4px",
                        }}
                      >
                   {orderData?.paymentDetails?.paymentStatus}
                   {}
                      </span>
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle1">{orderData?.customerName}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle1">{orderData.paymentDetails?.paymentAmount}</Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Typography variant="subtitle1">Paid Amount :</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle1">Due Amount :</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle1">Discount :</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography variant="subtitle1">{orderData.paymentDetails?.paidAmount || '-'}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle1">{orderData.paymentDetails?.dueAmount || '-'}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle1">00.0</Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Typography variant="subtitle1">Shipping :</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography variant="subtitle1">00.0</Typography>
                  </TableCell>
                </TableRow>
              </TableBody>

              <Typography variant="subtitle1">Due Date</Typography>
              <div
                style={{ display: "flex", gap: "10%", alignItems: "center" }}
              >
                <div>
                  <TextField
                    required
                    label="Due Date"
                    onChange={(e) => setDueDate(e.target.value)}
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                    margin="normal"
                  />
                </div>
                <div>
                  <Button variant="contained">Save</Button>
                </div>
              </div>
            </Table>
          </TableContainer>
        </Box>
      </Drawer>
      <Dialog fullWidth open={isModalOpen} onClose={handleCloseModal}>
        <DialogTitle>
          Payment Details
          <IconButton
            aria-label="close"
            onClick={handleCloseModal}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography>Invoice Number : SALE-RET-79</Typography>
            <Typography>Status :</Typography>
            <Typography>Customer : Jonh</Typography>
          </div>
          <br />
          <TableContainer>
            <Table
              sx={{
                border: "1px solid lightgray",
                "& .MuiTableCell-root": {
                  border: "1px solid lightgray",
                },
              }}
            >
              <TableHead sx={{ backgroundColor: "#fafafa" }}>
                <TableRow>
                  <TableCell>
                    <Typography variant="subtitle1">Txns No.</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle1">Payment Date</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle1">Amount</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle1">Payment Mode</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paymentData.map((payment, index) => (
                  <TableRow key={index}>
                    <TableCell>{payment.txnsNo}</TableCell>
                    <TableCell>{payment.paymentDate}</TableCell>
                    <TableCell>{payment.amount}</TableCell>
                    <TableCell>{payment.paymentMode}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
      </Dialog>

      <Dialog
        fullWidth
        open={isNewPaymentModalOpen}
        onClose={handleNewPaymentCloseModal}
      >
        <DialogTitle onClick={()=>handleAddPaymentClick(orderData)}>Add New Payment</DialogTitle>
        <Divider />
        <DialogContent>
          <form>
            <TextField
              required
              label="Payment Date"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              margin="normal"
              value={paymentDate}
              onChange={(e) => setPaymentDate(e.target.value)}
            />
            <TextField
              required
              label="Payment Mode"
              select
              fullWidth
              margin="normal"
              value={paymentMode}
              onChange={(e) => setPaymentMode(e.target.value)}
            >
              <MenuItem value="Cash">Cash</MenuItem>
              <MenuItem value="Credit Card">Credit Card</MenuItem>
              <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
            </TextField>
            <TextField
              required
              label="Amount"
              type="number"
              fullWidth
              margin="normal"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <TextField
              label="Notes"
              multiline
              rows={4}
              fullWidth
              margin="normal"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleNewPaymentCloseModal}>Cancel</Button>
          <Button
           onClick={handleCreatePayment}
            variant="contained"
            color="primary"
            type="submit"
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
      <Toaster />

    </>
  );
};

export default OrderPage;
