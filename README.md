# PhotoStock

PhotoStock is a simple, modern web application for uploading and viewing photos. It features a clean, responsive grid layout for browsing images and a straightforward upload process. The project is built with React and Vite, utilizing Firebase for backend storage.

## Features

- **Responsive Photo Grid**: Displays images in a responsive grid that adapts to different screen sizes.
- **Image Upload**: Users can upload new images, which are then stored in Firebase Storage.
- **Upload Progress**: Visual feedback on the upload progress.
- **Image Preview**: Click on any image in the grid to view a larger, full-screen preview with smooth animations.
- **Real-time Updates**: The photo grid automatically refreshes after a new image is uploaded.

## Tech Stack

- **Frontend**: React, TypeScript
- **Build Tool**: Vite
- **Styling**: Sass (SCSS Modules)
- **Animations**: `motion/react`
- **Backend & Storage**: Firebase Storage

## Setup and Installation

To run this project locally, follow these steps:

1.  **Clone the repository:**

    ```sh
    git clone https://github.com/aulanchik/photostock.git
    cd photostock
    ```

2.  **Install dependencies:**
    This project uses `pnpm`. If you don't have it, install it first (`npm install -g pnpm`).

    ```sh
    pnpm install
    ```

3.  **Set up Firebase:**

    - Create a Firebase project at [firebase.google.com](https://firebase.google.com/).
    - Enable Firebase Storage.
    - In your Firebase project settings, find your web app's configuration details.
    - Create a `.env` file in the root of the project and add your Firebase configuration keys, prefixed with `VITE_`:

    ```env
    VITE_FIREBASE_APP_ID="your-app-id"
    VITE_FIREBASE_API_KEY="your-api-key"
    VITE_FIREBASE_PROJECT_ID="your-project-id"
    VITE_FIREBASE_AUTH_DOMAIN="your-auth-domain"
    VITE_FIREBASE_STORAGE_BUCKET="your-storage-bucket"
    VITE_FIREBASE_MESSAGING_SENDER_ID="your-messaging-sender-id"
    ```

4.  **Run the development server:**
    ```sh
    pnpm dev
    ```
    The application will be available at `http://localhost:5173`.

## Available Scripts

In the project directory, you can run:

- `pnpm dev`: Runs the app in development mode.
- `pnpm build`: Builds the app for production to the `dist` folder.
- `pnpm lint`: Lints the codebase using ESLint.
- `pnpm preview`: Serves the production build locally for previewing.

## Project Structure

The project follows a component-based architecture with separated logic and styles.

```
src/
├── components/       # Reusable React components (Grid, Header, Upload, etc.)
├── firebase/         # Firebase client initialization and configuration
├── hooks/            # Custom React hooks for data fetching and uploading
│   ├── useFetch.ts   # Hook to fetch all images from Firebase Storage
│   └── useUpload.ts  # Hook to handle file uploads to Firebase Storage
├── styles/           # SCSS module files for component styling
├── utils/            # Utility functions (e.g., for accessing env variables)
└── App.tsx           # Main application component
```
