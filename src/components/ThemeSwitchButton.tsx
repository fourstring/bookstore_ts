import React, {useContext} from "react";
import {darkTheme, lightTheme, ThemeSetterContext} from "../jss/themes";
import {IconButton, useTheme} from "@material-ui/core";
import InvertColorsIcon from '@material-ui/icons/InvertColors';

export function ThemeSwitchButton() {
  const theme = useTheme();
  const themeSetter = useContext(ThemeSetterContext);

  function handleThemeSwitch() {
    if (Object.is(theme, lightTheme))
      themeSetter(darkTheme);
    else
      themeSetter(lightTheme);
  }

  return (
    <IconButton onClick={handleThemeSwitch}>
      <InvertColorsIcon/>
    </IconButton>
  )
}
