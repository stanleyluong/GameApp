const apiKey = process.env.REACT_APP_RAWG_API_KEY;
const apiUrl = process.env.REACT_APP_RAWG_API_URL || "https://api.rawg.io/api";

export const fetchGames = async (
  query = "",
  genre = "",
  score = "",
  platform = "",
  pageSize = 5,
) => {
  try {
    let url = `${apiUrl}/games?key=${apiKey}&page_size=${pageSize}`;
    if (query) {
      url += `&search=${encodeURIComponent(query)}`;
    }

    if (genre) {
      url += `&genres=${encodeURIComponent(genre)}`;
    }

    if (score) {
      url += `&metacritic=${encodeURIComponent(score)}`;
    }

    if (platform) {
      url += `&platforms=${encodeURIComponent(platform)}`;
    }

    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);

    const data = await response.json();

    return data.results || [];
  } catch (error) {
    console.error(`Error fetching games: ${error.message}`);
    return [];
  }
};

export const fetchGenres = async () => {
  try {
    const response = await fetch(`${apiUrl}/genres?key=${apiKey}`);
    if (!response.ok)
      throw new Error(`Failed to fetch genres: ${response.status}`);

    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error(`Error fetching genres: ${error.message}`);
    return [];
  }
};

export const fetchPlatforms = async () => {
  try {
    const response = await fetch(`${apiUrl}/platforms?key=${apiKey}`);
    if (!response.ok)
      throw new Error(`Failed to fetch platforms: ${response.status}`);

    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error(`Error fetching platforms: ${error.message}`);
    return [];
  }
};

export const fetchGameDetails = async (id) => {
  try {
    const response = await fetch(`${apiUrl}/games/${id}?key=${apiKey}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching game details:", error);
    return null;
  }
};
