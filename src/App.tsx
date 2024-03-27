import { useEffect, useReducer } from 'react'
import { appReducer, initialState } from './State/AppState'

import ContextMenu from './components/ContextMenu/ContextMenu'
import Dock from './components/Dock/Dock'
import dockItems from './components/Dock/DockItems'
import { menuItems, AppMenuItems } from './components/ContextMenu/ContextMenueItems'
import desktopItems from './components/Desktop/DesktopItems'
import Desktop from './components/Desktop/Desktop'
import './App.css'



function App() {
    const [state, dispatch] = useReducer(appReducer, initialState);

    useEffect(() => {
        const handleRightClick = (event: MouseEvent) => {
            event.preventDefault();
            dispatch({
                type: 'SHOW_CONTEXT_MENU',
                xPos: `${event.pageX}px`,
                yPos: `${event.pageY}px`,
            });
        };

        const handleClick = () => {
            state.contextMenu.visible && dispatch({ type: 'HIDE_CONTEXT_MENU' });
        };

        document.addEventListener('contextmenu', handleRightClick);
        document.addEventListener('click', handleClick);


        return () => {
            document.removeEventListener('contextmenu', handleRightClick);
            document.removeEventListener('click', handleClick);
        };


    }, [state.contextMenu.visible]);


    return (
        <div className='App'>
            {state.contextMenu.visible && (
                <ContextMenu
                    xPos={state.contextMenu.xPos}
                    yPos={state.contextMenu.yPos}
                    menuItems={state.selectedItem ? AppMenuItems : menuItems}
                />
            )}
            <Desktop items={desktopItems} />
            <Dock items={dockItems} />
        </div>
    )
}

export default App
