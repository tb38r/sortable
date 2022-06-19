
//ideas from this blog 
//https://www.raymondcamden.com/2022/03/14/building-table-sorting-and-pagination-in-javascript

document.addEventListener('DOMContentLoaded', sortable, false);

let data, table, sortCol;
let sortAsc = false;
const pageSize = getOption();

let curPage = 1;

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

    loadIntoTable(dataAll)

    //sort = sort()

    /*document.querySelectorAll('#table thead tr th').forEach(t => {
        t.addEventListener('click', sort, false);
    });*/

    function previousPage() {
        if (curPage > 1) curPage--;
        loadIntoTable(dataAll);
    }

    function nextPage() {
        if ((curPage * pageSize) < dataAll.length) curPage++;
        loadIntoTable(dataAll);
    }

    document.querySelector('#nextButton').addEventListener('click', nextPage, false);
    document.querySelector('#prevButton').addEventListener('click', previousPage, false);
    return dataAll
}

export async function loadIntoTable(data) {
    const headers = ['Icon', 'Name', 'Full_Name', 'intelligence', 'strength', 'power', 'durability', 'combat', 'speed', 'Race', 'Gender', 'Height', 'Weight', 'Place_Of_Birth', 'Alignement']
    let rows = await data;
    // let rows = await sortable()
    const table = document.querySelector('table');
    const tableHead = table.querySelector('thead');
    const tableBody = table.querySelector('tbody');

    tableHead.innerHTML = "<tr></tr>";
    tableBody.innerHTML = "";

    for (const headerText of headers) {
        const headerElement = document.createElement("th");
        headerElement.setAttribute("th", "data-sort");
        headerElement.setAttribute('data-column', `${headerText}`)
        headerElement.setAttribute('data-order', `asce`)
        headerElement.textContent = headerText;
        tableHead.querySelector("tr").appendChild(headerElement);
    }

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
                    rows = sortedAsc(rows, column)
                }
                // for powerstats
                if (digitHeaderMatch) {
                    rows = rows.sort(function (a, b) {
                        return a.Powerstats[column] - b.Powerstats[column];
                    });
                }
                if (column == 'Weight' || column == 'Height') {
                    rows = rows.sort(function (a, b) {
                        return parseInt(a[column][1]) - parseInt(b[column][1])
                    });
                }
                // for descending
            } else {
                header.setAttribute('data-order', 'asce')
                if (stringHeaderMatch) {
                    rows = sortedDesc(rows, column)
                }

                if (digitHeaderMatch) {
                    rows = rows.sort(function (a, b) {
                        return b.Powerstats[column] - a.Powerstats[column];
                    });
                }
                if (column == 'Weight' || column == 'Height') {
                    rows = rows.sort(function (a, b) {
                        return parseInt(b[column][1]) - parseInt(a[column][1])
                    });
                }
            }
            // when this function is called the data is auto set to original array (await sortable)
            // when function is called, data can only be returned once

            // return rows
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
            // console.log(tableRowData)
            tableBody.innerHTML = tableRowData

        })
    }

    let tableRowData = ""
    data.filter((row, index) => {
        let start = (curPage - 1) * pageSize;
        let end = curPage * pageSize;
        if (index >= start && index < end) return true;
    }).forEach(row => {
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
    // console.log(tableRowData)
    tableBody.innerHTML = tableRowData
    // document.getElementById('tbody').innerHTML = tableRowData

}

// export async function sortTableByColumn() {
//     let sortedData = await sortable()
//     loadIntoTable()

//     // const numberHeaderMatch = 
//     const getAllHeaders = document.querySelectorAll('th')
//     for (const header of getAllHeaders) {
//         header.addEventListener('click', function () {
//             const getOrder = header.getAttribute('data-order')
//             const column = header.getAttribute('data-column')
//             const stringHeaderMatch = /Name|Full_Name|Race|Gender|Place_Of_Birth|Alignement/.test(column)
//             const digitHeaderMatch = /intelligence|strength|power|durability|combat|speed/.test(column)
//             console.log(column, 'was clicked', getOrder)

//             // for ascending 
//             if (getOrder == 'asce') {
//                 header.setAttribute('data-order', 'desc')
//                 // for string values
//                 if (stringHeaderMatch) {
//                     sortedData = sortedAsc(sortedData, column)
//                 }
//                 // for powerstats
//                 if (digitHeaderMatch) {
//                     sortedData = sortedData.sort(function (a, b) {
//                         return a.Powerstats[column] - b.Powerstats[column];
//                     });
//                 }
//                 if (column == 'Weight' || column == 'Height') {
//                     sortedData = sortedData.sort(function (a, b) {
//                         return parseInt(a[column][1]) - parseInt(b[column][1])
//                     });
//                 }
//                 // for descending
//             } else {
//                 header.setAttribute('data-order', 'asce')
//                 if (stringHeaderMatch) {
//                     sortedData = sortedDesc(sortedData, column)
//                 }

//                 if (digitHeaderMatch) {
//                     sortedData = sortedData.sort(function (a, b) {
//                         return b.Powerstats[column] - a.Powerstats[column];
//                     });
//                 }
//                 if (column == 'Weight' || column == 'Height') {
//                     sortedData = sortedData.sort(function (a, b) {
//                         return parseInt(b[column][1]) - parseInt(a[column][1])
//                     });
//                 }
//             }
//             // when this function is called the data is auto set to original array (await sortable)
//             // when function is called, data can only be returned once
//             loadIntoTable(sortedData)

//         })
//     }

// }

// // data for powerstats

// // for null or "" values
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

/*function sort(e) {
    let thisSort = e.target.dataset.sort;
    if (sortCol === thisSort) sortAsc = !sortAsc;
    sortCol = thisSort;
    dataAll.sort((a, b) => {
        if (a[sortCol] < b[sortCol]) return sortAsc ? 1 : -1;
        if (a[sortCol] > b[sortCol]) return sortAsc ? -1 : 1;
        return 0;
    });
    renderTable();
}*/

function previousPage() {
    if (curPage > 1) curPage--;
    renderTable();
}

function nextPage() {
    if ((curPage * pageSize) < heroData.length) curPage++;
    renderTable();
}

export function getOption() {
    var select = document.getElementById("noRowsDisplay");
    select.onchange = function () {
        var selectedString = select.options[select.selectedIndex].value;
        alert(selectedString);
    }
    return 20
}
