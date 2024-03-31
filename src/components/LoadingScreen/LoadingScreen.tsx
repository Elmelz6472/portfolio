// LoadingScreen.tsx
import React from 'react'
import './LoadingScreen.css' // Import CSS for styling

interface LoadingScreenProps {
    show: boolean
    progress: number // Progress value (0-100)
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ show, progress }) => {
    if (!show) {
        return null // Return null if show is false
    }

    return (
        <div className='loading-screen'>
            <div className='loading-container'>
                <h1 className='loading-text'>Loading...</h1>
                <div className='loading-bar'>
                    <div
                        className='loading-progress'
                        style={{ width: `${progress}%` }} // Set width based on progress
                    ></div>
                </div>
                <div className='loading-percent'>{`${progress}%`}</div>
            </div>
        </div>
    )
}

export default LoadingScreen
