import { DesktopItem } from '../types/Item'
import { writeDesktopItem } from '../Async/AsyncTask'

export type AppState = {
    contextMenu: {
        visible: boolean
        xPos: string
        yPos: string
    }
    wallpaperMenu: {
        visible: boolean
        xPos: string
        yPos: string
    }
    selectedItem: DesktopItem[] | null
    renderedApps: DesktopItem[]
}

export type AppAction =
    | { type: 'SHOW_CONTEXT_MENU'; xPos: string; yPos: string }
    | { type: 'HIDE_CONTEXT_MENU' }
    | { type: 'SELECTED_ITEM'; item: DesktopItem }
    | { type: 'DESELECT_ITEMS' }
    | { type: 'SHOW_WALLPAPER_MENU'; xPos: string; yPos: string }
    | { type: 'HIDE_WALLPAPER_MENU' }
    | { type: 'UPDATE_ITEM_NAME'; item: DesktopItem; name: string }
    | { type: 'ADD_ITEM'; item: DesktopItem}

export const initialState: AppState = {
    contextMenu: {
        visible: false,
        xPos: '0px',
        yPos: '0px',
    },
    wallpaperMenu: {
        visible: false,
        xPos: '0px',
        yPos: '0px',
    },
    selectedItem: [],
    renderedApps: []
}

export const appReducer = (state: AppState, action: AppAction): AppState => {
    switch (action.type) {
        case 'SHOW_CONTEXT_MENU':
            return {
                ...state,
                contextMenu: { visible: true, xPos: action.xPos, yPos: action.yPos },
            }
        case 'HIDE_CONTEXT_MENU':
            return { ...state, contextMenu: { ...state.contextMenu, visible: false } }
        case 'SELECTED_ITEM':
            return {
                ...state,
                selectedItem: state.selectedItem
                    ? [...state.selectedItem, action.item]
                    : [action.item],
            }
        case 'DESELECT_ITEMS':
            return {
                ...state,
                selectedItem: null,
            }
        case 'SHOW_WALLPAPER_MENU':
            return {
                ...state,
                wallpaperMenu: { visible: true, xPos: action.xPos, yPos: action.yPos },
            }
        case 'HIDE_WALLPAPER_MENU':
            return { ...state, wallpaperMenu: { ...state.wallpaperMenu, visible: false } }
        case 'UPDATE_ITEM_NAME':
            writeDesktopItem('from_test', action.item)
            return {
                ...state,
                selectedItem: state.selectedItem
                    ? state.selectedItem.map((item) => {
                          if (item.id === action.item.id) {
                              return {
                                  ...item,
                                  name: action.name,
                              }
                          }
                          return item
                      })
                    : state.selectedItem,
            }

       case 'ADD_ITEM':
            // eslint-disable-next-line no-case-declarations
            const itemExists = state.renderedApps?.some((item) => item.id === action.item.id);
            console.log("ADDED ITEM ", itemExists)
            if (!itemExists) {
                console.log(
                    {...state,
                    renderedApps: [...state.renderedApps , action.item]
                })
                return {
                    ...state,
                    renderedApps: [...state.renderedApps , action.item]
                };
            }
            return state;

        default:
            return state
    }
}
