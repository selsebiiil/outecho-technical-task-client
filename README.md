# Next.js Project

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### Clone the Repository

First, clone the repository to your local machine:

```bash
git clone <repository-url>
cd <repository-name>
```

Install Dependencies
Navigate to the root folder and install the required dependencies using your preferred package manager:

```bash
pnpm install
# or
npm install
# or
yarn install
```

Environment Variables
Create a .env.local file in the root directory and add the following variables:

API_URL=http://localhost:3000  
NEXTAUTH_URL=http://localhost:4000  
AUTH_SECRET=
NEXT_PUBLIC_API_URL=http://localhost:3000

Generating an AUTH_SECRET
If you want to generate your own AUTH_SECRET, you can use the following command:

```bash
openssl rand -base64 32
```

Run the Development Server
Start the development server with one of the following commands:

```bash
pnpm dev
# or
npm run dev
# or
yarn dev
```
