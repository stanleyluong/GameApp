# GameApp

GameApp is a modern web application that allows users to search for and explore details about various video games. It is built with React, uses Material-UI for design, and integrates with the RAWG API to fetch game data such as release dates, ratings, genres, platforms, and more. The app supports dark and light themes, table and card view toggling, and includes pagination for game lists.

## Features

- **Search Bar**: Users can search for games by name, genre, platform, and Metacritic score.
- **Game List**: Displays a list of games with options to toggle between a card grid and table view.
- **Game Details**: Clicking on a game shows detailed information including ratings, genres, platforms, and screenshots.
- **Dark Mode**: Switch between light and dark themes.
- **Responsive Design**: Optimized for mobile and desktop use with responsive styling.
- **Pagination**: View more games with pagination.

## Technologies Used

- **React**: For building the user interface.
- **Material-UI**: Provides a modern and responsive design with pre-built components.
- **React Router**: For client-side routing to manage the game list and details pages.
- **RAWG API**: Used to fetch game data such as names, ratings, and platform information.
- **SASS/SCSS**: For styling, including responsive design and dark mode.

## Installation and Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/stanleyluong/game-app.git
   cd game-app
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up RAWG API**:

   - Go to [RAWG.io](https://rawg.io/apidocs) and get your API key.
   - Add your API key in a `.env` file in the root directory:
     ```
     REACT_APP_RAWG_API_KEY=your-api-key
     ```

4. **Run the application**:

   ```bash
   npm start
   ```

   The app will start running locally at [http://localhost:3000](http://localhost:3000).

## Usage

- **Search for games**: Use the search bar to find games by name, genre, platform, or Metacritic score.
- **Toggle views**: Use the buttons to switch between the table view and grid (card) view.
- **Dark/Light mode**: Toggle between dark and light modes using the button in the top-right corner.
- **Pagination**: Navigate between pages to see more games.

## Project Structure

```
src/
├── components/
│   ├── GameDetails.js     # Displays detailed information for a selected game
│   ├── GameList.js        # Shows the list of games in a table
│   ├── GameGrid.js        # Shows the list of games in a grid view
│   ├── SearchBar.js       # Provides the search functionality
│   └── Home.js            # Main page where the search bar and game list/grid are displayed
├── utils/
│   └── platformIcons.js   # Handles platform icons for different gaming platforms
├── services/
│   └── api.js             # Fetches data from the RAWG API
└── styles.scss            # Global and component-specific styling
```

## API Integration

The application uses the **RAWG API** to fetch game data. To use the API:

- Sign up for an API key at [RAWG.io](https://rawg.io/apidocs).
- Use the API key in your `.env` file.

### Example API Call

```js
const fetchGames = async (query, genre, score, platform) => {
  const response = await fetch(
    `https://api.rawg.io/api/games?key=${process.env.REACT_APP_RAWG_API_KEY}&search=${query}&genres=${genre}&platforms=${platform}&metacritic=${score}`,
  );
  const data = await response.json();
  return data.results;
};
```

## Contributing

Feel free to submit issues or pull requests if you'd like to contribute to this project!

## License

This project is licensed under the MIT License.
