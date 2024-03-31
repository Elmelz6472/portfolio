import React from 'react'
import './ContextMenu.css'
import { ContextMenuProps } from '../../types/ContextMenu'

const ContextMenu: React.FC<ContextMenuProps> = ({ xPos, yPos, menuItems }) => {
    return (
        <ul className='context-menu' style={{ top: yPos, left: xPos }}>
            {menuItems.map((item, index) => {
                if (item.type === 'separator') {
                    return <hr key={`separator-${index}`} />
                }

                return (
                    <li key={`item-${index}`} onClick={item.action}>
                        {item.name}
                    </li>
                )
            })}
        </ul>
    )
}

export default ContextMenu
