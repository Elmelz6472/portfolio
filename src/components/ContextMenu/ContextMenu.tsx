import React, { useReducer } from 'react'
import './ContextMenu.css'
import { ContextMenuProps } from '../../types/ContextMenu'
import { appReducer, initialState } from '../../State/AppState'
import { writeDesktopItem } from '../../Async/AsyncTask'

const ContextMenu: React.FC<ContextMenuProps> = ({ xPos, yPos, menuItems }) => {
    const [, dispatch] = useReducer(appReducer, initialState)

    return (
        <ul className='context-menu' style={{ top: yPos, left: xPos }}>
            {menuItems.map((item, index) => {
                if (item.type === 'separator') {
                    return <hr key={`separator-${index}`} />
                }

                return (
                    <li key={`item-${index}`} onClick={() => {
                        if (item.name !== 'New Folder') item.action
                        else {
                            const Item = {
                                id: '-1',
                                name: 'new folder from context',
                                icon: '/folder.png',
                                onClick: () => { }
                            }
                            writeDesktopItem('untitled folder from context', Item)
                            dispatch({ type: 'ADD_ITEM', item: Item })
                            console.log("added from dispatch")
                        }
                    }}>
                        {item.name}
                    </li>
                )
            })}
        </ul>
    )
}

export default ContextMenu

