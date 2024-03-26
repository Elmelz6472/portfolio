import { useState, useEffect } from 'react'
import ContextMenu from './components/ContextMenu/ContextMenu'
import Dock from './components/Dock/Dock'
import dockItems from './components/Dock/DockItems'
import menuItems from './components/ContextMenu/ContextMenueItems'
import './App.css'

function App() {
    const [contextMenu, setContextMenu] = useState({ visible: false, xPos: '0px', yPos: '0px' })

    useEffect(() => {
        const handleRightClick = (event: MouseEvent) => {
            event.preventDefault()
            setContextMenu({
                visible: true,
                xPos: `${event.pageX}px`,
                yPos: `${event.pageY}px`,
            })
        }

        const handleClick = () => {
            contextMenu.visible && setContextMenu({ ...contextMenu, visible: false })
        }

        document.addEventListener('contextmenu', handleRightClick)
        document.addEventListener('click', handleClick)

        return () => {
            document.removeEventListener('contextmenu', handleRightClick)
            document.removeEventListener('click', handleClick)
        }
    }, [contextMenu])

    return (
        <div className='App'>
            {contextMenu.visible && (
                <ContextMenu
                    xPos={contextMenu.xPos}
                    yPos={contextMenu.yPos}
                    menuItems={menuItems}
                />
            )}
            <Dock items={dockItems} />
        </div>
    )
}

export default App
