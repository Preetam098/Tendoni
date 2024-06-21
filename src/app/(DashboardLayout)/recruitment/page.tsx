"use client";
import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Grid,
  Box,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Select,
  MenuItem,
} from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import RecruitmentView from "../components/recruitmentNav/recruitmentView";
import { getAllActiveRole } from "@/utils/apis/Role";

interface Role {
  roleId: string;
  roleName: string;
}

const allcandidatePage = () => {
  const [preview, setPreview] = useState({
    uploadResume: "/images/profile/upload-img.jpg",
    uploadAdhar: "/images/profile/upload-img.jpg",
  });

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const [roles, setroles] = useState<Role[]>([]);
  const [selectedRole, setSelectedRole] = useState<String>("0");

  useEffect(() => {
    getAllActiveRole().then?.((roles: any) => {
      if (roles.length > 0) {
        setroles(roles);
      }
    });
  }, []);

  const selectRole = async (role: string) => {
    setSelectedRole(role);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [interview, setInterview] = useState("Select Interview For");
  const handleChange = (event) => {
    setInterview(event.target.value);
  };

  const [status, setStatus] = useState("Select Status");
  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleInputChange = (event) => {
    const { name, files } = event.target;
    const file = files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPreview((prev) => ({ ...prev, [name]: reader.result }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

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
          <h2>All Candidate</h2>
        </div>
        <Button variant="contained" onClick={handleClickOpen}>
          Add Candidate
        </Button>
      </div>
      <>
        <RecruitmentView />
      </>
      <PageContainer title="All" description="All Candidate">
        <Box flexGrow={1}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={12}>
              <Grid container spacing={3}>
                <Grid item xs={12} lg={12}>
                  <DashboardCard title="All Candidate">
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>
                              <Typography
                                variant="subtitle1"
                                fontSize="0.75rem"
                              >
                                <b>Name</b>
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography
                                variant="subtitle1"
                                fontSize="0.75rem"
                              >
                                <b>Mobile No.</b>
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography
                                variant="subtitle1"
                                fontSize="0.75rem"
                              >
                                <b>Email Id</b>
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
                                <b>Status</b>
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
                              name: "Satish",
                              mobileNo: "1234567890",
                              emailId: "satish@gmail.com",
                              address: "Bhopal",
                              status: "On hold",
                            },
                          ].map((row, index) => (
                            <TableRow key={index}>
                              <TableCell>{row.name}</TableCell>
                              <TableCell>{row.mobileNo}</TableCell>
                              <TableCell>{row.emailId}</TableCell>
                              <TableCell>{row.address}</TableCell>
                              <TableCell>{row.status}</TableCell>
                              <TableCell>
                                <IconButton>
                                  <VisibilityIcon />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </DashboardCard>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <DashboardCard>
                    <Grid item xs={12}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        style={{
                          marginTop: 10,
                          marginBottom: 10,
                          fontSize: "0.75rem",
                        }}
                      >
                        Notes
                      </Typography>
                      <TextField
                        name="Notes"
                        label="Notes"
                        fullWidth
                        size="small"
                        multiline
                        rows={4}
                        disabled
                      />
                    </Grid>
                  </DashboardCard>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <DashboardCard>
                    <Grid item xs={12}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        style={{
                          marginTop: 10,
                          marginBottom: 10,
                          fontSize: "0.75rem",
                        }}
                      >
                        Resume
                      </Typography>
                      <div style={{ marginTop: "10px" }}>
                        <img
                          width={200}
                          height={200}
                          className="w-20 h-20 rounded-lg border-2 border-black"
                          src="/images/profile/upload-img.jpg"
                          style={{
                            border: "1px solid #DBAA00",
                            borderRadius: "5px",
                          }}
                        ></img>
                      </div>
                    </Grid>
                  </DashboardCard>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </PageContainer>
      <Dialog maxWidth="lg" open={open} onClose={handleClose}>
        <DialogTitle>All Candidate</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill out the details below to hired new candidate.
          </DialogContentText>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={6}>
              <TextField
                autoFocus
                margin="dense"
                label="Name"
                type="text"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                margin="dense"
                label="Mobile No."
                type="number"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                margin="dense"
                label="Email Id"
                type="text"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                margin="dense"
                label="Address"
                type="text"
                multiline
                fullWidth
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <Select
                labelId="Role"
                id="Role"
                value={selectedRole}
                defaultValue="Select Interview for"
                placeholder="Select Interview for"
                fullWidth
                style={{
                  minWidth: "200px",
                  marginTop: "8px",
                  marginBottom: "20px",
                }}
                onChange={(event: any) => {
                  selectRole(event.target.value);
                }}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 48 * 4.5 + 8,
                    },
                  },
                }}
              >
                <MenuItem value="0">Select Interview for</MenuItem>
                {roles &&
                  roles.map((roles, index) => (
                    <MenuItem key={index} value={roles?.roleId}>
                      {roles?.roleName}
                    </MenuItem>
                  ))}
              </Select>
            </Grid>
            <Grid item xs={12} lg={6}>
              <Select
                margin="dense"
                fullWidth
                value={status}
                onChange={handleStatusChange}
                style={{ minWidth: "200px", marginTop: "8px" }}
              >
                <MenuItem value="Select Status">Select Status</MenuItem>
                <MenuItem value="Hired">Hired</MenuItem>
                <MenuItem value="Not Hired">Not Hired</MenuItem>
                <MenuItem value="On Hold">On Hold</MenuItem>
              </Select>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={6}>
              <TextField
                margin="dense"
                label="Notes"
                type="text"
                fullWidth
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                margin="dense"
                label="Description"
                type="text"
                fullWidth
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <Typography
                variant="h6"
                gutterBottom
                style={{
                  marginTop: 10,
                  marginBottom: 10,
                  fontSize: "0.75rem",
                }}
              >
                Upload Resume
              </Typography>
              <div
                style={{
                  border: "1px solid lightgray",
                  padding: "10px",
                  borderRadius: "5px",
                  width: "100%",
                }}
              >
                <input
                  type="file"
                  name="uploadResume"
                  onChange={handleInputChange}
                />
              </div>
              <div style={{ marginTop: "10px" }}>
                <img
                  width={200}
                  height={200}
                  className="w-20 h-20 rounded-lg border-2 border-black"
                  src={preview?.uploadResume}
                  style={{
                    border: "1px solid #DBAA00",
                    borderRadius: "5px",
                  }}
                ></img>
              </div>
            </Grid>
            <Grid item xs={12} lg={6}>
              <Typography
                variant="h6"
                gutterBottom
                style={{
                  marginTop: 10,
                  marginBottom: 10,
                  fontSize: "0.75rem",
                }}
              >
                Upload Adhar
              </Typography>
              <div
                style={{
                  border: "1px solid lightgray",
                  padding: "10px",
                  borderRadius: "5px",
                  width: "100%",
                }}
              >
                <input
                  type="file"
                  name="uploadAdhar"
                  onChange={handleInputChange}
                />
              </div>
              <div style={{ marginTop: "10px" }}>
                <img
                  width={200}
                  height={200}
                  className="w-20 h-20 rounded-lg border-2 border-black"
                  src={preview?.uploadAdhar}
                  style={{
                    border: "1px solid #DBAA00",
                    borderRadius: "5px",
                  }}
                ></img>
              </div>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default allcandidatePage;
