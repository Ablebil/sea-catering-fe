# SEA Catering

SEA Catering is a web-based meal plan & subscription application that helps customers easily select, order, and manage healthy meal packages. Built using React, TypeScript, and Vite, this application offers a modern, responsive, and fast user experience.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

---

## Features

- Informative landing page with CTAs
- Horizontally scrollable meal plan options
- Subscription form with online payment
- Testimonial carousel & customer review form
- FAQ and Contact Us pages
- User & admin dashboards
- Responsive design (mobile & desktop)
- Modular and easily scalable components

---

## Tech Stack

- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) (build tool)
- [Tailwind CSS](https://tailwindcss.com/) (utility-first CSS)
- [Heroicons](https://heroicons.com/) (icon library)
- [React Router](https://reactrouter.com/) (routing)
- [ESLint](https://eslint.org/) (linting)
- [Vercel](https://vercel.com/) (deployment)

---

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm (v8+) or yarn

### Installation

1.  **Clone repository**

    ```sh
    git clone https://github.com/your-username/sea-catering-fe.git
    cd sea-catering-fe
    ```

2.  **Install dependencies**

    ```sh
    npm install
    # or
    yarn install
    ```

3.  **Copy environment variables**

    ```sh
    cp .env.example .env
    ```

    > _Fill in the `.env` file if necessary (see [Environment Variables](#environment-variables))._

4.  **Start development server**

    ```sh
    npm run dev
    # or
    yarn dev
    ```

5.  **Open in browser**

    ```
    http://localhost:5173
    ```

---

## Project Structure

```
src/
  api/           # API services & configs
  assets/        # Images & static assets
  components/    # Modular UI components
    admin/
    common/
    contact/
    dashboard/
    landing/
    layout/
    mealplan/
    subscription/
  contexts/      # React context (auth, etc.)
  hooks/         # Custom hooks
  pages/         # Main application pages
  types/         # TypeScript types & interfaces
  utils/         # Utility functions
  index.css      # Global styles (Tailwind)
  App.tsx        # Root component
  main.tsx       # Entry point
```

---

## Environment Variables

- The `.env.example` file is available as a reference.
- For standard development, there are no mandatory variables.
- If you add an external API integration, add the variables to `.env` and document them here.

---

## License

MIT License

---

## Acknowledgements

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Heroicons](https://heroicons.com/)
- [Vercel](https://vercel.com/)
