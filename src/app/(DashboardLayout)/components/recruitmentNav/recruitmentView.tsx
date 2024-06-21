import React from "react";
import { Button } from "@mui/material";
import Link from "next/link";

const RecruitmentView = () => {
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
            <Link href="/recruitment">
              <Button>All</Button>
            </Link>
          </div>
        </div>
        <div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Link href="/recruitment/hired">
              <Button>Hired</Button>
            </Link>
          </div>
        </div>
        <div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Link href="/recruitment/notHired">
              <Button>Not Hired</Button>
            </Link>
          </div>
        </div>
        <div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Link href="/recruitment/onHold">
              <Button>On Hold</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecruitmentView;
