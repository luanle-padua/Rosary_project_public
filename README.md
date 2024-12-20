# Responsive Layout Project

This project is a responsive layout built with modern web technologies. It includes Firebase configuration for backend services.

## Getting Started

Follow these instructions to set up and run the project on your local machine for development and testing purposes.

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (v6 or higher) or [Yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository**:
    ```sh
    git clone https://github.com/luanle-padua/Rosary_project_public.git
    cd Rosary_project_public
    ```

2. **Install dependencies**:
    ```sh
    npm install
    ```
    or
    ```sh
    yarn install
    ```

3. **Set up environment variables**:

    Create a [.env](http://_vscodecontentref_/1) file in the root directory of the project and add your Firebase configuration:

    ```properties
    VITE_FIREBASE_API_KEY=your-api-key
    VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
    VITE_FIREBASE_PROJECT_ID=your-project-id
    VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
    VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
    VITE_FIREBASE_APP_ID=your-app-id
    VITE_FIREBASE_DATABASE_URL=your-database-url
    ```

### Running the Project

To start the development server, run:

```sh
npm run dev