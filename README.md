# HomiFi – Where Ideas Find a Home (Frontend)

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

## 🔗 How Frontend & Backend Work Together

HomiFi consists of two repositories that should be placed together in a **single parent folder**:

```
HomiFi/
│
├── frontend/       # React + Vite app
└── backend/        # Node.js + Express + MongoDB API
```

The **frontend communicates with the backend** through **HTTP requests (Axios)**:

* `GET /api/blogs` → Fetch all blogs  
* `POST /api/blogs` → Create a blog  
* `POST /api/blogs/:id/comments` → Add a comment  

This setup keeps frontend and backend separate but working together seamlessly.

---

## ⚙️ Installation (Frontend + Backend)

### 1️⃣ Organize Repos in One Folder

```bash
mkdir HomiFi
cd HomiFi

# Clone frontend and backend
git clone https://github.com/Harmandeeep2312/HomiFi-Frontend.git frontend
git clone https://github.com/Harmandeeep2312/HomiFi-Backend.git backend
```

### 2️⃣ Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:

```env
PORT=8080
MONGO_URI=mongodb://localhost:27017/homifi
SESSION_SECRET=your_secret_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:8080/auth/google/callback
```

Run backend:

```bash
npm run dev
```

Backend runs at **[http://localhost:8080](http://localhost:8080)**

---

### 3️⃣ Setup Frontend

```bash
cd ../frontend
npm install
```

Create a `.env` file in `frontend/`:

```env
VITE_API_URL=http://localhost:8080
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

Run frontend:

```bash
npm run dev
```

Frontend runs at **[http://localhost:5173](http://localhost:5173)**

---

### 4️⃣ Open in Browser

* Visit [http://localhost:5173](http://localhost:5173) → React frontend  
* It connects to backend APIs at [http://localhost:8080](http://localhost:8080)  

✅ Anyone can run **both frontend and backend together** from a single parent folder.

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

