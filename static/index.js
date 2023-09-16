'use strict';

(function() {
  window.addEventListener('load', init);

  function init() {
    // Initialize timer that uses video length to figure out when video ends, then triggers next after that period.
    nextVideo();

    document.getElementById("next_button").addEventListener("submit", async function(event) {
      event.preventDefault();
      await console.log("U U[p?");
    //   await getSearch(document.getElementById('search').value);
    });
  }

  async function nextVideo() {

    fetch("/next", {method: "GET"})
      .then(statusCheck)
      .then(resp => resp.text())
      .then(function(resp) {
        console.log(resp);



        
      });
  }

  async function getSearch(search) {
    let params = new FormData;
    params.append("search", search);

    fetch("/searchchallenge", {method: "POST", body: params})
      .then(statusCheck)
      .then(resp => resp.text())
      .then(function(resp) {
        console.log(resp);

        document.getElementById('output_field').appendChild(function(resp) {
          let table = document.createElement("table");
          let header = document.createElement("tr");

          let header0 = document.createElement("td");
          header0.textContent = "Search";
          let header1 = document.createElement("td");
          header1.textContent = "Answer";
          header.appendChild(header0);
          header.appendChild(header1);

          table.appendChild(header);

          searchList = JSON.parse(resp);
          console.log(typeof(searchList))
          for (const thing in searchList) {
            let row = document.createElement("tr");

            let search = document.createElement("td");
            search.textContent = thing.search;
            let answer = document.createElement("td");
            answer.textContent = thing.answer;
            row.appendChild(search);
            row.appendChild(answer);

            table.appendChild(row);
          }
          
          return table;
        });
      })
      .catch(resp => document.getElementById("output_field").textContent = resp);
  }

  async function statusCheck(resp) {
    if (!resp.ok) {
      throw new Error(await resp.text());
    }
    return resp;
  }
})();