# 🛍️ Gurudeb Enterprise — Premium Tech E-Commerce Hub

Welcome to **Gurudeb Enterprise**, a premium, high-performance e-commerce frontend built specifically for smart gadget enthusiasts across Bangladesh. Sourcing authentic laptops, mobile phones, and smart digital accessories, this project delivers a state-of-the-art shopping experience with robust animations, sleek layouts, and optimal performance.

---

## 🛠️ Tech Stack & Key Features

* **Core Framework**: React 19 (powered by Vite) for ultra-fast, instant hot-reloading.
* **Styling**: Tailwind CSS v4 (with `@tailwindcss/vite` plugin) & DaisyUI 5 for modern, cohesive brand identity.
* **Routing**: React Router v7 with global scroll-to-top hooks for flawless single-page transitions.
* **Animations**: Framer Motion & custom keyframe stagger animations for interactive, premium visuals.
* **Icons**: React Icons (Fa6, Io5, Tb) & Lucide Icons.
* **Optimization**:
  * Capped Homepage product grids (30 items) to guarantee perfect grid symmetry with **zero empty slots** across 5-column (laptops) and 6-column (desktops) screens.
  * Replaced infinite scrolling on product pages with a premium **"Load More"** flow featuring in-grid responsive skeleton layouts.
  * Custom pure SVG-based **Rating Star component**, completely eliminating heavy framework dependencies (Material UI/Emotion) to achieve rapid loading times.

---

## 🚀 How to Run the Project (Step-by-Step from Scratch)

### 0️⃣ Step 0: Clone the Repository & Navigate
Before starting, open your terminal and run the following commands to clone the repository and enter the project folder:

```bash
# Clone this repository from GitHub
git clone https://github.com/plabondas001/gurudev_theme.git

# Move into the project directory
cd Gurudev_theme
```

---

### 1️⃣ Option A: The NPM Way (Recommended for Local Development)

Ensure you have [Node.js](https://nodejs.org/) installed (v20+ recommended).

#### Step 1: Install Dependencies
Open your terminal in the root of the project directory and run:
```bash
npm install
```

#### Step 2: Start the Local Development Server
Launch the hot-reloading development server:
```bash
npm run dev
```
* Once started, open your browser and navigate to the address shown in your terminal (usually `http://localhost:5173`).

#### Step 3: Build for Production
To compile and minify the frontend assets into highly optimized static production files:
```bash
npm run build
```
* The compiled bundle will be saved inside the `dist/` directory.

#### Step 4: Preview Production Build Locally
To preview your compiled production build locally before deployment:
```bash
npm run preview
```

---

### 2️⃣ Option B: The Docker Way (Recommended for Production & Consistent Hosting)

Ensure you have [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running.

#### Using Dockerfile (Standalone Container)

#### Step 1: Build the Docker Image
Build the container image using the root `Dockerfile`:
```bash
docker build -t gurudeb-enterprise .
```

#### Step 2: Run the Docker Container
Spin up the container and map it to port `3000`:
```bash
docker run -d -p 3000:3000 --name gurudeb-app gurudeb-enterprise
```

#### Step 3: Access the Site
Open your browser and navigate to:
```text
http://localhost:3000
```

---

#### Using Docker Compose

If you prefer orchestrating with Docker Compose, you can deploy the stack instantly.

#### Start the Container:
```bash
docker compose up -d
```

#### Stop the Container:
```bash
docker compose down
```

---

## 📂 Project Structure

```text
├── public/                 # Static brand assets (transparent logo, contour favicon)
├── src/
│   ├── api/                # API client module & endpoints setup
│   ├── components/         # Reusable structural, header, footer, & product components
│   ├── context/            # React Context Providers (Auth, Cart, Wishlist, UserData)
│   ├── hooks/              # Custom React utility hooks
│   ├── layouts/            # Global page wraps & layout routing wrappers
│   ├── pages/              # Individual routes (Home, About, Contact, Products, etc.)
│   ├── utils/              # Utility formatting & data scripts
│   ├── App.jsx             # Root entry routing layout
│   ├── index.css           # Global custom stylesheet & theme variables
│   └── main.jsx            # DOM mounting and router configuration
├── Dockerfile              # Docker production serving environment
├── compose.yml             # Docker Compose orchestration configurations
├── tailwind.config.js      # Tailwind customized tokens and configurations
└── vite.config.js          # Vite plugins and bundle builder configuration
```

---

## 🎨 Global Theme Configuration

All primary and secondary colors are controlled centrally via CSS variables. If you wish to update the colors site-wide, simply edit [src/index.css](file:///f:/practice_projects/plabon/Gurudev_theme/src/index.css):

```css
--color-primary: #31714f;    /* Primary brand green */
--color-secondary: #733394;  /* Secondary royal purple */
```
