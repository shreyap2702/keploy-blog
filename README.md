# Keploy Docs

## What is this repository about
This repository is the frontend codebase for the Keploy documentation website. It is designed to be a minimal, file-driven static site that renders technical documentation and guides.

## What is this documentation about
The documentation explains how to use Keploy, an API testing platform. The content covers topics such as prerequisites, running tests, debugging, analyzing test results, and troubleshooting common issues.

## Components and Requirements
This website is built with the following technologies:
- Next.js 16 (App Router)
- React 19
- Tailwind CSS 4
- MDX for authoring content (@mdx-js/react, next-mdx-remote)
- TypeScript

To run the project locally, the requirements are:
- Node.js (version 20 or higher)
- A package manager like npm, pnpm, or yarn

You can start the development server by installing dependencies and running `npm run dev`.

## Structure of this repository
The project follows standard Next.js directory structures combined with a content folder for MDX files:
- /app: Contains the core Next.js application, layouts, and page routes.
- /components: Reusable user interface elements like the Navigation bar and Sidebar.
- /content: Stores the primary documentation written in Markdown/MDX format. The site dynamically generates pages based on these files.
- /public: Holds static files, such as logo images and screenshots referenced in the content.

## UX Features
Small quality-of-life features added to improve the reading experience:
- Dark and light mode toggle
- Command palette (Cmd+K) for quick navigation across sections
- Reading progress bar that fills as you scroll through a page
- Copy button on all code blocks
- Active section highlight in the sidebar as you scroll
- Estimated read time displayed at the top of each page
- Keyboard shortcuts — use arrow keys to navigate between pages