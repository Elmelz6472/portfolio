import React, { useCallback, useEffect, useReducer, useState } from 'react'
import { appReducer, initialState } from '../State/AppState'

const DebugMenu: React.FC = () => {
    const [state] = useReducer(appReducer, initialState)
    const [isVisible, setIsVisible] = useState(false)

    const handleKeyPress = useCallback(
        (event: KeyboardEvent) => {
            if (event.key === 'q' || event.key === 'Q') {
                setIsVisible(!isVisible)
            }
        },
        [isVisible],
    )

    const renderDebugMenu = () => {
        return (
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    right: 0,
                    padding: '10px',
                    background: 'white',
                    zIndex: 10999,
                }}
            >
                <h2>Debug Menu</h2>
                <pre>{JSON.stringify(state, null, 2)}</pre>
            </div>
        )
    }

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress)
        return () => {
            window.removeEventListener('keydown', handleKeyPress)
        }
    }, [handleKeyPress])

    return isVisible ? renderDebugMenu() : null
}

export default DebugMenu
