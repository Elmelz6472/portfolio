import { DesktopItem } from '../../types/Item'

const desktopItems: DesktopItem[] = [
    {
        id: '1',
        name: 'Terminal',
        icon: '/terminal.png',
        onClick: () => {
            console.log('Item 1 clicked')
        },
    },
    {
        id: '2',
        name: 'untitled folder',
        icon: '/folder.png',
        onClick: () => {
            console.log('Item 2 clicked')
        },
    },
]

export default desktopItems
