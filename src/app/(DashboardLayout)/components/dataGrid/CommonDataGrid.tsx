"use client";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import {TextField, Divider, Grid, FormControl, InputLabel, Select, MenuItem, Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

type Props = {
  columnDefinitions : GridColDef[]
  rows : any
};

const CommonDataGrid = ({columnDefinitions, rows }: Props) => {

  return (
    <Box flexGrow={1}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <DashboardCard title="Categories">
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                 <TextField label="Search" size="small" />
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ height: 600, width: "100%" }}>
                  <DataGrid 
                    rows={rows} 
                    columns={columnDefinitions} 
                    checkboxSelection 
                    rowHeight={100}
                    />
                </Box>
              </Grid>
            </Grid>
          </DashboardCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CommonDataGrid;
