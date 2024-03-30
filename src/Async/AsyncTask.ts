// asyncTasks.ts
export async function fetchData(): Promise<unknown> {
  // Simulate fetching data from an API
  return new Promise(resolve => {
    setTimeout(() => {
        resolve('Data fetched successfully');
        console.log('Data fetched successfully')
    }, 2000); // Simulate 2 seconds delay
  });
}

// You can define more async functions here if needed
