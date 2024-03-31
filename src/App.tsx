import { useEffect, useReducer, useState } from 'react'
import { appReducer, initialState } from './State/AppState'
import ContextMenu from './components/ContextMenu/ContextMenu'
import { menuItems, AppMenuItems } from './components/ContextMenu/ContextMenueItems'
import dockItems from './components/Dock/DockItems'
import Dock from './components/Dock/Dock'
import Desktop from './components/Desktop/Desktop'
import LoadingScreen from './components/LoadingScreen/LoadingScreen'
import AsyncTaskManager from './Async/AsyncTaskManager'
import { fetchData } from './Async/AsyncTask'
import './App.css'
import DebugMenu from './Debug/Debug'
import { readDesktopItems } from './Async/AsyncTask'
import { DesktopItem } from './types/Item'

function App() {
    const [state, dispatch] = useReducer(appReducer, initialState)
    const [showLoading, setShowLoading] = useState(true)
    const [progress, setProgress] = useState(0)

    // Fetch async data
    useEffect(() => {
        async function loadAsyncTasks() {
            try {
                const taskManager = new AsyncTaskManager()
                taskManager.addTask(fetchData, 'TestFetchData')
                taskManager.addTask(async () => {
                    const desktopItems = readDesktopItems()
                    return desktopItems
                }, 'ReadDesktopItemsTask')

                // Execute tasks
                taskManager
                    .executeTasks()
                    .then((results) => {
                        // const desktopItemsResult = results['ReadDesktopItemsTask'] // Access result of readDesktopItems task
                        state.selectedItem = results['ReadDesktopItemsTask'] as DesktopItem[]
                        console.log('Desktop Items Result:', state.selectedItem)
                        setShowLoading(false) // Hide loading screen after tasks are executed
                    })
                    .catch((error) => {
                        console.error('Error executing tasks:', error)
                        setShowLoading(false) // Hide loading screen if there's an error
                    })
            } catch (error) {
                console.error('Error loading async tasks:', error)
                setShowLoading(false) // Hide loading screen if there's an error
            }
        }
        loadAsyncTasks()
    }, [])

    // Loading Bar
    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prevProgress) => {
                const randomIncrement = Math.floor(Math.random() * 16) - 5
                let newProgress = prevProgress + randomIncrement
                newProgress = Math.min(Math.max(newProgress, 0), 100)
                return newProgress
            })
        }, 500)

        return () => clearInterval(interval)
    }, [])

    // Right Click
    useEffect(() => {
        const handleRightClick = (event: MouseEvent) => {
            event.preventDefault()
            dispatch({
                type: 'SHOW_CONTEXT_MENU',
                xPos: `${event.pageX}px`,
                yPos: `${event.pageY}px`,
            })
        }

        const handleClick = () => {
            state.contextMenu.visible && dispatch({ type: 'HIDE_CONTEXT_MENU' })
        }

        document.addEventListener('contextmenu', handleRightClick)
        document.addEventListener('click', handleClick)

        return () => {
            document.removeEventListener('contextmenu', handleRightClick)
            document.removeEventListener('click', handleClick)
        }
    }, [state.contextMenu.visible])

    return (
        <div className='App'>
            <LoadingScreen show={showLoading} progress={progress} />

            {!showLoading && (
                <>
                    {state.contextMenu.visible && (
                        <ContextMenu
                            xPos={state.contextMenu.xPos}
                            yPos={state.contextMenu.yPos}
                            menuItems={state.selectedItem ? AppMenuItems : menuItems}
                        />
                    )}
                    <Desktop items={state.selectedItem || null} />
                    <Dock items={dockItems} />
                    <DebugMenu />
                </>
            )}
        </div>
    )
}

export default App
