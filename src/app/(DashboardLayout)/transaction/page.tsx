"use client";
import PageContainer from "../components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import BlankCard from "../components/shared/BlankCard";
import { CardContent, Divider, Grid, Typography } from "@mui/material";
import { IconCalendarTime } from "@tabler/icons-react";
import useMediaQuery from "@mui/material/useMediaQuery";
import CommonDataGrid from "../components/dataGrid/CommonDataGrid";
import TransactionView from "../components/transactionView/transactiondetails";

const transactionPage = () => {
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <PageContainer title="Orders" description="page">
      <TransactionView />
      <div style={{paddingTop:"0.8rem"}}>
        {/* <CommonDataGrid columnDefinitions={columns} rows={rows} /> */}
      </div>
    </PageContainer>
  );
};

export default transactionPage;
