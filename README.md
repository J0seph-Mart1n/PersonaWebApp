# Persona App

Welcome to the Persona App! This is a Next.js (React 19) application that serves as the highly interactive user interface for the Persona Knowledge Graph and AI Profiling system.

## 🚀 Features & Functionality

*   **Firebase Authentication:** Secure, seamless user login and session management powered by Firebase.
*   **Interactive MBTI Assessment:** A custom 30-question personality assessment that acts as the baseline for the user's vector embeddings.
*   **Knowledge Graph Visualization:** Stunning interactive 2D and 3D force-directed graphs (via `react-force-graph`) that visualize the user's interconnected multi-dimensional profile (Traits, Domains, and Entities) pulled dynamically from the Neo4j backend.
*   **Multi-Modal Ingestion UI:** A dedicated **Settings** page that allows users to upload PDF Resumes or sync their GitHub profiles, triggering the Node.js backend's Playwright scraper and Groq/HuggingFace extraction pipelines.
*   **Context-Aware Chat:** An interactive LLM chat interface that queries the vector space to provide hyper-personalized feedback and career coaching based on the user's mapped data.
*   **Radar Chart Summaries:** Visual breakdown of the user's dominant psychological and professional traits mapped onto SVG-native radar charts.

## 🛠️ Technology Stack

*   **Framework:** Next.js (App Router)
*   **UI / Components:** React 19, Tailwind CSS v4
*   **Graph Rendering:** `react-force-graph-2d`, `react-force-graph-3d`, `three`, `three-spritetext`
*   **Authentication:** Firebase Authentication
*   **Styling Engine:** Vanilla CSS & Tailwind with heavy CSS variables (custom color tokens, grid backgrounds, glassmorphism)

## 📦 Setup & Installation

1.  **Clone / Navigate to the Directory:**
    ```bash
    cd persona_app
    ```

2.  **Install Dependencies:**
    Ensure you are using a modern version of Node.js.
    ```bash
    npm install
    ```

3.  **Environment Variables:**
    Create a `.env.local` file in the root of the `persona_app` folder with your Firebase configuration variables. 
    ```env
    NEXT_PUBLIC_FIREBASE_API_KEY="your-api-key"
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your-project.firebaseapp.com"
    NEXT_PUBLIC_FIREBASE_PROJECT_ID="your-project-id"
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your-project.appspot.com"
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="your-sender-id"
    NEXT_PUBLIC_FIREBASE_APP_ID="your-app-id"
    ```
    *(Note: Ensure your backend server is running on `http://localhost:5000` as the frontend relies on this port for API calls like `/api/ingest/resume`, `/api/chat`, and `/api/graph/:userId`.)*

4.  **Run the Development Server:**
    ```bash
    npm run dev
    ```
    The application will be available at [http://localhost:3000](http://localhost:3000).

## 📂 Project Structure Highlights

*   `src/app/page.tsx`: The landing page and authentication entry point.
*   `src/app/Assessment/page.tsx`: The 30-question interactive MBTI quiz.
*   `src/app/ResultsSummary/page.tsx`: Dashboard displaying the Radar Chart and Vector Graph.
*   `src/app/Settings/page.tsx`: File upload (Resume) and Social sync (GitHub).
*   `src/app/Chat/page.tsx`: Context-aware LLM interaction interface.
*   `src/app/globals.css`: Contains the core Vector.OS design tokens (animations, colors, and layout modifiers).
