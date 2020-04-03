import React, {forwardRef, useEffect} from "react";
import MaterialTable, {Icons} from "material-table";
import {IDataTableProps} from "../../types/IDataTable";

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import {debounce} from "../../utils/debounce";

export const tableIcons: Icons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref}/>),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref}/>),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref}/>),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref}/>),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref}/>),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref}/>),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref}/>),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref}/>),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref}/>),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref}/>),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref}/>),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref}/>),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref}/>)
};

export function BaseDataTable<RowData extends object>({
                                                        filterInputs,
                                                        dataSource,
                                                        ...rest
                                                      }: IDataTableProps<RowData>) {
  const filterParams = filterInputs.reduce<Record<string, any>>((previousValue, currentValue) => {
    if (currentValue) {
      previousValue[currentValue.name] = currentValue.value;
    }
    return previousValue;
  }, {}); // Ignored currently due to unclear pattern of backend filtering.
  const tableRef = React.useRef<MaterialTable<RowData>>();
  useEffect(debounce(() => {
    if (tableRef.current) {
      // @ts-ignore
      tableRef.current.onQueryChange(); // @ts-ignore because lack of annotation from MaterialTable d.ts
    }
  }, 300), [filterParams]);
  return (
    <MaterialTable<RowData>
      icons={tableIcons}
      data={async (query) => {
        let nextPage = query.page + 1; // page of MaterialTable is 0 indexed, different from general pattern.
        let pageSize = query.pageSize; // Ignored, because pagination pattern of backend is unable to determined now.
        let data = await dataSource.getAll();
        let filter = filterParams;
        return {
          data,
          page: 0,
          totalCount: data.length // Just for temporary testing.
        }
      }}
      tableRef={tableRef}
      {...rest}/>
  )

}
