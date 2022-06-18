export async function sortable() {
  var dataAll = [];

  const heroData = await fetch(
    "https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json"
  )
    .then((response) => response.json()) // parse the response from JSON
    .then((loadData) => {
      //console.log(loadData)
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
        });
      }
    });

  return dataAll;
}


export async function filterList(usersearch) {
    const searchInput = document.querySelector("#search-input");
    const filter = searchInput.value.toLowerCase();
    console.log(filter);
    return filter;
  }

export async function loadIntoTable(usersearch) {
  console.log(typeof usersearch);
  console.log('--', usersearch.length);
  const headers = [
    "Icon",
    "Name",
    "Full Name",
    "Powerstats",
    "Race",
    "Gender",
    "Height",
    "Weight",
    "Place of Birth",
    "Alignment",
  ];
  const rows = await sortable();
  const table = document.querySelector("table");
  const tableHead = table.querySelector("thead");
  const tableBody = table.querySelector("tbody");

  tableHead.innerHTML = "<tr></tr>";
  tableBody.innerHTML = "";

  for (const headerText of headers) {
    const headerElement = document.createElement("th");
    headerElement.textContent = headerText;
    tableHead.querySelector("tr").appendChild(headerElement);
  }

  let tableRowData = "";
  let toSearch = usersearch
//   if (toSearch.length == 0 ) {
//     toSearch = usersearch.replace(/[^0-9A-Z]+/gi, "").toLowerCase();
//   }else{
//     toSearch = undefined
//   }
  rows.map((row) => {
    if (toSearch.length == 0 ) {
      tableRowData += `<tr>
            <td><img src="${row.Icon}"></td>
            <td>${row.Name}</td>
            <td>${row.Full_Name}</td>
            <td></td>
            <td>${row.Race}</td>
            <td>${row.Gender}</td>
            <td>${row.Height[0]}</td>
            <td>${row.Weight[1]}</td>
            <td>${row.Place_Of_Birth}</td>
            <td>${row.Alignement}</td>
            </tr>`;
    } else {
      if (
        row.Name.replace(/[^0-9A-Z]+/gi, "")
          .toLowerCase()
          .includes(toSearch)
      ) {
        console.log(toSearch);
        tableRowData += `<tr>
            <td><img src="${row.Icon}"></td>
            <td>${row.Name}</td>
            <td>${row.Full_Name}</td>
            <td></td>
            <td>${row.Race}</td>
            <td>${row.Gender}</td>
            <td>${row.Height[0]}</td>
            <td>${row.Weight[1]}</td>
            <td>${row.Place_Of_Birth}</td>
            <td>${row.Alignement}</td>
            </tr>`;
      }
    }

    // console.log(row.Full_Name)
  });
  document.getElementById("tbody").innerHTML = tableRowData;
  // console.log(tableRowData)
}


    // function filterList(){
    //     const searchInput = document.querySelector
    //     ('#search-input');
    //     const filter= searchInput.value.toLowerCase();
    //     console.log(filter);
    //     return filter
      
    // }

