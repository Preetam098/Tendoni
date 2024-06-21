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
import RichTextEditor from "../../components/editor/RichTextEditor";

const MailSettingPage = () => {
  const [richTextValue, setRichTextValue] = useState<string>();

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
          <h2>Edit Email Templete</h2>
        </div>
      </div>
      <PageContainer
        title="Edit Email Templete"
        description="Edit Email Templete"
      >
        <Box flexGrow={1}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={12}>
              <Grid container spacing={3}>
                <Grid item xs={12} lg={12}>
                  <DashboardCard title="Edit Email Templete">
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
                            ].map((row, index) => (
                              <TableRow key={index}>
                                <TableCell>{row.Variable}</TableCell>
                                <TableCell>{row.Variable}</TableCell>
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
                      <Typography variant="subtitle1" fontSize="1rem">
                        Subject *
                      </Typography>
                      <TextField
                        fullWidth
                        label="Password Reset"
                        type="password"
                      ></TextField>
                      <Box sx={{ mt: "30px", pb: "50px", mb: "30px" }}>
                        <RichTextEditor
                          value={richTextValue as string}
                          onChange={setRichTextValue}
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
