// src/components/Dock.tsx
import React, { useState } from 'react'
import { DockItem } from '../../types/DockItem'
import './Dock.css'

interface DockProps {
    items: DockItem[]
}

const Dock: React.FC<DockProps> = ({ items }) => {
    const [hoveredId, setHoveredId] = useState<string | null>(null)

    return (
        <div className='dock'>
            {items.map((item) => (
                <div
                    key={item.id}
                    className='dock-item'
                    onMouseEnter={() => setHoveredId(item.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    onClick={item.onClick}
                    style={{
                        transform: hoveredId === item.id ? 'scale(1.35)' : 'scale(1)',
                    }}
                >
                    <img src={item.icon} alt={item.label} />
                    <div
                        className='dock-item-label'
                        style={{ opacity: hoveredId === item.id ? 1 : 0 }}
                    >
                        {item.label}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Dock
