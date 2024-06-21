"use client"
import PageContainer from "../components/container/PageContainer";
import useMediaQuery from "@mui/material/useMediaQuery";
import AsmViews from "../components/asmView/asmDetails";

const asmPage = () => {
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <PageContainer title="ASM" description="page">
      <AsmViews />
      <div style={{ paddingTop: "0.8rem" }}>
        {/* <CommonDataGrid columnDefinitions={columns} rows={rows} /> */}
      </div>
    </PageContainer>
  );
};

export default asmPage;
