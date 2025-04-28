# React Polls

A modern polling application built with React, TypeScript, and Vite that allows users to create, manage, and vote on polls. This was developed as a small assignment project.

## Features

- **Poll Management**: Create, view, and close polls
- **Voting System**: Vote on open polls with real-time results
- **Admin Dashboard**: Special admin interface for managing all polls
- **Data Visualization**: View poll results with interactive pie charts

## Tech Stack

- **Frontend**: React 19 with TypeScript
- **Routing**: React Router v7
- **UI Components**: Ant Design
- **Styling**: Tailwind CSS
- **Data Visualization**: Chart.js with React-ChartJS-2
- **Build Tool**: Vite
- **Testing**: Vitest with React Testing Library
- **State Management**: React Context API

## Getting Started

### Prerequisites

- Node.js (latest LTS version recommended)
- pnpm (or npm/yarn)

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/yourusername/react-polls.git
   cd react-polls
   ```

2. Install dependencies

   ```bash
   pnpm install
   ```

3. Start the development server

   ```bash
   pnpm dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `pnpm dev` - Start the development server
- `pnpm build` - Build the application for production
- `pnpm preview` - Preview the production build locally
- `pnpm lint` - Run ESLint to check for code issues
- `pnpm test` - Run tests with Vitest
- `pnpm test:ui` - Run tests with the Vitest UI

## Application Structure

- `/src` - Source code
  - `/components` - Reusable UI components
  - `/pages` - Page components
  - `/hooks` - Custom React hooks
  - `/assets` - Static assets
  - `/types.ts` - TypeScript type definitions

## User Roles

- **Admin**: Can create, view, and manage all polls
- **User**: Can view and vote on open polls

## Data Storage & Authentication

For simplicity of this small assignment, user authentication and application data uses browser localStorage for data persistence.

## Testing

The application includes comprehensive tests for components and pages using Vitest and React Testing Library.

## License

This project is licensed under the [MIT License](LICENSE)
