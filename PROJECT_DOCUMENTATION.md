# An-Najeeb Restaurant - Project Documentation

**Date:** 2026-01-09
**Version:** 1.0

---

## 1. Project Overview

### Purpose
The **An-Najeeb Restaurant** application is a full-stack web platform designed to digitize the restaurant's operations. It allows customers to browse a dynamic menu, place online orders for delivery/takeaway, make table reservations, and contact the restaurant management.

### Target Users
- **Customers**: Browse menu, register/login, manage cart, place orders, book tables.
- **Administrators**: Manage products, view orders, handle reservations, and oversee user accounts via the Admin Dashboard.

### Core Solutions
- **Dynamic Content**: Replaces static menu PDFs with a database-backed, easily updatable menu system.
- **Order Management**: Streamlines the ordering process with a digital cart and order history.
- **Customer Retention**: User accounts and order history encourage repeat business.

---

## 2. Tech Stack & Architecture

### Backend
- **Framework**: Django 5 + Django REST Framework (DRF).
- **Database**: PostgreSQL (Production-ready relational DB).
- **Authentication**: JWT (JSON Web Tokens) via `djangorestframework-simplejwt`.
- **Media**: Local storage (configured for `media/` directory).

### Frontend
- **Framework**: React 18 (Vite).
- **Styling**: Tailwind CSS (Utility-first CSS framework).
- **State Management**: React Context API (`AuthContext`, `CartContext`).
- **HTTP Client**: Axios (with interceptors for token management).

### Architecture Pattern
**Headless Architecture**: The Django backend serves purely as an API provider (REST endpoints). The React frontend is a Single Page Application (SPA) that consumes these APIs. There is no server-side template rendering for the UI.

---

## 3. Folder Structure Deep Dive

### Backend (`/backend`)
- **`backend/`**: Project configuration (`settings.py`, `urls.py`).
- **`accounts/`**: User authentication logic, Custom User model.
- **`products/`**: Menu item management (`Product` model).
- **`orders/`**: Shopping cart and Order processing logic.
- **`reservations/`**: Table booking system.
- **`contact/`**: Contact form handling.
- **`media/`**: Uploaded product images.

### Frontend (`/frontend`)
- **`src/`**: Source code root.
    - **`components/`**: Reusable UI blocks (`Navbar`, `Footer`, `MenuCarousel`).
    - **`pages/`**: Route views (`Home`, `Menu`, `Cart`, `Checkout`).
    - **`context/`**: Global state providers (`AuthContext` for user, `CartContext` for basket).
    - **`services/`**: API configuration (`api.js`).
    - **`utils/`**: Helper functions.

---

## 4. Backend (Django) Deep Dive

### Apps & Responsibilities
1.  **Accounts**:
    - **Model**: Custom `User` model using `email` as the UUID.
    - **Views**: Login, Register, Password Reset (using `django.contrib.auth` tokens).
2.  **Products**:
    - **Model**: `Product` (title, price, image, category, active status).
    - **Views**: Read-only public API for fetching active menu items.
3.  **Orders**:
    - **Models**:
        - `Cart`: Linked One-to-One with User.
        - `CartItem`: Links Product to Cart with quantity.
        - `Order`: Snapshot of a confirmed purchase.
    - **Logic**: `CartViewSet` manages the basket. `OrderViewSet` converts a Cart into an Order upon checkout.
4.  **Reservations**:
    - **Model**: `Reservation` (date, time, guests).
    - **Logic**: Simple creation endpoint that triggers an email notification.

### Authentication Flow
1.  User posts credentials to `/api/auth/login/`.
2.  Backend validates and returns `access` and `refresh` tokens.
3.  Frontend stores tokens.
4.  Data requests include `Authorization: Bearer <access_token>`.

---

## 5. Frontend (React) Deep Dive

### State Management
- **AuthContext**: Holds `user` object and `login`/`logout` methods. checks `localStorage` on boot.
- **CartContext**: Manages `cart` array.
    - **Sync**: When a user logs in, it fetches the server-side cart. Actions (`add`, `remove`) trigger API calls to sync the state immediately.

### API Service (`api.js`)
- Centralized Axios instance.
- **Interceptors**: Automatically attach the JWT token to requests. Note: Token refresh logic is set up to handle 401 errors seamlessly.

### Routing (`App.jsx`)
- Uses `react-router-dom`.
- **ProtectedRoute**: A wrapper component that redirects unauthenticated users to `/login` if they try to access `/cart`, `/orders`, etc.

---

## 6. API Documentation

### Auth
- `POST /api/auth/register/` - Create new user.
- `POST /api/auth/login/` - Get JWT tokens.
- `POST /api/auth/forgot-password/` - Trigger reset email.
- `POST /api/auth/reset-password/` - Confirm new password.

### Products
- `GET /api/products/` - List all active products.
- `GET /api/products/{id}/` - Retrieve single product details.

### Orders & Cart
- `GET /api/orders/cart/` - Get current user's cart.
- `POST /api/orders/cart/add/` - Add item. payload: `{product_id, quantity}`.
- `POST /api/orders/` - Create order from current cart.
- `GET /api/orders/` - List past orders.

### Utilities
- `POST /api/reservations/` - Create booking.
- `POST /api/contact/` - Send feedback.

---

## 7. Database Design

### Key Relationships
- **User (1) ---- (1) Cart**: A user has exactly one persistent cart.
- **Cart (1) ---- (*) CartItem**: A cart has many items.
- **User (1) ---- (*) Order**: A user has order history.
- **Order (1) ---- (*) OrderItem**: An order snapshot contains many items (copied from Cart).

---

## 8. Deployment & Environment

### Environment Variables
**Backend (.env)**
```bash
SECRET_KEY=...
DEBUG=False
DB_NAME=restaurant_db
DB_USER=...
DB_PASSWORD=...
DB_HOST=localhost
EMAIL_HOST=... (for production emails)
```

### Steps to Run
1.  **Database**: Ensure PostgreSQL is running.
2.  **Backend**:
    ```bash
    cd backend
    pip install -r requirements.txt
    python manage.py migrate
    python manage.py runserver
    ```
3.  **Frontend**:
    ```bash
    cd frontend
    npm install
    npm run dev
    ```

---

## 9. Security & Best Practices

- **Passwords**: Hashed via Django's default PBKDF2 validator.
- **CORS**: Configured to allow only the frontend domain (`localhost:5173`).
- **Permissions**: DRF `IsAuthenticated` ensures data privacy for Carts and Orders.
- **Injection**: Django ORM protects against SQL injection.

## 10. Improvement Suggestions

- **Payment Gateway**: Integrate Stripe/Razorpay backend SDK for real payment verification (currently simulated).
- **Email Worker**: Move email sending to a background task (Celery) to prevent request blocking.
- **Deployment**: Serve static files via Nginx/WhiteNoise and deploy to a cloud provider (AWS/Heroku/Railway).
