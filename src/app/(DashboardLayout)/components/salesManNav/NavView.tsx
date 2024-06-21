import React from "react";
import { Button } from "@mui/material";
import Link from "next/link";

const NavView = () => {
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
            <Link href="/salesmen/salesmandetails">
              <Button>Sales Man Overview</Button>
            </Link>
          </div>
        </div>
        <div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Link href="/orderView">
              <Button>Order</Button>
            </Link>
          </div>
        </div>
        <div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Link href="/transaction">
              <Button>Transaction</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavView;
