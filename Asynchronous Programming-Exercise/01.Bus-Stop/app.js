 async function getInfo() {
    // x read input value
    // x make request to server
    // parse response data
    // display data
    // x check for error 


     const stopId = document.getElementById('stopId').value;
     const stopName = document.getElementById('stopName');
     const timeTable = document.getElementById('buses');

    const url = `http://localhost:3030/jsonstore/bus/businfo/${stopId}`;

      
    try{
        stopName.textContent = 'Loading  :)';
        timeTable.innerHTML = '';
      const response = await fetch(url);
      if(response.status != 200){
          throw new Error('Stop ID not found');
      }
       const data = await response.json();
      
        stopName.textContent = data.name;
        Object.entries(data.buses).forEach(b => {
           const liElement = document.createElement('li');
           liElement.textContent = `Bus ${b[0]} arrives in ${b[1]} minutes`
           timeTable.appendChild(liElement);
        });
    }catch  (error){
        stopName.textContent = 'Error';
    }

    

    
}
