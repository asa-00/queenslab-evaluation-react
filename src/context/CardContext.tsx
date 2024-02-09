import { createContext } from "react"
import { initialCardState } from "./initialCardState"

type CardContextProviderProps = {
    children: React.ReactNode
}

export const CrediCardContext = createContext(initialCardState);

export const CardContextProvider = ({ children }: CardContextProviderProps ) => {
    return <CrediCardContext.Provider  value={initialCardState}>{children}</CrediCardContext.Provider>
}