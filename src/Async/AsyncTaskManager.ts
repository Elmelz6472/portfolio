class AsyncTaskManager {
    private tasks: { name: string; task: () => Promise<unknown> }[]

    constructor() {
        this.tasks = []
    }

    addTask(task: () => Promise<unknown>, name?: string) {
        const taskName = name || `Task${this.tasks.length + 1}`
        this.tasks.push({ name: taskName, task })
    }

    async executeTasks() {
        const results: { [key: string]: unknown } = {}
        for (let i = 0; i < this.tasks.length; i++) {
            const { name, task } = this.tasks[i]
            try {
                const result = await task()
                results[name] = result
            } catch (error) {
                console.error('Error executing task:', error)
                results[name] = null
            }
        }
        return results
    }
}

export default AsyncTaskManager
