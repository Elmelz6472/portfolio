import { useReducer } from "react"
import desktopItems from "../components/Desktop/DesktopItems"
import { appReducer, initialState } from "../State/AppState"
import { writeDesktopItem } from "./AsyncTask"

export const SetupItems = () => {
    const [, dispatch] = useReducer(appReducer, initialState)

    desktopItems.map((desktopItem): void => {
        writeDesktopItem(desktopItem.name, desktopItem)
        dispatch({ type: 'ADD_ITEM', item: desktopItem })
    })
    return <></>
}