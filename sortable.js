var dataAll = []
export async function sortable() {

    const heroData = await fetch('https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json')
        .then((response) => response.json()) // parse the response from JSON
        .then(loadData => {
            for (var i = 0; i < loadData.length; i++) {
                dataAll.push({

                    Icon: loadData[i].images.xs,
                    Name: loadData[i].name,
                    Full_Name: loadData[i].biography.fullName,
                    Powerstats: loadData[i].powerstats,
                    Race: loadData[i].appearance.race,
                    Gender: loadData[i].appearance.gender,
                    Height: loadData[i].appearance.height,
                    Weight: loadData[i].appearance.weight,
                    Place_Of_Birth: loadData[i].biography.placeOfBirth,
                    Alignement: loadData[i].biography.alignment,
                })
            }
        })

    return dataAll
}

export async function loadIntoTable(data = dataAll) {
    const headers = ['Icon', 'Name', 'Full_Name', 'intelligence', 'strength', 'power', 'durability', 'combat', 'speed', 'Race', 'Gender', 'Height', 'Weight', 'Place_Of_Birth', 'Alignement']
    const rows = data
    const table = document.querySelector('table');
    const tableHead = table.querySelector('thead');
    const tableBody = table.querySelector('tbody');

    tableHead.innerHTML = "<tr></tr>";
    tableBody.innerHTML = "";

    for (const headerText of headers) {
        const headerElement = document.createElement("th");
        headerElement.setAttribute('data-column', `${headerText}`)
        headerElement.setAttribute('data-order', `asce`)
        headerElement.textContent = headerText;
        tableHead.querySelector("tr").appendChild(headerElement);
    }

    let tableRowData = ""
    rows.map(row => {
        tableRowData += `<tr>
            <td><img src="${row.Icon}"></td>
            <td>${row.Name}</td>
            <td>${row.Full_Name}</td>
            <td>${row.Powerstats.intelligence}</td>
            <td>${row.Powerstats.strength}</td>
            <td>${row.Powerstats.power}</td>
            <td>${row.Powerstats.durability}</td>
            <td>${row.Powerstats.combat}</td>
            <td>${row.Powerstats.speed}</td>
            <td>${row.Race}</td>
            <td>${row.Gender}</td>
            <td>${row.Height[1]}</td>
            <td>${row.Weight[1]}</td>
            <td>${row.Place_Of_Birth}</td>
            <td>${row.Alignement}</td>
            </tr>`

    })

    document.getElementById('tbody').innerHTML = tableRowData

}

export async function sortTableByColumn() {
    let data = await sortable()
    loadIntoTable()

    // const numberHeaderMatch = 
    const getAllHeaders = document.querySelectorAll('th')
    for (const header of getAllHeaders) {
        header.addEventListener('click', function () {
            const getOrder = header.getAttribute('data-order')
            const column = header.getAttribute('data-column')
            const stringHeaderMatch = /Name|Full_Name|Race|Gender|Place_Of_Birth|Alignement/.test(column)
            const digitHeaderMatch = /intelligence|strength|power|durability|combat|speed/.test(column)
            console.log(column, 'was clicked', getOrder)

            // for ascending 
            if (getOrder == 'asce') {
                header.setAttribute('data-order', 'desc')
                // for string values
                if (stringHeaderMatch) {
                    data = sortedAsc(data, column)
                }
                // for powerstats
                if (digitHeaderMatch) {
                    data = data.sort(function (a, b) {
                        return a.Powerstats[column] - b.Powerstats[column];
                    });
                }
                if (column == 'Weight' || column == 'Height') {
                    data = data.sort(function (a, b) {
                        return parseInt(a[column][1]) - parseInt(b[column][1])
                    });
                }
                // for descending
            } else {
                header.setAttribute('data-order', 'asce')
                if (stringHeaderMatch) {
                    data = sortedDesc(data, column)
                }

                if (digitHeaderMatch) {
                    data = data.sort(function (a, b) {
                        return b.Powerstats[column] - a.Powerstats[column];
                    });
                }
                if (column == 'Weight' || column == 'Height') {
                    data = data.sort(function (a, b) {
                        return parseInt(b[column][1]) - parseInt(a[column][1])
                    });
                }
            }
            // when this function is called the data is auto set to original array (await sortable)
            // when function is called, data can only be returned once

            loadIntoTable(data)
        })
    }

}

// data for powerstats

// for null or "" values
const sortedAsc = (data, column) => data.sort((a, b) => {
    if (a[column] === null || a[column] === "" || a[column] === '-') {
        return 1;
    }

    if (b[column] === null || b[column] === "" || b[column] === '-') {
        return -1;
    }

    if (a[column] === b[column]) {
        return 0;
    }

    return a[column] < b[column] ? -1 : 1;
});


const sortedDesc = (data, column) => data.sort((a, b) => {
    if (a[column] === null || a[column] === "" || a[column] === '-') {
        return 1;
    }

    if (b[column] === null || b[column] === "" || b[column] === '-') {
        return -1;
    }

    if (a[column] === b[column]) {
        return 0;
    }

    return a[column] > b[column] ? -1 : 1;
});
