import axios from "axios";

export async function getAnimes(animeName) {
  const response = await axios.get(`https://api.jikan.moe/v4/manga?q=${animeName}&sfw&limit=5`)
  const items = response.data.data
  return items
}
