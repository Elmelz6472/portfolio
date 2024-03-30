class AsyncTaskManager {
  private tasks: (() => Promise<unknown>)[];

  constructor() {
    this.tasks = [];
  }

  addTask(task: () => Promise<unknown>) {
  this.tasks.push(task);
  }

  async executeTasks() {
    const results: unknown[] = [];
    for (const task of this.tasks) {
      try {
        const result = await task();
        results.push(result);
      } catch (error) {
        console.error('Error executing task:', error);
      }
    }
    return results;
  }
}

export default AsyncTaskManager;
