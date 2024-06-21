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
  MenuProps,
} from "@mui/material";
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
import VisibilityIcon from "@mui/icons-material/Visibility";
import TaskView from "../components/TaskNav/taskView";
import { getAllUsers } from "@/utils/apis/Users";

interface User {
  adminId: string;
  firstName: string;
}

const TasksAssignPage = () => {
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<String>("0");
  const [user, setusers] = useState<User[]>([]);

  const selectUser = async (user: string) => {
    setSelectedUser(user);
  };

  useEffect(() => {
    getAllUsers().then?.((users: any) => {
      if (users.length > 0) {
        setusers(users);
      }
    });
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [priority, setPriority] = useState("Select Priority");
  const [status, setStatus] = useState("Select Status");

  const handleChange = (event) => {
    setPriority(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
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
      <PageContainer title="Assign Tasks" description="Tasks">
        <Box flexGrow={1}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={12}>
              <Grid container spacing={3}>
                <Grid item xs={12} lg={12}>
                  <DashboardCard title="Assign Tasks">
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>
                              <Typography
                                variant="subtitle1"
                                fontSize="0.75rem"
                              >
                                <b>Subject</b>
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
                                <b>Start Date</b>
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography
                                variant="subtitle1"
                                fontSize="0.75rem"
                              >
                                <b>Due Date</b>
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography
                                variant="subtitle1"
                                fontSize="0.75rem"
                              >
                                <b>Assignee</b>
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
                              subject: "Task 1",
                              priority: "High",
                              startDate: "05-06-2024",
                              dueDate: "10-06-2024",
                              assign: "MD",
                              status: "Pending",
                            },
                          ].map((row, index) => (
                            <TableRow key={index}>
                              <TableCell>{row.subject}</TableCell>
                              <TableCell>{row.priority}</TableCell>
                              <TableCell>{row.startDate}</TableCell>
                              <TableCell>{row.dueDate}</TableCell>
                              <TableCell>{row.assign}</TableCell>
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
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </PageContainer>
      <Dialog maxWidth="lg" open={open} onClose={handleClose}>
        <DialogTitle>Assign Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill out the details below to assign a new task.
          </DialogContentText>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={6}>
              <TextField
                autoFocus
                margin="dense"
                label="Subject"
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
              <Select
                labelId="User"
                id="User"
                value={selectedUser}
                defaultValue="Select Users"
                placeholder="Select Users"
                fullWidth
                style={{
                  minWidth: "200px",
                  marginTop: "8px",
                  marginBottom: "20px",
                }}
                onChange={(event: any) => {
                  selectUser(event.target.value);
                }}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 48 * 4.5 + 8,
                    },
                  },
                }}
              >
                <MenuItem value="0">Select Assignee</MenuItem>
                {user &&
                  user.map((users, index) => (
                    <MenuItem key={index} value={users?.adminId}>
                      {users?.firstName}
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
            <Grid item xs={12} lg={12}>
              <TextField
                margin="dense"
                label="Description"
                type="text"
                fullWidth
                multiline
                rows={4}
              />
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

export default TasksAssignPage;
