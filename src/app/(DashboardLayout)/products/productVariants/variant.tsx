import React, { useRef, useState } from "react";
import PageContainer from "../../components/container/PageContainer";
import DashboardCard from "../../components/shared/DashboardCard";
import FullFeaturedCrudGrid from "../../components/dataGrid/newtemp";
import {
  deleteCurrentVariant,
  getVariant,
  postCurrentVariant,
  putCurrentVariant,
  putStatusChangeCurrentVariant,
} from "@/utils/apis/current_variant";
import CommonDataModel from "@/utils/models/CommonDataModel";
import CloseIcon from "@mui/icons-material/Close";
import { GridColDef } from "@mui/x-data-grid";
import { Box, Button, Switch, ToggleButton } from "@mui/material";
import { green, grey } from "@mui/material/colors";
import Snackers from "@/utils/models/Snackers";

const VariantCurrent = ({ id, onClose }: { id: any; onClose: () => void }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [columnRow, setColumnRow] = useState<any>([]);

  const currentVariantColumnDefinition: GridColDef[] = [
    {
      field: "variantName",
      headerName: "variantName",
      flex: 1,
      editable: true,
      align: "left",
      headerAlign: "left",
    },
    // { field: "id", headerName: "id", flex: 1, editable: true },

    {
      field: "status",
      headerName: "Status",
      align: "left",
      headerAlign: "left",
      editable: true,

      flex: 1,
      renderCell: (params: any) => {
        if (params.id !== undefined) {
          return (
            <Switch
              checked={params.row.status === "Active"}
              onChange={(event) => {
                const newStatus = event.target.checked ? "Active" : "Inactive";
                // Update the status via API call
                putStatusChangeCurrentVariant(params.row.id, newStatus)
                  .then((response) => {
                    setSnackbarOpen(true);
                    setRequest(!request);
                    setMessage(response.message);
                  })
                  .catch((error) => {
                    setSnackbarOpen(true);
                    setRequest(!request);
                    setMessage(error);
                  });
              }}
              color="primary"
              inputProps={{ "aria-label": "primary checkbox" }}
            />
          );
        } else {
          return null;
        }
      },
      renderEditCell: (params: any) => {
        params.checked = params.formattedValue === "Active";
        return (
          <Switch
            checked={params.checked}
            onChange={(event) => {
              handleSwitchChange(event, params.row);
            }}
            color="primary"
            inputProps={{ "aria-label": "primary checkbox" }}
          />
        );
      },
    },
  ];
  const [request, setRequest] = useState<boolean>();
  const [isClose, setIsClose] = useState(false);

  const [allCurrentVariants, setCurrentVariant] = useState<CommonDataModel>({
    columns: currentVariantColumnDefinition,
    rows: columnRow,
  });

  //   const [allProductVariants, setCurrentVariant] = useState<CommonDataModel>({
  //     columns: productVariantColumnDefinition,
  //     rows: columnRow,
  //   });

  var handleSwitchChange = (event: any, row: any) => {
    const newStatus = event.target.checked ? "Active" : "Inactive";

    setCurrentVariant((prev) => ({
      ...prev,
      rows: prev.rows.map((r) =>
        r.id === row.id ? { ...r, status: newStatus } : r
      ),
    }));
  };
  const CurrentVariant = (newData: any) => {
    const foundObject = allCurrentVariants.rows.find(
      (obj) => obj.id === newData.id
    );
    foundObject.variantName = newData.variantName;
    foundObject.status =
      foundObject.status == "" ? "Inactive" : foundObject.status;
    postCurrentVariant(foundObject, id)
      .then((response) => {
        // console.log(response, "responseresponse");
        setSnackbarOpen(true);
        setRequest((prevRequest) => !prevRequest);
        setMessage(response.message);
      })
      .catch((error) => {
        setSnackbarOpen(true);
        setRequest((prevRequest) => !prevRequest);
        setMessage(error);
        // console.error("Error posting product variant:", error);
      });
  };
  const putCurrentVariantKey = (newData: any) => {
    const foundObject = allCurrentVariants.rows.find(
      (obj) => obj.id === newData.id
    );
    foundObject.variantName = newData.variantName;
    foundObject.status =
      foundObject.status == "" ? "Inactive" : foundObject.status;
    putCurrentVariant(foundObject, id)
      .then((response) => {
        // console.log(response, "responseresponse");
        setSnackbarOpen(true);
        setRequest((prevRequest) => !prevRequest);
        setMessage(response.message);
      })
      .catch((error) => {
        setSnackbarOpen(true);
        setRequest((prevRequest) => !prevRequest);
        setMessage(error);
        // console.error("Error posting product variant:", error);
      });
  };
  const deleteCurrentVariantKey = (data: any) => {
    deleteCurrentVariant(data, id).then((value) => {
      setRequest((prevRequest) => !prevRequest);
      setSnackbarOpen(true);
      setMessage("Delete Successfully ");
    });
  };

  const closeSnacker = () => {
    setSnackbarOpen(false);
  };
  React.useEffect(() => {
    getVariant(id).then?.((productVariant) => {
      var data: any = [];
      for (let i = 0; i < productVariant?.length; i++) {
        const element = {
          id: productVariant[i].valueId,
          variantName: productVariant[i].valueName,
          status: productVariant[i].status,
        };
        data.push(element);
      }
      setCurrentVariant({
        columns: currentVariantColumnDefinition,
        rows: data,
      });
      setCurrentVariant((prev) => ({
        ...prev,
        rows: data,
      }));
      setColumnRow(data);
    });
  }, [request, isClose]);
  const handleVisibilityClick = () => {};
  return (
    <>
      <PageContainer title="Variants " description="Variants">
        <Snackers
          open={snackbarOpen}
          closeSnacker={closeSnacker}
          message={message}
        />
        <DashboardCard title="Variants">
          <Box>
            <div style={{ display: "flex", justifyContent: "end" }}>
              <CloseIcon onClick={onClose} style={{ cursor: "pointer" }} />
            </div>
            <FullFeaturedCrudGrid
              rowData={allCurrentVariants.rows}
              columnData={allCurrentVariants.columns}
              setColumnRow={setCurrentVariant}
              postApi={CurrentVariant}
              putApi={putCurrentVariantKey}
              deleteApi={deleteCurrentVariantKey}
              setIsClose={setIsClose}
              isClose={isClose}
              hideEditButton={false}
              hideDeleteButton={false}
              handleVisibilityClick={handleVisibilityClick}
              showVisibilityIcon={false}
            />

            {/* <FullFeaturedCrudGridDemo /> */}
          </Box>
        </DashboardCard>
      </PageContainer>
    </>
  );
};
export default VariantCurrent;
