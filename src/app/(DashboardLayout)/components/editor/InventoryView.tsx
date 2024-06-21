import React, { useState } from 'react';
import { Container, Paper, Typography, Button, Divider, Radio, FormControlLabel, IconButton } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';

const InventoryView: React.FC = () => {
  // State to track whether the advanced details are expanded
  const [advancedDetailsExpanded, setAdvancedDetailsExpanded] = useState(false);

  // Function to handle the toggle of advanced details
  const toggleAdvancedDetails = () => {
    setAdvancedDetailsExpanded((prev) => !prev);
  };

  return (
    <Container maxWidth="md" style={{ marginTop: 20 }}>
      <Paper elevation={3} style={{ padding: 20 }}>
        {/* Header Section */}
        <Typography variant="h4" gutterBottom>
          Inventory
        </Typography>
        <Button variant="outlined" style={{ marginRight: 10 }}>
          Restock
        </Button>
        <Button variant="outlined" style={{ marginRight: 10 }}>
          Options
        </Button>
        <Button variant="contained" color="primary">
          3234 Confirm
        </Button>
        <Divider style={{ margin: '20px 0' }} />

        {/* Shipping Section */}
        <Typography variant="h6" gutterBottom>
          Shipping Type
        </Typography>
        <FormControlLabel
          control={<Radio color="primary" />}
          label="Fulfilled by Seller"
          style={{ marginRight: 20 }}
        />
        <FormControlLabel
          control={<Radio color="primary" />}
          label="Fulfilled by [Company Name] (RECOMMENDED)"
        />
        <Typography variant="body2" color="textSecondary" style={{ marginTop: 10 }}>
          Shipping fee will be added at checkout
        </Typography>
        <Divider style={{ margin: '20px 0' }} />

        {/* Global Delivery Section */}
        <Typography variant="h6" gutterBottom>
          Global Delivery
        </Typography>
        <Paper elevation={3} style={{ padding: 10, background: '#ffe59a', display: 'flex', alignItems: 'center' }}>
          <WarningIcon style={{ color: 'red', marginRight: 10 }} />
          <Typography variant="body1">
            The seller may be charged a damage fee if the product is damaged or delayed during shipping.
          </Typography>
        </Paper>
        <Divider style={{ margin: '20px 0' }} />

        {/* Attributes Section */}
        <Typography variant="h6" gutterBottom>
          Attributes
        </Typography>
        <Typography variant="body1" fontWeight="bold">
          Product in stock now: 54
        </Typography>
        <Divider style={{ margin: '20px 0' }} />

        {/* Advanced Section */}
        <Typography variant="h6" gutterBottom>
          Advanced
        </Typography>
        <Typography variant="body1" style={{ cursor: 'pointer', color: 'blue' }} onClick={toggleAdvancedDetails}>
          Last time restocked: 24th June, 2023
        </Typography>
        {advancedDetailsExpanded && (
          <div>
            <Typography variant="body1">Total stock over lifetime: 2430</Typography>
            <Typography variant="body1">Product in transit: 390</Typography>
          </div>
        )}
      </Paper>
    </Container>
  );
};

export default InventoryView;
