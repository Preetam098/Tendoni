import React from "react";
import { Button } from "@mui/material";
import Link from "next/link";

const AccountNav = () => {
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
            <Link href="/accountant">
              <Button>Salesman </Button>
            </Link>
          </div>
        </div>
        <div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Link href="/accountant/order">
              <Button>Orders From Ecommerce</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountNav;
