export const sampleDash = () => fetch("http://localhost:8080/search?searchTerm=")
  .then(response => response.json());