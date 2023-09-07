import { createContext } from "react";

export const SelectedTabContext = createContext({
    tab: 0,
    setTab: (tab: number) => { }
});
export default SelectedTabContext;