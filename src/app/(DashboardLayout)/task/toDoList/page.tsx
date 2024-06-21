"use client";
import React, { useState } from "react";
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
import TaskView from "../../components/TaskNav/taskView";

const toDoListPage = () => {
  const [preview, setPreview] = useState({
    uploadFile: "/images/profile/upload-img.jpg",
  });

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [priority, setPriority] = useState("Select Priority");
  const handleChange = (event) => {
    setPriority(event.target.value);
  };

  const [status, setStatus] = useState("Select Status");
  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPreview({ uploadFile: reader.result });
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
          <h2>All Tasks</h2>
        </div>
        <Button variant="contained" onClick={handleClickOpen}>
          Create
        </Button>
      </div>
      <>
        <TaskView />
      </>
      <PageContainer title="To Do List" description="To Do List">
        <Box flexGrow={1}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={12}>
              <Grid container spacing={3}>
                <Grid item xs={12} lg={12}>
                  <DashboardCard title="To Do List">
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>
                              <Typography
                                variant="subtitle1"
                                fontSize="0.75rem"
                              >
                                <b>Task Name</b>
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography
                                variant="subtitle1"
                                fontSize="0.75rem"
                              >
                                <b>Priority</b>
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography
                                variant="subtitle1"
                                fontSize="0.75rem"
                              >
                                <b>Description</b>
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography
                                variant="subtitle1"
                                fontSize="0.75rem"
                              >
                                <b>Remarks</b>
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
                              taskname: "Task 1",
                              priority: "High",
                              description: "This is first task",
                              remarks: "remarks",
                              status: "Pending",
                            },
                          ].map((row, index) => (
                            <TableRow key={index}>
                              <TableCell>{row.taskname}</TableCell>
                              <TableCell>{row.priority}</TableCell>
                              <TableCell>{row.description}</TableCell>
                              <TableCell>{row.remarks}</TableCell>
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
                        File Upload
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
        <DialogTitle>Create Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill out the details below to create a new task.
          </DialogContentText>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={6}>
              <TextField
                autoFocus
                margin="dense"
                label="Task Name"
                type="text"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <Select
                margin="dense"
                fullWidth
                value={priority}
                onChange={handleChange}
                style={{
                  minWidth: "200px",
                  marginTop: "8px",
                }}
              >
                <MenuItem value="Select Priority">Select Priority</MenuItem>
                <MenuItem value="High">High</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="Low">Low</MenuItem>
                <MenuItem value="Urgent">Urgent</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                margin="dense"
                label="Start Date"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                margin="dense"
                label="End Date"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField margin="dense" label="Remarks" type="text" fullWidth />
            </Grid>
            <Grid item xs={12} lg={6}>
              <Select
                margin="dense"
                fullWidth
                value={status}
                onChange={handleStatusChange}
                style={{
                  minWidth: "200px",
                  marginTop: "8px",
                  marginBottom: "20px",
                }}
              >
                <MenuItem value="Select Status">Select Status</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
                <MenuItem value="Work in progress">Work in progress</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
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
                Upload File
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
                  src={preview?.uploadFile}
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

export default toDoListPage;
