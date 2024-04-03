import { useEffect, useReducer, useState } from 'react'
import { appReducer, initialState } from './State/AppState'
import ContextMenu from './components/ContextMenu/ContextMenu'
import { menuItems, AppMenuItems } from './components/ContextMenu/ContextMenueItems'
import dockItems from './components/Dock/DockItems'
import Dock from './components/Dock/Dock'
import Desktop from './components/Desktop/Desktop'
import LoadingScreen from './components/LoadingScreen/LoadingScreen'
import AsyncTaskManager from './Async/AsyncTaskManager'
import { fetchData, writeDesktopItem } from './Async/AsyncTask'
import './App.css'
import DebugMenu from './Debug/Debug'
import { readDesktopItems } from './Async/AsyncTask'
import desktopItems from './components/Desktop/DesktopItems'

function App() {
    const [state, dispatch] = useReducer(appReducer, initialState)
    const [showLoading, setShowLoading] = useState(true)
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        desktopItems.forEach((desktopItem) => {
            writeDesktopItem(desktopItem.name, desktopItem)
            dispatch({ type: 'ADD_ITEM', item: desktopItem })
        })

        console.log(state.renderedApps)
    }, [state.renderedApps])

    // Fetch async data
    useEffect(() => {
        async function loadAsyncTasks() {
            try {
                const taskManager = new AsyncTaskManager()
                taskManager.addTask(fetchData, 'TestFetchData')
                taskManager.addTask(async () => {
                    const desktopItems = readDesktopItems('untitled folder')
                    return desktopItems
                }, 'ReadDesktopItemsTask')

                // Execute tasks
                taskManager
                    .executeTasks()
                    .then((results) => {
                        // state.selectedItem = results['ReadDesktopItemsTask'] as DesktopItem[]
                        setShowLoading(false)
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
                            menuItems={menuItems}
                        />
                    )}
                    <Desktop items={state.renderedApps} />
                    <Dock items={dockItems} />
                    <DebugMenu />
                </>
            )}
        </div>
    )
}

export default App
