// FullFeaturedCrudGrid.tsx

import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import {
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowId,
} from "@mui/x-data-grid";
import DeleteModal from "@/utils/models/CommonDeleteModel";
import { useRouter } from "next/navigation";
import axios from "axios";
import apiBaseUrl from "@/utils/apis";
import { getAllUsers } from "@/utils/apis/Users";
import { getAllRole } from "@/utils/apis/Role";

interface CommonDataGridProps {
  rowData: any;
  columnData: any[];
  setColumnRow: (newModel: any) => void;
  postApi: (newData: any) => void;
  putApi: (editData: any) => void;
  deleteApi: (deleteData: any) => void;
  showVisibilityIcon: boolean;
  handleVisibilityClick: (id: any) => void;
  hideEditButton: boolean;
  hideDeleteButton: boolean;
  setIsClose: any;
  isClose: any;
}

interface HeaderData {
  field: string;
  headerName: string;
  flex: number;
  editable: boolean;
  align?: string;
  headerAlign?: string;
}

const FullFeaturedCrudGrid: React.FC<CommonDataGridProps> = ({
  rowData,
  columnData,
  setColumnRow,
  postApi,
  putApi,
  deleteApi,
  showVisibilityIcon,
  handleVisibilityClick,
  hideEditButton,
  hideDeleteButton,
  setIsClose,
  isClose,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemIdToDelete, setItemIdToDelete] = useState<GridRowId | null>(null);
  const [newRowData, setNewRowData] = React.useState<any>(null);
  const [currentStatus, setCurrentStatus] = React.useState<any>(false);
  const handleVisibilityIconClick = (id: GridRowId) => () => {
    handleVisibilityClick(id);
  };
  const headerData: HeaderData[] = columnData;
  const userInfo: Record<string, string> = {};
  headerData.forEach((item) => {
    userInfo[item.field] = "";
  });
  const router = useRouter();

  function EditToolbar() {
    const router = useRouter();

    return (
      <GridToolbarContainer>
        {!hideEditButton ? (
          <>
            <Button
              onClick={() => router.push("/permission")}
              color="primary"
              startIcon={<AddIcon />}
            >
              Create Role
            </Button>
          </>
        ) : (
          ""
        )}
      </GridToolbarContainer>
    );
  }

  const handleRowId = (row: any) => row.id;

  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );

  const handleRowEditStop = (updatedRowData: any) => {};

  const handleEditClick = (id: GridRowId) => () => {
    router.push(`/roleUpdate/${id}`);
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    setIsModalOpen(true);

    setItemIdToDelete(id);
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setIsClose(!isClose);
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rowData.find((row: any) => row.id === id);

    if (editedRow?.isNew) {
      setColumnRow((oldModel: any) => ({
        ...oldModel,
        rows: oldModel.rows.filter((row: any) => row.id !== id),
      }));
    }
  };

  const processRowUpdate = (newRow: any) => {
    const updatedRow = { ...newRow };
    var copyrows = [...rowData, updatedRow];
    if (newRow.isNew == true) {
      postApi(updatedRow);
    } else {
      putApi(updatedRow);
    }

    return updatedRow;
  };

  const handleSaveClick = (id: GridRowId, isEdit: boolean) => () => {
    setCurrentStatus(isEdit);

    const newRow = newRowData;

    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {};

  const columns: GridColDef[] = columnData;

  const TableData = [
    ...(columns || []),
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      flex: 1,
      cellClassName: "actions",
      getActions: ({ id }: any) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id, true)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }
        const actions = [];
        if (!hideDeleteButton) {
          actions.push(
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Delete"
              onClick={handleDeleteClick(id)}
              color="inherit"
            />
          );
        }
        if (!hideEditButton) {
          actions.unshift(
            <GridActionsCellItem
              icon={<EditIcon />}
              label="Edit"
              className="textPrimary"
              onClick={handleEditClick(id)}
              color="inherit"
            />
          );
        }

        if (showVisibilityIcon) {
          actions.push(
            <GridActionsCellItem
              icon={<VisibilityOutlinedIcon />}
              label="Visibility"
              color="inherit"
              onClick={handleVisibilityIconClick(id)}
            />
          );
        }

        return actions;
      },
    },
  ];

  return (
    <Box>
      <DataGrid
        rows={rowData}
        columns={TableData}
        editMode="row"
        getRowId={handleRowId}
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setColumnRow, setRowModesModel },
        }}
      />
      {!rowData || (rowData.length === 0 && <p>No data available</p>)}

      <DeleteModal
        open={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        deleteAction={() => {
          if (itemIdToDelete) {
            deleteApi(itemIdToDelete);
            setIsModalOpen(false);
          }
        }}
      />
    </Box>
  );
};

export default FullFeaturedCrudGrid;
