/* const { btoa } = require("buffer"); */

const burgerMenu = document.querySelector("[data-burger-menu]");
const burgerMenuLines = document.querySelectorAll("[data-burger-line]");
const burgerLinesArray = Array.from(burgerMenuLines);
const mobileNavUlEl = document.querySelector("[data-mobile-nav-ul]");
const mobileNavUlLi = document.querySelectorAll("[data-mobile-nav-ul] li");
const mobileNavUlArray = Array.from(mobileNavUlLi);
const heroSection = document.querySelector("[data-hero-section]");
const tableBody = document.querySelector("[data-table-body]");
const currentYear = document.querySelector(".current-year");

window.addEventListener("DOMContentLoaded", showsFetch);

(function updateCurrentYear() {
  const date = new Date();

  currentYear.textContent = date.getFullYear();
})();

/* mobileNavUlEl.addEventListener("click", (e) => {
  console.log(e.target);
  if (e.target.classList.contains("nav-links")) {
    mobileNavUlEl.classList.remove("open");
    burgerLinesArray.forEach((line) => {
      line.classList.remove("toggle");
    });
  }
});
 */
burgerMenu.addEventListener("click", function () {
  burgerLinesArray.forEach((line) => {
    line.classList.toggle("toggle");
  });
  if (mobileNavUlEl.classList.contains("open")) {
    mobileNavUlEl.classList.remove("open");
  } else {
    mobileNavUlEl.classList.add("open");
  }
  mobileNavUlLi.forEach((el, index) => {
    el.style.animation = `fade_in 900ms  ease-in-out forwards ${
      (index * 2) / 15
    }s `;
  });
});

function createNewTourDate(year, month, date, venue, city, region, ticketLink) {
  let orIn;
  if (date > 3 && date < 21) {
    orIn = "th";
  } else if (date[1] == 1) {
    orIn = "st";
  } else if (date[1] == 2) {
    orIn = "nd";
  } else if (date[1] == 3) {
    orIn = "rd";
  } else {
    orIn = "th";
  }

  if (date[0] === "0") {
    date = date.slice(-1);
  }

  const newTr = document.createElement("tr");
  newTr.innerHTML = `<tr>
  <td data-label="Date" class="accent-color">
    ${month} ${date}${orIn}, ${year} <br /><span class="sec-acc-color italic"
      >${venue}</span
    >
  </td>
  <td data-label="Location">${city}, ${region}</td>
  <td data-label="Tickets"><button><a href="${ticketLink}" target=__blank>DETAILS</a></button></td>
</tr>`;
  tableBody.appendChild(newTr);
}

async function showsFetch() {
  let resData;

  const res = await fetch(
    "https://rest.bandsintown.com/artists/frostfang/events?app_id=b8175137c070734ae46b70f81b3cbdac&date=upcoming"
  );

  resData = await res.json();

  console.log(resData);

  if (resData == false) {
    tableBody.innerHTML = `<td><h1 class="sec-acc-color italic">There are no upcoming concerts</h1></td>`;
  }

  var monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let dates = [];
  for (let i = 0; i < resData.length; i++) {
    dates.push(resData[i].datetime);
  }
  let trimmedDates = dates.map((el) => el.slice(0, 10));
  let years = trimmedDates.map((el) => el.slice(0, 4));
  let months = trimmedDates.map((el) => {
    if (el[5] === "0") {
      let monNum1Digit = el.slice(6, 7);
      return monthNames[monNum1Digit - 1];
    } else {
      let monNum2Digit = el.slice(5, 7);
      return monthNames[monNum2Digit - 1];
    }
  });

  let date = trimmedDates.map((el) => {
    return el.slice(8, 10);
  });

  let cities = [];
  for (let i = 0; i < resData.length; i++) {
    cities.push(resData[i].venue.city);
  }

  let regions = [];
  for (let i = 0; i < resData.length; i++) {
    regions.push(resData[i].venue.region);
  }

  let venues = [];
  for (let i = 0; i < resData.length; i++) {
    venues.push(resData[i].venue.name);
  }

  let ticketLinks = [];
  for (let i = 0; i < resData.length; i++) {
    ticketLinks.push(resData[i].url);
  }

  for (let i = 0; i < resData.length; i++) {
    createNewTourDate(
      years[i],
      months[i],
      date[i],
      venues[i],
      cities[i],
      regions[i],
      ticketLinks[i]
    );
  }
}

/* const APIController = (function (){
  const clientId = 'fe9b60fece8246709b554d2aa836cc17';
  const clientSecret = 'e81c52e8f5854db2a187e7afedc006a1';

  const _getToken = () => {
    const result = await fetch("https://account.spotify.com/api/token", {
    method: 'POST',
    header: {
      "Content-Type" : 'application/x-www-form-urlencoded',
      'Authorization' : 'Basic ' + btoa(clientId + ':' + clientSecret)
    },
    body: 'grant-type=client_credentials'
    });

    const data = await result.json();
    console.log(data.access_token);
    return data.access_token
    
  }
})(); */

/* BANDS IN TOWN APP ID FOR API
b8175137c070734ae46b70f81b3cbdac;
b8175137c070734ae46b70f81b3cbdac;
b8175137c070734ae46b70f81b3cbdac;
b8175137c070734ae46b70f81b3cbdac;
 BANDS IN TOWN APP ID FOR API
 */
