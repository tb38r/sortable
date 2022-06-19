
//ideas from this blog 
//https://www.raymondcamden.com/2022/03/14/building-table-sorting-and-pagination-in-javascript

document.addEventListener('DOMContentLoaded', sortable, false);

let data, table, sortCol;
let sortAsc = false;
const pageSize = getOption();

let curPage = 1;

export async function sortable() {
    var dataAll = []

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
}

export async function loadIntoTable(data) {
    const headers = ['Icon', 'Name', 'Full Name', 'Powerstats', 'Race', 'Gender', 'Height', 'Weight', 'Place of Birth', 'Alignment']
    const rows = await data;
    const table = document.querySelector('table');
    const tableHead = table.querySelector('thead');
    const tableBody = table.querySelector('tbody');

    tableHead.innerHTML = "<tr></tr>";
    tableBody.innerHTML = "";

    for (const headerText of headers) {
        const headerElement = document.createElement("th");
        headerElement.setAttribute("th", "data-sort");
        headerElement.textContent = headerText;
        tableHead.querySelector("tr").appendChild(headerElement);
    }
    console.log(rows)
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
            <td> <ol>
            <ol>Intelligence: ${row.Powerstats.intelligence}
            <ol>Strength: ${row.Powerstats.strength}
            <ol>Power: ${row.Powerstats.power}
            <ol>Durablilty: ${row.Powerstats.durability}
            <ol>Combat: ${row.Powerstats.combat}
            <ol>Speed: ${row.Powerstats.speed}
            <td>${row.Race}</td>
            <td>${row.Gender}</td>
            <td>${row.Height[0]}</td>
            <td>${row.Weight[1]}</td>
            <td>${row.Place_Of_Birth}</td>
            <td>${row.Alignement}</td>
            </tr>`
    })
    document.getElementById('tbody').innerHTML = tableRowData

}

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
