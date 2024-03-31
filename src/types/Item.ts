type Item = {
    id: string
    name: string
    icon: string
    onClick: () => void
}

export type DesktopItem = Item

export type DockItem = Item & {
    label: string
}
