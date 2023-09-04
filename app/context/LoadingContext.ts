import { createContext } from "react";

const LoadingContext = createContext<{
    startLoading: () => void;
    stopLoading: () => void;
}>({
    startLoading: () => { },
    stopLoading: () => { },
});
export default LoadingContext;