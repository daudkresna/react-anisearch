import axios from "axios";

export async function getAnimes(animeName) {
  const response = await axios.get(`https://api.jikan.moe/v4/anime?q=${animeName}&sfw`)
  const items = response.data.data
  return items
}
