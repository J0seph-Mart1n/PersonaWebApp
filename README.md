# Persona App

Welcome to the Persona App! This is a Next.js (React 19) application that serves as the highly interactive user interface for the Persona Knowledge Graph and AI Profiling system.

## 🚀 Features & Functionality

*   **100% Offline Single-User System:** Completely decoupled from external cloud auth. All profile data and graphs are stored locally on MongoDB and Neo4j, ensuring total privacy.
*   **Interactive MBTI Assessment:** A custom 30-question personality assessment that acts as the baseline for the user's vector embeddings.
*   **Knowledge Graph Visualization:** Stunning interactive 2D and 3D force-directed graphs (via `react-force-graph`) that visualize the user's interconnected multi-dimensional profile (Traits, Domains, and Entities) pulled dynamically from the Neo4j backend.
*   **Profile Settings UI:** A dedicated **Settings** page that allows users to manage their bio and upload PDF Resumes, triggering the Node.js backend's local LLM (Ollama) extraction pipelines to build out the Neo4j graph.
*   **Context-Aware & Self-Updating Chat:** An interactive LLM chat interface that queries the vector space to provide hyper-personalized feedback. As you converse, the backend asynchronously extracts new traits, domains, and entities from your chat messages to dynamically expand your Neo4j knowledge graph in the background!
*   **Radar Chart Summaries:** Visual breakdown of the user's dominant psychological and professional traits mapped onto SVG-native radar charts.

## 🛠️ Technology Stack

*   **Framework:** Next.js (App Router)
*   **UI / Components:** React 19, Tailwind CSS v4
*   **Graph Rendering:** `react-force-graph-2d`, `react-force-graph-3d`, `three`, `three-spritetext`
*   **Styling Engine:** Vanilla CSS & Tailwind with heavy CSS variables (custom color tokens, grid backgrounds, glassmorphism)

## 📦 Setup & Installation

### Standalone Web Development

1.  **Clone / Navigate to the Directory:**
    ```bash
    cd persona_app
    ```

2.  **Install Dependencies:**
    Ensure you are using a modern version of Node.js.
    ```bash
    npm install
    ```

3.  **Run the Development Server:**
    ```bash
    npm run dev
    ```
    The application will be available at [http://localhost:3000](http://localhost:3000). *(Note: Ensure your backend server is running in a separate terminal on `http://localhost:5000`)*.

## 📂 Project Structure Highlights

*   `src/app/page.tsx`: The landing dashboard grid for navigating the modules.
*   `src/app/Assessment/page.tsx`: The 30-question interactive MBTI quiz.
*   `src/app/Traits/page.tsx`: Dashboard displaying the Radar Chart and dynamic Vector Graph.
*   `src/app/Settings/page.tsx`: Local profile management and file upload (Resume).
*   `src/app/Chat/page.tsx`: Context-aware LLM interaction interface that extracts graph nodes asynchronously.
*   `src/app/globals.css`: Contains the core Vector.OS design tokens (animations, colors, and layout modifiers).
