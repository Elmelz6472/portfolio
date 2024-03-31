import { ContextMenueItem } from '../../types/ContextMenu'
import { writeDesktopItem } from '../../Async/AsyncTask'

export const menuItems: ContextMenueItem[] = [
    {
        type: 'item',
        name: 'New Folder',
        action: () =>
            writeDesktopItem('untitled folder', {
                id: '10',
                name: 'new folder',
                icon: '/terminal.png',
                onClick: () => {
                    /* onClick function body */
                },
            }),
    },

    { type: 'item', name: 'Get Info', action: () => console.log('Get Info') },
    { type: 'separator' },
    { type: 'item', name: 'Change Wallpaper', action: () => {} },
    { type: 'separator' },
    { type: 'item', name: 'Sort', action: () => console.log('Sort') },
]

export const AppMenuItems: ContextMenueItem[] = [
    { type: 'item', name: 'Get Info from app', action: () => console.log('Get Info from app') },
]
