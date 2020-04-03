import {MaterialTableProps} from "material-table";
import {EntityService} from "../services/ServiceInterfaces";

export interface IDataTableFilterOption {
  label: string;
  value: string | number;
}

export interface IDataTableFilterProps {
  name: string;
  placeholder?: string;
  optionFetcher: () => Promise<IDataTableFilterOption[]>;
}

export interface IDataTableFilterOutput {
  name: string;
  value: string | string[];
}

export type useFilterResult = [IDataTableFilterOutput | null, JSX.Element];

export interface _IDataTableProps<RowData extends object> extends MaterialTableProps<RowData> {
  filterInputs: Array<IDataTableFilterOutput | null>;
  dataSource: EntityService<RowData>;
}

export type IDataTableProps<RowData extends object> = Omit<_IDataTableProps<RowData>, 'data' | 'icons' | 'tableRef'>;
