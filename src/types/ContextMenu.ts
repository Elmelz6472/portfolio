export type ContextMenuProps = {
    xPos: string
    yPos: string
    menuItems: ContextMenueItem[]
}

export type ContextMenueItem = {
    type: 'item' | 'separator'
    name?: string
    action?: (() => void) | (() => JSX.Element)
}
