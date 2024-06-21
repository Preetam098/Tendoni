"use client";
import React, { useState } from "react";
import { Grid, Box, Typography, TextField, Button } from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";

const MailSettingPage = () => {
  const [description, setDescription] = useState<string>("");

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
          <h2>Edit Sms Templete</h2>
        </div>
      </div>
      <PageContainer title="Edit Sms Templete" description="Edit Sms Templete">
        <Box flexGrow={1}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={12}>
              <Grid container spacing={3}>
                <Grid item xs={12} lg={12}>
                  <DashboardCard title="Edit Sms Templete">
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
                                  <b>Variable</b>
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Typography variant="subtitle1" fontSize="1rem">
                                  <b>Meaning</b>
                                </Typography>
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {[
                              {
                                Variable: "{{Name}}",
                                Meaning: "User Name",
                              },
                              {
                                Variable: "{{Name}}",
                                Meaning: "OTP",
                              },
                            ].map((row, index) => (
                              <TableRow key={index}>
                                <TableCell>{row.Variable}</TableCell>
                                <TableCell>{row.Meaning}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </>
                  </DashboardCard>
                </Grid>
                <Grid item xs={12} lg={12}>
                  <DashboardCard>
                    <>
                      <Box sx={{ mt: "30px", pb: "30px" }}>
                        <Typography variant="subtitle1" gutterBottom>
                          Description *
                        </Typography>
                        <TextField
                          fullWidth
                          multiline
                          rows={6}
                          variant="outlined"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </Box>
                    </>
                    <Button variant="contained">Update</Button>
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

export default MailSettingPage;
