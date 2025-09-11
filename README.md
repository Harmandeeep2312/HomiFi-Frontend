# HomiFi – Where Ideas Find a Home

## Frontend  
The **frontend** of HomiFi is a modern, responsive web application built with **React (Vite)**.  
It provides a clean and intuitive interface for users to explore, create, and interact with blogs.  

This layer acts as the **user’s gateway** to the platform — whether they want to read inspiring articles, share their own stories, or engage with others through comments.  

🔗 **Backend Repository**  
The backend for HomiFi (Node.js + Express + MongoDB + Google OAuth) is located here:  
👉 [HomiFi Backend Repository](https://github.com/Harmandeeep2312/HomiFi-Backend.git)

📺 **Demo Video & Screenshots**: [Click here](https://drive.google.com/drive/folders/14IBuUbnINqiBrYk3FFAm7wlgXlkgT14v?usp=sharing)

---

## 🌟 What This Frontend Does
- **Beautiful Blog Experience** – Browse and read blogs in a distraction-free, responsive design.  
- **Seamless Blog Creation** – Authenticated users can create and publish blogs directly from the interface.  
- **Interactive Commenting** – Engage with the community by adding comments to any blog.  
- **Google Authentication** – Log in securely with Google OAuth 2.0, without managing separate credentials.  
- **Dynamic UI** – Fast navigation and rendering powered by Vite + React.  

---

## 📂 Project Structure
```
client/
│── public/          # Static assets
│── src/             # React source code
│   ├── components/  # Reusable UI components
│   ├── pages/       # App pages
│   ├── context/     # Context providers
│   ├── App.jsx
│   └── main.jsx
│── index.html
│── vite.config.js   # Vite configuration
│── package.json
│── .env             # Environment variables
```

---

## ⚙️ Installation

1. Navigate to the frontend folder:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in `client/`:
   ```env
   VITE_API_URL=http://localhost:5173   # backend API URL
   VITE_GOOGLE_CLIENT_ID=your_google_client_id
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```
   The app should now run at [http://localhost:5173](http://localhost:5173).

---

## 📦 Build for Production
```bash
npm run build
npm run preview
```

---

## 🛠 Tech Stack
- **React + Vite** – Modern frontend stack for speed and developer experience  
- **Axios** – To communicate with backend APIs  
- **Google OAuth 2.0** – Secure login  

---

## 📜 License
This project is licensed under the MIT License.
