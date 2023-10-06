import "./style.css";
import axios from "axios";

const searchBtn = document.getElementById("searchBtn") as HTMLButtonElement;

interface ApiResponse {
  response: string;
  results: Hero[];
}

interface Hero {
  id: number;
  name: string;
  powerstats: PowerStats;
  biography: Biography;
  image: Image;
}

interface PowerStats {
  intelligence: number;
  strength: number;
  speed: number;
  durability: number;
  power: number;
  combat: number;
}

interface Biography {
  fullName: string;
}

interface Image {
  url: string;
}

searchBtn.addEventListener("click", async (event) => {
  event.preventDefault();
  const searchField = document.getElementById(
    "searchField"
  ) as HTMLInputElement;
  const searchedName = searchField?.value;
  if (searchedName) {
    try {
      const apiUrl = "/api/heroes"; // Updated URL
      const response = await axios.get(`${apiUrl}?name=${searchedName}`);
      const data: ApiResponse = response.data;
      const container = document.getElementById("showHero");
      if (container) {
        container.innerHTML = "";
        data.results.forEach((hero: Hero) => {
          container.innerHTML += `
          <h2>${hero.name}</h2>
          <img src="${hero.image.url}" />
          <p>Full Name: ${hero.biography.fullName}</p>
          <p>Intelligence: ${hero.powerstats.intelligence}</p>
          <p>Strength: ${hero.powerstats.strength}</p>
          <p>Speed: ${hero.powerstats.speed}</p>
          <p>Durability: ${hero.powerstats.durability}</p>
          <p>Power: ${hero.powerstats.power}</p>
          <p>Combat: ${hero.powerstats.combat}</p>
          `;
        });
      }
    } catch (e) {
      console.error(e);
      alert("Unable to fetch hero data!");
    }
  }
});
