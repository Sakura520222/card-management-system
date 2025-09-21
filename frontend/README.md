# CardKey Manager - Frontend

This is the frontend application for the CardKey Manager system. It's built with React and communicates with the backend API to generate and manage card keys.

## Project Structure

```
frontend/
├── public/             # Public assets
│   ├── index.html      # Main HTML file
│   ├── favicon.ico     # Favicon
│   ├── logo192.png     # App logo
│   ├── logo512.png     # App logo
│   └── manifest.json   # Web app manifest
├── src/                # Source code
│   ├── components/     # React components
│   │   ├── CardGenerator.js    # Card generation component
│   │   ├── CardList.js         # Card listing component
│   │   └── common.css          # Common styles
│   ├── api.js          # API client
│   ├── App.js          # Main App component
│   ├── App.css         # App styles
│   ├── index.js        # Entry point
│   └── index.css       # Global styles
├── package.json        # Dependencies and scripts
└── README.md           # This file
```

## Getting Started

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm start
   ```
   The app will be available at http://localhost:3000

3. Build for production:
   ```
   npm run build
   ```
   The build artifacts will be stored in the `build/` directory.

## Development

The frontend is configured to proxy API requests to the backend server during development. Make sure the backend is running on http://localhost:3000.

To configure the API URL for production, set the `REACT_APP_API_URL` environment variable in the `.env` file.
