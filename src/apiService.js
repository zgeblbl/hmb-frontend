// src/apiService.js
export const fetchUsers = () => {
    return fetch('http://localhost:9090/api/users')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .catch(error => {
        console.error("Error fetching users:", error);
        return []; // Return an empty array on error
      });
  };
  