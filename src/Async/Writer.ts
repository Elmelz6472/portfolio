// Function to write data to localStorage
export const writeFile = <T>(key: string, data: T) => {
    try {
        localStorage.setItem(key, JSON.stringify(data))
    } catch (error) {
        console.error('Error writing file:', error)
    }
}
