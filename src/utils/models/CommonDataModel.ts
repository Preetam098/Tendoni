import { GridColDef } from '@mui/x-data-grid';
import ProductCategoryModel from './ProductCategoryModel';

export default interface CommonDataModel {
  columns: GridColDef[];
  rows  : any[];
}
