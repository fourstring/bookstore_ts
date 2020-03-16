import React, {useState} from 'react';
import {ThemeProvider} from '@material-ui/core/styles';
import './App.css';
import {lightTheme, ThemeSetterContext} from "./jss/themes";
import {Theme} from "@material-ui/core";
import {Router} from "./router";
import {UserContext} from "./contexts/UserContext";
import {IUser} from "./types/IUser";


function App() {
  const [theme, setTheme] = useState<Theme>(lightTheme);
  const [user, setUser] = useState<IUser | null>(null);

  return (
    <ThemeProvider theme={theme}>
      <ThemeSetterContext.Provider value={setTheme}>
        <UserContext.Provider value={{user, setUser}}>
          <Router/>
        </UserContext.Provider>
      </ThemeSetterContext.Provider>
    </ThemeProvider>
  )
}

export default App;
