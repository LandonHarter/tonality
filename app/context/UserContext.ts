import { createContext } from "react";
import { User } from "../backend/types";

const UserContext = createContext<User | null>(null);
export default UserContext;