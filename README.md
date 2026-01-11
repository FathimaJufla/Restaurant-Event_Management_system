# An-Najeeb Restaurant - Full Stack Web Application

A complete restaurant management system built with **Django REST Framework** (Backend) and **React + Tailwind CSS** (Frontend).

## 🚀 Features
- **Authentication**: JWT-based Login, Register, Password Reset.
- **Menu Management**: Dynamic product listing managed via Django Admin.
- **Ordering System**: Shopping cart, Checkout flow, and Order history.
- **Reservations**: Table booking system with email notifications.
- **Contact Form**: User feedback system.
- **Admin Dashboard**: Full control over Products, Orders, Reservations, and Users.

## 🛠 Tech Stack
- **Backend**: Python, Django, Django REST Framework, PostgreSQL.
- **Frontend**: React, Vite, Tailwind CSS, Axios.
- **Database**: PostgreSQL.

---

## 📦 Setup Instructions

### 1. Backend Setup
1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```
2.  Create and activate a virtual environment (optional but recommended):
    ```bash
    python3 -m venv venv
    source venv/bin/activate  # Mac/Linux
    # venv\Scripts\activate  # Windows
    ```
3.  Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```
4.  Configure Database:
    - Ensure PostgreSQL is running.
    - Create a database named `restaurant_db`.
    - Update `backend/settings.py` `DATABASES` config if your credentials differ from the defaults (`restaurant_user`/`restaurant@123`).
5.  Run Migrations:
    ```bash
    python manage.py migrate
    ```
6.  Create Superuser (for Admin panel):
    ```bash
    python manage.py createsuperuser
    ```
7.  Start Server:
    ```bash
    python manage.py runserver
    ```
    Backend will run at `http://localhost:8000`.

### 2. Frontend Setup
1.  Navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```
3.  Start Development Server:
    ```bash
    npm run dev
    ```
    Frontend will run at `http://localhost:5173`.

---

## 🔑 Admin Credentials (Default)
If you created the superuser as suggested in the walkthrough:
- **URL**: [http://localhost:8000/admin](http://localhost:8000/admin)
- **Email**: `admin@example.com` (or whatever you set)
- **Password**: `admin123` (or whatever you set)

## 📡 API Endpoints
- **Auth**: `/api/auth/` (register, login, refresh, reset-password)
- **Products**: `/api/products/`
- **Orders**: `/api/orders/`
- **Reservations**: `/api/reservations/`
- **Contact**: `/api/contact/`

## 📧 Email Testing
Emails (Password Reset, Order Confirmation) are currently configured to print to the **Console/Terminal** where the backend is running.
To change this to real SMTP (Gmail, etc.), update `EMAIL_BACKEND` in `backend/settings.py`.
