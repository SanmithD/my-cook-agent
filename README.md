# 🍳 CookMate

A recipe management web app built with **Next.js 13 (App Router)**, **MongoDB**, **Zustand**, and **Cloudinary**.  
You can add, browse, and search recipes with images, categories, and step-by-step instructions.

Live Link - https://my-cook-agent.vercel.app/
---

## 📂 Project Structure
```bash

my-cook-agent/
├── app/
│ ├── api/ # API routes (CRUD for dishes, agents, etc.)
│ ├── components/ 
│ ├── hook/ 
│ ├── lib/ 
│ ├── models/ 
│ ├── store/ # Zustand stores (global state management)
│ ├── tools/
│ ├── layout.tsx 
│ ├── page.tsx
│ └── globals.css 
├── public/
├── .env.local
├── next.config.js 
├── package.json
├── tsconfig.json
├── postcss.config.js
├── eslint.config.mjs 
└── README.md 
```


---

## 🚀 Features

- 📖 View latest recipes by category  
- 🔍 Search recipes by name  
- ➕ Add new recipes with images (Cloudinary upload)  
- ✏️ Update or delete recipes  
- 🍴 Categorize dishes (main-course, dessert, drinks, etc.)  
- ⚡ API routes powered by Next.js App Router  
- 🗄 MongoDB with Mongoose models  
- 🌐 Global state with Zustand  

---

## 🛠️ Tech Stack

- [Next.js 13](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [MongoDB + Mongoose](https://mongoosejs.com/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [Cloudinary](https://cloudinary.com/) (image storage)
- [TailwindCSS](https://tailwindcss.com/)

---

## ⚙️ Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/SanmithD/my-cook-agent.git
cd my-cook-agent

npm install
# or
yarn install
```

# Configure environment variables

# MongoDB connection
MONGODB_URI=your_mongodb_connection_string

# Cloudinary credentials
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret


# Available Scripts

npm run dev → Run development server

npm run build → Build for production

npm start → Run production server

npm run lint → Lint with ESLint

# 🤝 Contributing

Contributions are welcome! Please fork the repo and submit a pull request.

# 📜 License

MIT License © Sanmith

🔗 GitHub Repo - https://github.com/SanmithD/my-cook-agent.git

# 👉 CookMate

---

Do you want me to also add a **"Deployment" section** (like Vercel setup with environment variables) so others can quickly deploy your app?
