let headerheaderofthecity = document.querySelector(".city-name");

let g = console.log;
//"الاسكندريه","القاهره","طنطا"
let citys = [
  {
    city: "القاهره",
    name: "Al Qāhirah",
  },
  {
    city: "الاسكندريه",
    name: "Al Iskandarīyah",
  },
  {
    city: "طنطا",
    name: "Al Uqşur",
  },
];

let ciryselectinput = document.querySelector(".cities"); //cities input

for (const city of citys) {
  ciryselectinput.innerHTML += `<option>${city.city}</option>`;
} // add the opation to the the chose input
//chose all the cards
let cardtimingtext = document.querySelectorAll(".card-text");

let select = document.querySelector("#selector");
select.addEventListener("change", () => {
  let choosencity = "";
  for (const city of citys) {
    if (city.city === select.value) {
      choosencity = city.name;
      axioscall(choosencity);
      headerheaderofthecity.innerHTML = select.value;
    }
  }
});

function axioscall(currentcity) {
  let params = {
    country: "EG",
    city: currentcity, //"Al Iskandarīyah"
  };
  axios
    .get("http://api.aladhan.com/v1/timingsByCity", {
      params: params,
    })
    .then((respone) => {
      console.log(respone);
      let time = respone.data.data.timings;
      fillprayertime(cardtimingtext[0], changetime(time.Fajr));
      fillprayertime(cardtimingtext[1], changetime(time.Dhuhr));
      fillprayertime(cardtimingtext[2], changetime(time.Asr));
      fillprayertime(cardtimingtext[3], changetime(time.Maghrib));
      fillprayertime(cardtimingtext[4], changetime(time.Isha));
      const day = respone.data.data.date.hijri.weekday.ar;
      const monthday = respone.data.data.date.readable;
      document.querySelector(".time").innerHTML = `${day} ${monthday}`;
    });
}
function fillprayertime(card, time) {
  card.innerHTML = time;
}
function changetime(time) {
  let first = time.split(":");
  let hours = parseInt(first[0]);
  let minuts = parseInt(first[1]);
  if (hours > 12) {
    return `${hours - 12}:${minuts < 10 ? minuts + "0" : minuts}`;
  } else {
    return `${hours}:${minuts < 10 ? minuts + "0" : minuts}`;
  }
}

headerheaderofthecity.innerHTML = select.value;
axioscall("Al Qāhirah");
