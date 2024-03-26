import Dock from './components/Dock/Dock'
import { DockItem } from './types/DockItem'
import './App.css'


const dockItems: DockItem[] = [
    {
        id: '1',
        icon: 'first_app.png',
        label: 'Photoshop',
        onClick: () => {
            console.log('Application 1 clicked')
        },
    },
    {
        id: '2',
        icon: 'first_app.png',
        label: 'Photoshop',
        onClick: () => {
            console.log('Application 1 clicked')
        },
    }
]

function App() {
    return (
        <div className='App'>
            <img src="/background.png" alt="Background" className="background-image" />
            <Dock items={dockItems} />
        </div>
    )
}

export default App
