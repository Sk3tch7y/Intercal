const sampleDash = () => fetch("http://localhost:8080/search?searchTerm=")
  .then(response => response.json().then(data => {
    console.log(data);
    return data;
  }));

 export { sampleDash };