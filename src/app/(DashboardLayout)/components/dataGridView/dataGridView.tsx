"use client";
import * as React from 'react';
import {TextField, Grid, Box, Button } from "@mui/material";
import { DataGrid, GridRowsProp, GridRowModesModel, GridToolbarContainer, GridColDef, GridRowModes, GridRowId, GridActionsCellItem, GridRowModel, GridEventListener, GridRowEditStopReasons,} from "@mui/x-data-grid";
import { randomId } from '@mui/x-data-grid-generator';
import CommonDataModel from '@/utils/models/CommonDataModel';

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';

interface CommonDataGridProps{
    rowData: any[];
    columnData: any[];
    dataModel?: CommonDataModel;
    onRowClick?: (params: any) => void;
}

interface EditToolbarProps {
    setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
    setRowModesModel: (
      newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
    ) => void;
}

function EditToolbar(props: EditToolbarProps) {
    const { setRows, setRowModesModel } = props;
  
    const handleClick = () => {
      const id = randomId();
      setRows((oldRows) => [...oldRows, { id, categoryName: '', categoryImages: '', isNew: true }]);
      setRowModesModel((oldModel) => ({
        ...oldModel,
        [id]: { mode: GridRowModes.Edit, fieldToFocus: 'categoryName' },
      }));
    };
  
    return (
      <GridToolbarContainer>
        <Button color="primary" variant='outlined' startIcon={<AddIcon />} onClick={handleClick}>
          Add record
        </Button>
      </GridToolbarContainer>
    );
}

const DataGridView : React.FC<CommonDataGridProps> = ({ rowData, columnData, onRowClick }) => {
    const [rows, setRows] = React.useState(rowData);
    const editing: GridColDef =
    {
        field: 'actions',
        type: 'actions',
        headerName: 'Actions',
        width: 100,
        cellClassName: 'actions',
        getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
            return [
            <GridActionsCellItem
                icon={<SaveIcon />}
                label="Save"
                sx={{
                color: 'primary.main',
                }}
                onClick={handleSaveClick(id)}
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

        return [
            <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
            />,
            <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
            />,
        ];
        },
    };
    columnData.push(editing);

    const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
          event.defaultMuiPrevented = true;
        }
      };

    const handleEditClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };
    
    const handleSaveClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };
    
    const handleDeleteClick = (id: GridRowId) => () => {
        setRows(rows.filter((row) => row.id !== id));
    };
    
    const handleCancelClick = (id: GridRowId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });
    
        const editedRow = rows.find((row) => row.id === id);
            if (editedRow!.isNew) {
                setRows(rows.filter((row) => row.id !== id));
            }
    };
    
    const processRowUpdate = (newRow: GridRowModel) => {
        const updatedRow = { ...newRow, isNew: false };
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };
    
    const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };


    const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
 
      return (
        <Box sx={{ height: 300, width: "100%" }}>
            <DataGrid 
                rows={rowData}
                columns={columnData}
                editMode="row"
                onRowClick={onRowClick}
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                slots={{ toolbar: EditToolbar }}
                slotProps={{
                    toolbar: { setRows, setRowModesModel },
                  }}
            />
        </Box>
    );
};

export default DataGridView;