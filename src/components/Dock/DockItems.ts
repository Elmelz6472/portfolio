import { DockItem } from '../../types/DockItem'


const dockItems: DockItem[] = [
    {
        id: '1',
        icon: 'folder.png',
        label: 'Finder',
        onClick: () => {
            console.log('Finder clicked')
        },
    },
    {
        id: '2',
        icon: 'terminal.png',
        label: 'Terminal',
        onClick: () => {
            console.log('Terminal clicked')
        },
    },
]

export default dockItems;