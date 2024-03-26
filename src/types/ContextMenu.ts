export type ContextMenuProps = {
    xPos: string
    yPos: string
    menuItems: ContextMenueItem[]
}

export type ContextMenueItem = {
    name: string
    action: () => void
}
