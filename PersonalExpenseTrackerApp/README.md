# 💰 Personal Expense Tracker

A modern and responsive SaaS-style Expense Tracker built with **React**, **Tailwind CSS**, **Redux Toolkit**, and **Node.js** + **MongoDB** on the backend. It helps users manage transactions, track expenses/income, and visualize their spending habits.

## 🚀 Demo



https://github.com/user-attachments/assets/71723132-ad64-4811-abb8-f17d2b44c7ad



## 📦 Features

### ✅ Authentication
- Login & Registration with JWT
- Profile Update and Password Change
- Protected Routes

### 📊 Transactions
- Add income/expense with category and date
- Filter by date, type, or category
- See a list of transactions with edit/delete options

### 🗂 Categories
- Add, update, and delete custom categories
- Visual badges for income/expense categories

### 📈 Dashboard
- View total income, expenses, and balance
- Interactive Doughnut Chart (Chart.js)

### 🌐 UI/UX
- Beautiful responsive UI with Tailwind CSS
- Animations via AOS and Framer Motion
- Alerts for success/error/loading states



## 🛠️ Tech Stack

### ⚙️ Frontend
- **React** + **Vite**
- **Tailwind CSS**
- **Formik + Yup** (Form Handling & Validation)
- **Redux Toolkit** (Auth state)
- **React Query** (Data Fetching & Mutation)
- **React Router DOM**
- **Chart.js** (via `react-chartjs-2`)
- **React Icons**, **Heroicons**, **AOS**, **Framer Motion**

### 🔧 Backend
- **Node.js** + **Express**
- **MongoDB** + **Mongoose**
- **JWT Authentication**
- **REST API** (CRUD for categories, transactions, users)
- **bcryptjs**, **cors**, **dotenv**


## 🔐 Auth Flow

- JWT is stored in `localStorage` after login.
- Redux reads token from storage at app start.
- Protected routes (via `AuthRoute`) ensure access only when logged in.
- API headers include Bearer token.
- React Query fetches only after auth is ready (via `useAuthReady` hook).



## 📧 Contact

- Built by Jai Vadula, Devansh Mittal, Abhay Prasad
- 📫 Email: jai.vadula2021@vitbhopal.ac.in, abhay.prasad2021@vitbhopal.ac.in, devansh.mittal2021@vitbhopal.ac.in


