import React, {useState} from "react";
import {IDataTableFilterOutput, IDataTableFilterProps} from "../../types/IDataTable";
import {DatePicker} from "@material-ui/pickers";
import {MaterialUiPickersDate} from "@material-ui/pickers/typings/date";
import {Moment} from "moment";

export function useDateFilter(props: IDataTableFilterProps): [
  IDataTableFilterOutput,
  React.ReactNode
] {
  const [selectedDate, setDate] = useState<Moment | null>(null);

  if (selectedDate) {
    selectedDate.hour(0);
    selectedDate.minute(0);
    selectedDate.second(0);
  }

  return [
    {
      name: props.name,
      value: selectedDate ? selectedDate.toISOString() : '' // convert to UTC directly.
    },
    (
      <>
        <DatePicker
          value={selectedDate}
          onChange={(date: MaterialUiPickersDate) => setDate(date)}
          autoOk
          variant="inline"
          inputVariant="outlined"
          label={props.placeholder}
          format="yyyy/MM/DD"
          style={{
            width: '100%'
          }}
          // clearable
          // inputProps={{
          //   endAdornment: (
          //     <InputAdornment position="end">
          //       <IconButton
          //         onClick={() => setDate(moment())}
          //       >
          //         today
          //       </IconButton>
          //     </InputAdornment>
          //   ),
          // }}
        />
      </>
    )
  ]
}
