import { Button, Grid, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
interface props {
  open: boolean;
  handleClose: () => void;
  entries?: number;
  deleteAction: () => void;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "#fff",
  borderRadius: 3,
  boxShadow: 24,
  px: 2,
  py: 1.5,
};

const DeleteModal = ({ open, handleClose, entries, deleteAction }: props) => {
  const handleDelete = () => {
    // handleClose();
    deleteAction();
    // window.location.reload();
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          //   border: "2px solid #000",
          boxShadow: 24,
          borderRadius: 3,
          p: 4,
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          <span className="text-base text-[#AAA8A7]">Are you sure?</span>
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 1 }}>
          <span className="text-[#AAA8A7]">
            {/* You want to delete record{entries} this{" "}
              {entries && (entries > 1 ? "records" : "record")} */}
            You want to delete
            {/* {entries}{" "}
              {entries && (entries > 1 ? "records" : "record")} */}
          </span>
        </Typography>
        <Grid container justifyContent="flex-end" spacing={2} sx={{ mt: 2 }}>
          <Grid item>
            <Button
              style={{
                backgroundColor: "#DBAA00",
                color: "white",
                padding: "8px 16px",
              }}
              onClick={() => {
                handleDelete();
                handleClose();
              }}
            >
              Delete
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                backgroundColor: "#DBAA00",
                color: "white",
                padding: "8px 16px",
              }}
              onClick={handleClose}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default DeleteModal;
