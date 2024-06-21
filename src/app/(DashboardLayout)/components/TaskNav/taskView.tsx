import React from "react";
import { Button } from "@mui/material";
import Link from "next/link";

const TaskView = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          gap: "50px",
          alignItems: "center",
          marginBottom: "1.5rem",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Link href="/task">
              <Button>Assign Tasks</Button>
            </Link>
          </div>
        </div>
        <div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Link href="/task/toDoList">
              <Button>To Do List</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskView;
