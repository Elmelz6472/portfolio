// asyncTasks.ts
// You can define more async functions here if needed
import { DesktopItem } from '../types/Item'
import { readFile } from './Reader'
import { writeFile } from './Writer'

export const readDesktopItems = (): DesktopItem[] | null => {
    try {
        const desktopItems = readFile('DesktopItems')
        return desktopItems
    } catch (error) {
        console.error('Error reading desktop items:', error)
        return null
    }
}

export const writeDesktopItem = (key: string, item: DesktopItem): void => {
    try {
        // Write the desktop item to localStorage
        const fullKey = `DesktopItems/${key}` // Combine with the parent key
        writeFile(fullKey, item)
    } catch (error) {
        console.error('Error writing desktop item:', error)
    }
}

export async function fetchData(): Promise<unknown> {
    // Simulate fetching data from an API
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('Data fetched successfully')
            console.log('Data fetched successfully')
        }, 2000) // Simulate 2 seconds delay
    })
}
