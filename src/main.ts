import "./style.css";
import * as dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const apikey = process.env.SUPERHERO_TOKEN;
const url: string = "https://www.superheroapi.com/api/";
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

const getHeroInfo = async (name: string) => {
  try {
    const response = await axios.get<ApiResponse>(
      `${url}${apikey}/search/${name}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

searchBtn.addEventListener("click", async (event) => {
  event.preventDefault();
  const searchField = document.getElementById(
    "searchField"
  ) as HTMLInputElement;
  const searchedName = searchField?.value;
  if (searchedName) {
    try {
      const data = await getHeroInfo(searchedName);
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
