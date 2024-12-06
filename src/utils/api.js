export const fetchData = async (url) => {
  const response = await fetch(url);
  return response.json();
};
export const fetchActiveHustles = async () => {
  try {
    const response = await fetch('http://localhost:8080/v1/hustles/active');
    if (!response.ok) {
      throw new Error(`API error: ${response.status} - ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching active hustles:', error);
    throw error; // Re-throw the error for handling in the component
  }
};
export const fetchHustles = async () => {
  try {
    const response = await fetch('http://localhost:8080/v1/hustles');
    if (!response.ok) {
      throw new Error(`API error: ${response.status} - ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching hustles:', error);
    throw error; // Re-throw the error for handling in the component
  }
};

export const fetchAvailableStatuses = async () => {
  const response = await fetch('http://localhost:8080/v1/hustles/availableStatus');
  if (!response.ok) {
    throw new Error('Failed to fetch available statuses');
  }
  return response.json();
};

// Fetch hustles by status
export const fetchHustlesByStatus = async (status) => {
  const url = `http://localhost:8080/v1/hustles/status/${status}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch hustles with status: ${status}`);
  }
  return response.json();
};