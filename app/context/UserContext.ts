import { createContext } from "react";
import { User } from "../backend/types";

const UserContext = createContext<{ user: User | null, updateUser: Function }>({
    user: null,
    updateUser: () => { }
});
export default UserContext;