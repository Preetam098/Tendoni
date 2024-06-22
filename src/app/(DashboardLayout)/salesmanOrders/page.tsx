"use client";
import PageContainer from "../components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import BlankCard from "../components/shared/BlankCard";
import { CardContent, Divider, Grid, Typography } from "@mui/material";
import { IconCalendarTime } from "@tabler/icons-react";
import useMediaQuery from "@mui/material/useMediaQuery";
import CommonDataGrid from "../components/dataGrid/CommonDataGrid";
import StatsView from "../components/stats/StatsView";

const SalesmanOrderPage = () => {
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <PageContainer title="SalesMan Orders" description="page">
      <StatsView title={'Salesman'} />
      <div style={{ paddingTop: "0.8rem" }}>
        {/* <CommonDataGrid columnDefinitions={columns} rows={rows} /> */}
      </div>
    </PageContainer>
  );
};

export default SalesmanOrderPage;
