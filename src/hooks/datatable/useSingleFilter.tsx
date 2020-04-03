import React, {useState} from "react";
import {IDataTableFilterOutput, IDataTableFilterProps} from "../../types/IDataTable";
import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import {useFilterOptions} from "./useFilterOptions";

export function useSingleFilter(props: IDataTableFilterProps) {
  const [selectedOption, setSelected] = useState<IDataTableFilterOutput | null>({name: props.name, value: ""}); // Use Output interface deliberately.
  const options = useFilterOptions(props.optionFetcher);

  function SingleFilterComponent() {
    return (
      <FormControl style={{width: "100%"}}>
        <InputLabel id={`${props.name}-helper`}>{props.placeholder}</InputLabel>
        <Select
          onChange={(event => setSelected(
            {
              name: props.name,
              value: event.target.value as string // Item in Select will be converted into string.
            }
          ))}
          value={selectedOption?.value}
          labelId={`${props.name}-helper`}
          variant={"outlined"}
          style={{width: "100%"}}
        >
          <MenuItem value={""}>无筛选</MenuItem>
          {
            options && options.map(option =>
              <MenuItem value={option.value.toString()} key={option.label}>{option.label}</MenuItem>
            )
          }
        </Select>
      </FormControl>
    )
  }

  return [selectedOption, (
    <FormControl style={{width: "100%"}}>
      <InputLabel id={`${props.name}-helper`}>{props.placeholder}</InputLabel>
      <Select
        onChange={(event => setSelected(
          {
            name: props.name,
            value: event.target.value as string // Item in Select will be converted into string.
          }
        ))}
        value={selectedOption?.value}
        labelId={`${props.name}-helper`}
        variant={"outlined"}
        style={{width: "100%"}}
      >
        <MenuItem value={""}>无筛选</MenuItem>
        {
          options && options.map(option =>
            <MenuItem value={option.value.toString()} key={option.label}>{option.label}</MenuItem>
          )
        }
      </Select>
    </FormControl>
  )];
}
