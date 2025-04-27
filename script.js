// Step 2: Set up button click
document.getElementById('loadDataButton').addEventListener('click', function() {
    startFetchingData();
});

//  Create the main function
function startFetchingData() {
    PromiseAPI1()
        .then(() => PromiseAPI2())
        .then(() => PromiseAPI3())
        .catch((error) => {
            console.error('Error in fetching:', error);
        });
}

// Create Promise functions
function PromiseAPI1() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Fetching API 1 data...');
            fetch('https://dummyjson.com/posts')
                .then(response => response.json())
                .then(data => {
                    displayData(data, "Posts");
                    resolve();
                })
                .catch(error => reject(error));
        }, 1000); // Delay of 1 second
    });
}

function PromiseAPI2() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Fetching API 2 data...');
            fetch('https://dummyjson.com/products')
                .then(response => response.json())
                .then(data => {
                    displayData(data, "Products");
                    resolve();
                })
                .catch(error => reject(error));
        }, 2000); // Delay of 2 seconds
    });
}

function PromiseAPI3() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Fetching API 3 data...');
            fetch('https://dummyjson.com/todos')
                .then(response => response.json())
                .then(data => {
                    displayData(data, "Todos");
                    resolve();
                })
                .catch(error => reject(error));
        }, 3000); // Delay of 3 seconds
    });
}

// Helper function to display fetched data
function displayData(data, title) {
    const apiDataDiv = document.getElementById('apiData');
    const section = document.createElement('section');
    const heading = document.createElement('h2');
    heading.textContent = title;
    section.appendChild(heading);

    const pre = document.createElement('pre');
    pre.textContent = JSON.stringify(data, null, 2); // Pretty JSON
    section.appendChild(pre);

    apiDataDiv.appendChild(section);
}
function displayData(data, title) {
    const apiDataDiv = document.getElementById('apiData');
    const section = document.createElement('section');
    const heading = document.createElement('h2');
    heading.textContent = title;
    section.appendChild(heading);

    // Create table
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    // Make table headers dynamically
    const firstItem = data.posts?.[0] || data.products?.[0] || data.todos?.[0];

    if (firstItem) {
        const headerRow = document.createElement('tr');
        Object.keys(firstItem).forEach(key => {
            const th = document.createElement('th');
            th.textContent = key.toUpperCase();
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);

        // Fill table rows
        const items = data.posts || data.products || data.todos;
        items.forEach(item => {
            const row = document.createElement('tr');
            Object.values(item).forEach(value => {
                const td = document.createElement('td');
                td.textContent = value;
                row.appendChild(td);
            });
            tbody.appendChild(row);
        });
    }

    table.appendChild(thead);
    table.appendChild(tbody);
    section.appendChild(table);
    apiDataDiv.appendChild(section);
}

