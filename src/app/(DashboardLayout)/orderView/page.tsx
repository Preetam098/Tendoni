"use client";
import PageContainer from "../components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import BlankCard from "../components/shared/BlankCard";
import { CardContent, Divider, Grid, Typography } from "@mui/material";
import { IconCalendarTime } from "@tabler/icons-react";
import useMediaQuery from "@mui/material/useMediaQuery";
import CommonDataGrid from "../components/dataGrid/CommonDataGrid";
import OrdersView from "../components/ordersView/ordersDetails";

const OrderViewPage = () => {
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <PageContainer title="Orders" description="page">
      <OrdersView />
      <div style={{ paddingTop: "0.8rem" }}>
        {/* <CommonDataGrid columnDefinitions={columns} rows={rows} /> */}
      </div>
    </PageContainer>
  );
};

export default OrderViewPage;
