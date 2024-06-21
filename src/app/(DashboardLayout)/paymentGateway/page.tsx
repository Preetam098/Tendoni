"use client";
import React, { useState } from "react";
import {
  Typography,
  Grid,
  Box,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  MenuItem,
} from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";

const AccountantPage = () => {
  const [notes, setNotes] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  const [isNewPaymentModalOpen, setIsNewPaymentModalOpen] = useState(false);
  const handleAddPaymentClick = () => {
    setIsNewPaymentModalOpen(true);
  };
  const handleNewPaymentCloseModal = () => {
    setIsNewPaymentModalOpen(false);
  };

  const handleCreatePayment = () => {
    // Create payment logic here
  };
  // State for holding payment methods and transactions
  const [paymentMethods, setPaymentMethods] = React.useState([
    "Credit Card",
    "PayPal",
  ]);
  const [transactions, setTransactions] = React.useState([
    { id: 1, method: "Credit Card", amount: "$100" },
    { id: 2, method: "PayPal", amount: "$200" },
  ]);
  const [newMethod, setNewMethod] = React.useState("");

  // Function to handle adding a new payment method
  const handleAddMethod = () => {
    if (newMethod) {
      setPaymentMethods([...paymentMethods, newMethod]);
      setNewMethod("");
    }
  };

  const [configureModalOpen, setConfigureModalOpen] = useState(false);
  const handleOpenConfigureModal = () => {
    setConfigureModalOpen(true);
  };

  // Function to handle closing the configure modal
  const handleCloseConfigureModal = () => {
    setConfigureModalOpen(false);
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
          <Typography variant="h4">Payment Gateway</Typography>
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddPaymentClick}
        >
          Add New Payment
        </Button>
      </div>
      <PageContainer
        title="Payment Gateway"
        description="Manage your payment gateways here."
      >
        <Box flexGrow={1}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <DashboardCard title="Payment Gateway Overview">
                <Box p={3}>
                  <Typography variant="body1">
                    Here you can manage and overview your payment gateways. This
                    section provides a summary of all payment gateways you are
                    using.
                  </Typography>
                </Box>
              </DashboardCard>
            </Grid>

            {/* Add Payment Method Section */}
            <Grid item xs={12} md={6}>
              <DashboardCard title="Add Payment Method">
                <Box p={3}>
                  <TextField
                    label="New Payment Method"
                    value={newMethod}
                    onChange={(e) => setNewMethod(e.target.value)}
                    fullWidth
                  />
                  <Button
                    variant="contained"
                    color="secondary"
                    style={{ marginTop: "1rem" }}
                    onClick={handleAddMethod}
                  >
                    Add Method
                  </Button>
                  <List>
                    {paymentMethods.map((method, index) => (
                      <ListItem key={index}>
                        <ListItemText primary={method} />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </DashboardCard>
            </Grid>

            {/* View Transactions Section */}
            <Grid item xs={12} md={6}>
              <DashboardCard title="View Transactions">
                <Box p={3}>
                  <List>
                    {transactions.map((transaction) => (
                      <ListItem key={transaction.id}>
                        <ListItemText
                          primary={`Method: ${transaction.method}`}
                          secondary={`Amount: ${transaction.amount}`}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </DashboardCard>
            </Grid>

            {/* Payment Gateway Settings Section */}
            <Grid item xs={12}>
              <DashboardCard title="Payment Gateway Settings">
                <Box p={3}>
                  <Typography variant="body1">
                    Configure your payment gateways here. You can add, edit, or
                    remove gateways as per your requirement.
                  </Typography>
                  <Button
                    variant="contained"
                    color="secondary"
                    style={{ marginTop: "1rem" }}
                    onClick={handleOpenConfigureModal}
                  >
                    Configure Gateways
                  </Button>
                </Box>
              </DashboardCard>
            </Grid>
          </Grid>
        </Box>
      </PageContainer>

      <Dialog
        fullWidth
        open={isNewPaymentModalOpen}
        onClose={handleNewPaymentCloseModal}
      >
        <DialogTitle>Add New Payment</DialogTitle>
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
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>

      {/* Configure Gateways Modal */}
      <Dialog open={configureModalOpen} onClose={handleCloseConfigureModal}>
        <DialogTitle>Configure Payment Gateways</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Here you can configure your payment gateways. Add, edit, or remove
            gateways as needed.
          </Typography>
          {/* Add configuration options here */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfigureModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AccountantPage;
