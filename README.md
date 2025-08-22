# Next.js Auth & Product Dashboard

This is a **Next.js project** with authentication using **NextAuth.js** and **MongoDB** as the database.
It includes **login/signup functionality** and a protected dashboard route where users can add products.

---

## 🚀 Getting Started

First, clone the repo and install dependencies:

```bash
git clone <your-repo-url>
cd <your-project-folder>
npm install


MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret



npm run dev
# or
yarn dev


Routes Summary

/ → Landing/Home page

/login → User login (NextAuth)

/register → User signup

/dashboard → Private dashboard (requires login)

/dashboard/add-product → Add product (protected route)

/api/auth/[...nextauth] → NextAuth API route

/api/product → API endpoint for products