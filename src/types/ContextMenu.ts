export interface ContextMenuProps {
    xPos: string;
    yPos: string;
    menuItems: ContextMenueItem[];
}

export interface ContextMenueItem {
    name: string,
    action: () => void
}