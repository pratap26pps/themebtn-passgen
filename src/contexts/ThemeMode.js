
import { createContext,useContext } from "react";

const theme = createContext({
    // property of object
    themeMode:"light",
    // method
    lightTheme:()=>{},
    derkTheme:()=>{},

});

export const ThemeProvider=theme.Provider

export default function usetheme(){
    return  useContext(theme);
}