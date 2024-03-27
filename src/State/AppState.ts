import { DesktopItem } from "../types/Item";

export type AppState = {
  contextMenu: {
    visible: boolean;
    xPos: string;
    yPos: string;
  };
  wallpaperMenu: {
    visible: boolean;
    xPos: string;
    yPos: string
  }
  selectedItem: DesktopItem[] | null
}

export type AppAction =
  | { type: 'SHOW_CONTEXT_MENU'; xPos: string; yPos: string }
  | { type: 'HIDE_CONTEXT_MENU' }
  | { type: 'SELECTED_ITEM'; item: DesktopItem}
  | { type: 'DESELECT_ITEMS'}
  | { type: 'SHOW_WALLPAPER_MENU'; xPos: string; yPos: string}
  | { type: 'HIDE_WALLPAPER_MENU'};



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
  selectedItem: null
};


export const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SHOW_CONTEXT_MENU':
      return {
        ...state,
        contextMenu: { visible: true, xPos: action.xPos, yPos: action.yPos },
      };
    case 'HIDE_CONTEXT_MENU':
      return { ...state, contextMenu: { ...state.contextMenu, visible: false } };
    case 'SELECTED_ITEM':
      return {
        ...state,
        selectedItem: state.selectedItem ? [...state.selectedItem, action.item] : [action.item],
      };
    case 'DESELECT_ITEMS':
        return {
            ...state,
            selectedItem: null
        }
    case 'SHOW_WALLPAPER_MENU':
        return {
            ...state,
            wallpaperMenu: { visible: true, xPos: action.xPos, yPos: action.yPos}
        }
    case 'HIDE_WALLPAPER_MENU':
        return {...state, wallpaperMenu: {...state.wallpaperMenu, visible: false}}
      default:
        return state;
  }
};