// src/components/Desktop.tsx
import React, { useReducer } from 'react';
import { appReducer, initialState } from '../../State/AppState';
import { DesktopItem } from '../../types/Item';
import './Desktop.css';

interface DesktopProps {
    items: DesktopItem[];
}

const Desktop: React.FC<DesktopProps> = ({ items }) => {
    const [state, dispatch] = useReducer(appReducer, initialState);

    const handleItemClick = (item: DesktopItem) => {
        const isItemAlreadySelected = state.selectedItem?.some((selected) => selected.id === item.id);

        if (!isItemAlreadySelected) {
            dispatch({ type: 'SELECTED_ITEM', item });
        }

        console.log(state.selectedItem);
    };


    const handleDesktopClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const isDesktop = (event.target as HTMLElement).classList.contains('desktop');
        const isDesktopItem = (event.target as HTMLElement).closest('.desktop-item') !== null;

        if (isDesktop && !isDesktopItem) {
            // Dispatch deselection action here
            dispatch({ type: 'DESELECT_ITEMS' });
        }
    };


    return (
        <div className="desktop" onClick={handleDesktopClick} >
            {items.map((item) => (
                <div
                    key={item.id}
                    className={`desktop-item ${state.selectedItem && state.selectedItem.map(selected => selected.id).includes(item.id) ? 'selected' : ''}`}
                    onClick={() => handleItemClick(item)}
                >
                    <img src={item.icon} alt="" className="desktop-icon" />
                    <div className="desktop-item-label">{item.name}</div>
                </div>
            ))}


        </div>
    );
};

export default Desktop;