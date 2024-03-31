// Function to read data from localStorage
export const readFile = (key: string) => {
    try {
        const data = localStorage.getItem(key)
        return data ? JSON.parse(data) : null
    } catch (error) {
        console.error('Error reading file:', error)
        return null
    }
}
