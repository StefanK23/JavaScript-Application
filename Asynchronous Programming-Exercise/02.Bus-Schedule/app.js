function solve() {


    const label = document.querySelector('#info span');
    const departBtn = document.getElementById('depart');
    const arriveBtn = document.getElementById('arrive');
    let stop = {
        next: 'depot'
    };


    async function depart() {
        // get information about next stop
        //display name of next stop
        departBtn.disabled = true;

        const url = `http://localhost:3030/jsonstore/bus/schedule/${stop.next}`;
        const response = await fetch(url);
        const data = await response.json();
        stop = data;


        label.textContent = `Next stop ${data.name}`;

        // actiate other button

        arriveBtn.disabled = false;
    }

    function arrive() {
        // display name of current stop
        label.textContent = `Arriving at ${stop.name}`;
        // activate other button
        departBtn.disabled = false;
        arriveBtn.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();