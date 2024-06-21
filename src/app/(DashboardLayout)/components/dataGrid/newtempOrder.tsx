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
import { useRouter } from "next/navigation";
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import { randomId } from "@mui/x-data-grid-generator";
import VariantsID from "../../products/productVariants/variant";
import DeleteModal from "@/utils/models/CommonDeleteModel";
import { Switch } from "@mui/material";
import { IconEye } from "@tabler/icons-react";
import { DownloadOutlined } from "@mui/icons-material";
import { saveAs } from 'file-saver';

interface CommonDataGridProps {
  rowData: any;
  columnData: any[];
  setColumnRow?: (newModel: any) => void;
  postApi?: (newData: any) => void;
  putApi?: (editData: any) => void;
  deleteApi?: (deleteData: any) => void;
  showVisibilityIcon?: boolean;
  handleVisibilityClick?: (id: any) => void;
  hideEditButton?: boolean;
  hideDownloadButton?: boolean;
  setIsClose?: any;
  isClose?: any;
}
interface rowInterface {
  rowData: any;
}

interface EditToolbarProps {
  setRows: (newRows: rowInterface) => void;
  setRowModesModel: (newModel: any) => void;
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
  hideDownloadButton,
  setIsClose,
  isClose,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemIdToDelete, setItemIdToDelete] = useState<GridRowId | null>(null);
  const [newRowData, setNewRowData] = React.useState<any>(null);
  const [currentStatus, setCurrentStatus] = React.useState<any>(false);
  const handleVisibilityIconClick = (id: GridRowId) => () => {
    handleVisibilityClick(id); // Call the prop function
  };
  const headerData: HeaderData[] = columnData;
  const userInfo: Record<string, string> = {};
  headerData.forEach((item) => {
    userInfo[item.field] = "";
  });

  function EditToolbar(props: EditToolbarProps) {
    const { setRows, setRowModesModel } = props;

    const handleClick = () => {
      // console.log(userInfo, "userInfo");
      const id = randomId();
      const newRow = { id, ...userInfo, isNew: true };

      var CopysRows = [...rowData, newRow];

      setColumnRow((prev: any) => ({
        ...prev,
        rows: [...prev.rows, newRow],
      }));

      setColumnRow({ columns: [...columnData], rows: CopysRows });

      setRowModesModel((oldModel: any) => ({
        ...oldModel,
        [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
      }));
    };
  }

  const handleRowId = (row: any) => row.id;

  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );

  const handleRowEditStop = (updatedRowData: any) => {
    // Call your API to send the updated data to the backend
  };

  const handleEditClick =
    // newRow: object
    (id: GridRowId, isEdit: boolean) => () => {
      // const updatedRow = { ...newRow, isNew: currentStatus };

      setCurrentStatus(isEdit);
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

  const handleDownloadClick = (id: GridRowId) => async () => {
    try {
      // Fetch the file/data from server using the id
      const response = await fetch(`/api/download/${id}`); // Aapka API endpoint
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const blob = await response.blob();

      // Save the file using file-saver
      const filename =
        response.headers.get("Content-Disposition")?.split("filename=")[1] ??
        "downloadedFile";
      saveAs(blob, filename);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setIsClose(!isClose);
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rowData.find((row: any) => row.id === id);

    if (editedRow?.isNew) {
      // Handle canceling a new row
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

  const router = useRouter();
  const TableData = [
    // ...columns,
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
        if (!hideDownloadButton) {
          actions.push(
            <GridActionsCellItem
              icon={<DownloadOutlined />}
              label="Delete"
              onClick={handleDownloadClick(id)}
              color="inherit"
            />
          );
        }
        if (!hideDownloadButton) {
          actions.push(
            <GridActionsCellItem
              icon={<IconEye />}
              label="Show"
              onClick={() => router.push("/orders/orderDetails")}
              color="inherit"
            />
          );
        }
        if (!hideEditButton) {
          // Agar hideEditButton true hai, toh edit button ko chhupa den
          actions.unshift(
            <GridActionsCellItem
              icon={<EditIcon />}
              label="Edit"
              className="textPrimary"
              onClick={handleEditClick(id, true)}
              color="inherit"
            />
          );
        }

        // Conditionally add VisibilityOutlinedIcon based on showVisibilityIcon prop
        if (showVisibilityIcon) {
          actions.push(
            <GridActionsCellItem
              icon={<VisibilityOutlinedIcon />}
              label="Visibility"
              color="inherit"
              onClick={handleVisibilityIconClick(id)}
              // Handle the onClick event for visibility icon if needed
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
