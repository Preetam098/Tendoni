import React from "react";
import { Button } from "@mui/material";
import Link from "next/link";

const NavDetails = () => {
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
            <Link href="/salesmen/salesManagerDetails">
              <Button>Sales Manager Overview</Button>
            </Link>
          </div>
        </div>
        <div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Link href="/asm">
              <Button>ASM</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavDetails;
