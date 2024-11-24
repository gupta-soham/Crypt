# Crypt

Crypt is a web application designed to provide students with a safe and confidential space to discuss academic topics, share insights and connect with a supportive community anonymously. It is specifically built for students to engage in open, honest conversations without revealing their identities.

## Table of Contents

- 🚀 [Getting Started](#getting-started)
- ✨ [Features](#features)
- 📜 [Scripts](#scripts)
- 🛠 [Technologies Used](#technologies-used)
- 🤝 [Contributing](#contributing)
- 📄 [License](#license)

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Install the latest LTS version from [nodejs.org](https://nodejs.org/)
- **pnpm**: Install pnpm globally using `npm install -g pnpm`

### Installation

1. **Clone the repository**

2. **Navigate to the project directory**:

   ```bash
   cd Crypt
   ```

3. **Install dependencies**:

   ```bash
   pnpm install
   ```

4. **Copy the example environment variables file and configure it**:

   ```bash
   cp .env.example .env
   ```

   > Rename the `.env.example` file to `.env` and update it with your configuration.

5. **Run the development server**:

   ```bash
   pnpm dev
   ```

   The app will be running at [http://localhost:3000](http://localhost:3000).

## ✨ Features

- 🔄 **Infinite scrolling** for dynamically loading posts
- 🔐 **Authentication** using NextAuth & Google
- 📰 **Custom feed** for authenticated users
- ⚡ **Advanced caching** using Upstash Redis
- 🚀 **Optimistic updates** for a great user experience
- 📡 **Modern data fetching** using React Query
- 📝 A **beautiful and highly functional post editor**
- 🖼️ **Image uploads** & **link previews**
- 💬 **Full comment functionality** with nested replies

## 📜 Scripts

- **Start Development Server**:

  ```bash
  pnpm dev
  ```

- **Build for Production**:

  ```bash
  pnpm build
  ```

- **Start Production Server**:
  ```bash
  pnpm start
  ```

## 🛠 Technologies Used

- **Next.js**: React framework for server-rendered applications.
- **TypeScript**: Type safe superset of JavaScript.
- **Tailwind CSS**: Utility-first CSS framework.
- **Prisma**: ORM in conjunction with PostgreSQL DB.
- **Editor.js**: Block-styled editor for rich text content.
- **UploadThing**: Simple file uploading solution.
- **Redis**: Caching backend for post-processing.

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements. Before contributing, please take a moment to review the guidelines below.

1. **Fork the repository**: Create your own copy of the repository.
2. **Create a branch**: Create a new branch for each feature or bug fix.
3. **Make your changes**: Make the necessary changes in your branch.
4. **Test your changes**: Ensure everything works correctly and build successfully.
5. **Submit a pull request**: Open a pull request to merge your changes into the main repository.

Please follow the guidelines and make sure your contributions are aligned with the project goals.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Any contributions you make will be under the MIT Software License

In short, when you submit code changes, your submissions are understood to be under the same [MIT License](http://choosealicense.com/licenses/mit/) that covers the project. Feel free to contact the maintainers if that's a concern.

---

Made with ❤️ by [Soham Gupta](https://github.com/gupta-soham)
