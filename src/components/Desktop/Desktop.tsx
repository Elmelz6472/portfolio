// src/components/Desktop.tsx
import React, { useCallback, useEffect, useReducer, useRef, useState } from 'react'
import { appReducer, initialState } from '../../State/AppState'
import { DesktopItem } from '../../types/Item'
import './Desktop.css'

import Draggable from 'react-draggable'

type DesktopProps = {
    items: DesktopItem[] | null
}

const Desktop: React.FC<DesktopProps> = ({ items }) => {
    const [state, dispatch] = useReducer(appReducer, initialState)

    const handleKeyPress = useCallback(
        (event: KeyboardEvent) => {
            if (event.key === 'enter' || event.key === 'Enter') {
                if (state.selectedItem) {
                    alert(JSON.stringify(state.selectedItem))
                }
            }
        },
        [state],
    )

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress)
        return () => {
            window.removeEventListener('keydown', handleKeyPress)
        }
    }, [handleKeyPress])

    const handleItemClick = (item: DesktopItem) => {
        const isItemAlreadySelected = state.selectedItem?.some(
            (selected) => selected.id === item.id,
        )

        if (!isItemAlreadySelected) {
            dispatch({ type: 'SELECTED_ITEM', item })
        }
    }

    const handleDesktopClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const isDesktop = (event.target as HTMLElement).classList.contains('desktop')
        const isDesktopItem = (event.target as HTMLElement).closest('.desktop-item') !== null

        if (isDesktop && !isDesktopItem) {
            dispatch({ type: 'DESELECT_ITEMS' })
        }
    }

    const [labelValue, setLabelValue] = useState('') // State to store the label value

    const handleInputChange = (event: React.FormEvent<HTMLDivElement>, item: DesktopItem) => {
        const target = event.target as HTMLDivElement
        const newName = target.textContent || ''

        setLabelValue(newName)

        dispatch({ type: 'UPDATE_ITEM_NAME', item: item, name: labelValue })
        console.log('sent update')
    }
    const handleOnBlur = () => {}

    const nodeRef = useRef(null)

    return (
        <div className='desktop' onClick={handleDesktopClick}>
            {Array.isArray(items) &&
                items.map((item) => (
                    <Draggable nodeRef={nodeRef} key={item.id}>
                        <div
                            ref={nodeRef}
                            className={`desktop-item ${state.selectedItem && state.selectedItem.map((selected) => selected.id).includes(item.id) ? 'selected' : ''}`}
                            onClick={() => handleItemClick(item)}
                        >
                            <img
                                src={item.icon}
                                alt=''
                                className='desktop-icon'
                                style={{ pointerEvents: 'none' }}
                            />
                            <div
                                onBlur={handleOnBlur}
                                onInput={(event) => handleInputChange(event, item)}
                                suppressContentEditableWarning={true}
                                contentEditable='true'
                                className='desktop-item-label'
                            >
                                {item.name}
                            </div>
                        </div>
                    </Draggable>
                ))}
        </div>
    )
}

export default Desktop
