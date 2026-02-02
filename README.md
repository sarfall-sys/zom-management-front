### Management System Frontend – React + Tailwind + Vite

A modern, responsive, and scalable frontend for the **Management System**, built with **React**, **Vite**, and **Tailwind CSS**.  
Designed with reusable components, protected routes, custom theming, and full integration with the Laravel Sanctum API.

The system includes an **Admin Panel**, dashboards, user roles (Admin, Staff, Manager), CRUD modules, charts, and a Dark Mode theme.

---

## 🚀 Features

### 🧱 Core Architecture
- **React JS** with functional components
- **Vite** for fast development & optimized builds
- **React Router** for navigation and route protection
- **Custom Hooks** for fetching, forms, authentication, and theme management
- **Reusable Components** for inputs, tables, modals, cards, etc.

### 🎨 UI & Styling
- **Tailwind CSS** for utility-first styling
- **Customized Tailwind theme** (colors, fonts, spacing)
- **Dark Mode** with Theme Context
- **Responsive layout** for desktop, tablet, and mobile
- **Lucide / Hero Icons** (or your icon library)

### 📊 Dashboards & Charts
- **Recharts** used for:
  - Sales charts
  - Product statistics
  - User activity
  - Trends & KPIs

### 🔐 Authentication & Authorization
- Login system connected to the API
- **Auth Context** for global user and token handling
- Persistent login saved in localStorage / sessionStorage
- **Protected Routes**
- **Public Routes**
- Role-based views:
  - Admin Panel
  - Staff Panel
  - Manager Panel

### 🌐 API Layer
- Centralized **API service** using Axios (or fetch)
- Axios interceptor for automatic token inclusion
- `.env` environment variables:

VITE_API_BASE_URL=http://localhost:8000/api

---
- Service modules for:
- Auth
- Products
- Categories
- Users
- Roles
- Dashboard data

### 🧩 Modules Included
- Authentication (login/logout)
- Dashboard with charts & metrics
- User Management
- Product CRUD
- Category CRUD
- Role-based UI rendering
- Global loading and toast notifications (if implemented)

---

## 📁 Project Structure
src/
├── api/
│ └── apiService.js
├── components/
│ ├── commons/
│ └── layouts/
├── context/
│ ├── AuthContext.jsx
│ └── ThemeContext.jsx
├── hooks/
│ ├── useAuth.js
│ ├── useTheme.js
│ ├── useFetch.js
│ └── useForm.js
├── pages/
│ ├── admin/
│ │ └── AdminDashboard.jsx
│ │ └── UserCreate.jsx
│ │ └── UserEdit.jsx
│ │ └── UserList.jsx
│ ├── products/
│ ├── categories/
├── routes/
│ ├── ProtectedRoute.jsx
│ └── AppRoutes.jsx
├── service/
│ │ └── AdminService.js
│ │ └── ApiService.js
├── styles/
├── App.jsx
├── main.jsx
└── index.css


---

## 🎨 Tailwind Custom Configuration

Tailwind has been extended with custom theme values:

- Custom colors (brand colors)
- Custom font families
- Custom spacing & breakpoints

Example (`tailwind.config.js`):

```js
theme: {
  extend: {
    colors: {
       bg: {
          light: '#F8FAFC',
          dark: '#020617',
        },
       text: {
          light: '#1F2937',
          dark: '#E5E7EB',
          mutedLight: '#6B7280',
          mutedDark: '#9CA3AF',
        },
    }
  }
}

````

----
 ##🧪 Reusable Components

The project includes shared UI elements such as:

-Buttons

-Modals

-Form Inputs

-Tables

-Cards

-Sidebar / Navbar

Charts (Bar, Line, Pie, etc.)

Each is built to be easily reused across modules.


--- 
##📊 Dashboard with Recharts
The dashboard includes visualizations such as:
- User Stats
- Product Stats
- Products per Brand Chart
- Products per Subfamily Chart

  ---
  ## Admin Panel

Admin
- Full control over Users, Roles.
  
----
##📝 License

This project is licensed under the MIT License (or your chosen license).

---
## 📸 Screenshots

<img width="1892" height="847" alt="image" src="https://github.com/user-attachments/assets/5386649c-946a-49d7-9b74-af65a5408eac" />

<img width="1895" height="870" alt="image" src="https://github.com/user-attachments/assets/28046429-5c9b-4261-afad-de8acc6b05ac" />

<img width="1665" height="853" alt="image" src="https://github.com/user-attachments/assets/2306fc20-8f7c-4d3e-9078-a6717538ef2f" />

<img width="1890" height="878" alt="image" src="https://github.com/user-attachments/assets/21afe070-5694-49ab-a350-00f7a3d078e5" />

<img width="1473" height="891" alt="image" src="https://github.com/user-attachments/assets/3c47340b-2784-41a0-8a3d-61ca3a544530" />

<img width="1426" height="882" alt="image" src="https://github.com/user-attachments/assets/470f09c7-8684-4c36-ac32-deaf082b13e7" />

