const apiKey = process.env.REACT_APP_RAWG_API_KEY;
const apiUrl = process.env.REACT_APP_RAWG_API_URL;

/**
 * Fetch games with optional filters: query, genre, score, platform, and date range.
 */
export const fetchGames = async (
  query = "",
  genre = "",
  score = "",
  platform = "",
  pageSize = 40,
) => {
  try {
    let url = `${apiUrl}/games?key=${apiKey}&page_size=${pageSize}`;
    console.log("url", url);
    // Add search query if available
    if (query) {
      url += `&search=${encodeURIComponent(query)}`;
    }

    // Add genre filter if available
    if (genre) {
      url += `&genres=${encodeURIComponent(genre)}`;
    }

    // Add metacritic score filter if available
    if (score) {
      url += `&metacritic=${encodeURIComponent(score)}`;
    }

    // Add platform filter if available
    if (platform) {
      url += `&platforms=${encodeURIComponent(platform)}`;
    }
    console.log("url", url);

    // Add date range filter if available
    // if (startDate) {
    //   const formattedStartDate = new Date(startDate).toISOString().split('T')[0];
    //   const formattedEndDate = endDate ? new Date(endDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
    //   url += `&dates=${formattedStartDate},${formattedEndDate}`;
    // }

    const response = await fetch(url);
    console.log("response", response);
    if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);

    const data = await response.json();
    // console.log('data', JSON.stringify(data))
    console.log(
      "Game names:",
      data.results.map((game) => game.name).join(", "),
    );

    return data.results || []; // Return an empty array if no results
  } catch (error) {
    console.error(`Error fetching games: ${error.message}`);
    return [];
  }
};

/**
 * Fetch the list of genres.
 */
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

/**
 * Fetch the list of platforms.
 */
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
