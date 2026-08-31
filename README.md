# Staylo 🏠

> A modern, responsive web application for finding verified PGs, hostels, and rental stays near college campuses.

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED?style=flat-square&logo=docker&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-2088FF?style=flat-square&logo=githubactions&logoColor=white)

---

## ✨ Features

- 🔍 **Smart Property Search**: Filter accommodations by location, type (PG, Flat, Hostel), and price range.
- 🛡️ **Verified Listings**: Detailed property pages with photos, amenities, user reviews, and star ratings.
- 📅 **Interactive Booking**: Seamless booking flow with calendar availability check and instant booking confirmations.
- 👤 **Dual Portals**:
  - **Student Portal**: Browse stays, manage bookings, and leave property reviews.
  - **Owner Portal**: List properties, upload images, track views, and manage booking requests.
- ⚡ **Blazing Fast**: Powered by Vite and optimized Nginx static asset caching.
- 🐳 **Container Ready**: Production-grade Docker multi-stage build with SPA client-side routing fallback.

---

## 🛠️ Tech Stack

| Domain | Technologies |
| :--- | :--- |
| **Frontend Core** | React 18, TypeScript, Vite |
| **Styling & UI** | Tailwind CSS, shadcn/ui, Radix UI, Lucide Icons |
| **State & Fetching** | TanStack React Query, React Router DOM |
| **DevOps & Infra** | Docker, Nginx, Docker Compose, GitHub Actions CI |

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed locally:
- [Node.js](https://nodejs.org/) (v20 or higher)
- [npm](https://www.npmjs.com/) or [bun](https://bun.sh/)
- [Docker](https://www.docker.com/) *(optional, for containerized running)*

---

### Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/Staylo.git
   cd Staylo
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   *(Default backend API endpoint: `VITE_API_URL=http://localhost:8081/api`)*

4. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:8080` in your browser.

---

## 🐳 Running with Docker

### Using Docker Compose (Recommended)
```bash
docker-compose up -d --build
```
Access the application at `http://localhost:8080`.

### Using Docker CLI
```bash
# Build the Docker image
docker build -t staylo-frontend .

# Run the container
docker run -d -p 8080:80 --name staylo-frontend staylo-frontend
```

---

## 🧪 Linting & Quality Checks

Run ESLint code verification:
```bash
npm run lint
```

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for details.
