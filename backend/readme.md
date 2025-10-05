
# Silver Jewelry Shop API

[![Django REST Framework](https://img.shields.io/badge/Django%20REST-5.0+-green)](https://www.django-rest-framework.org/)
[![Swagger Docs](https://img.shields.io/badge/API-Docs-blue)](http://127.0.0.1:8000/swagger/)
[![License](https://img.shields.io/badge/License-BSD-lightgrey)](./LICENSE)

## Overview

| Key | Value |
|-----|--------|
| Framework | Django REST Framework |
| Documentation | Swagger 2.0 |
| Base URL | `http://127.0.0.1:8000/api/` |
| Auth | Basic Auth + JWT Refresh |
| Content-Type | `application/json` |

## Features

- User authentication with OTP & JWT
- Product management for silver jewelry items
- Blog/Posts system for announcements and news
- OTP system for secure login via mobile
- Full CRUD API with pagination, search, and ordering

## Authentication Endpoints (`/auth/`)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/auth/register/` | POST | Register a new user |
| `/auth/login/` | POST | Login using mobile/password or OTP |
| `/auth/logout/` | POST | Logout user |
| `/auth/me/` | GET | Fetch current authenticated user |
| `/auth/send-otp/` | POST | Send OTP to mobile number |
| `/auth/refresh/` | POST | Refresh access token using refresh token |

### Example: Login
```bash
POST /api/auth/login/
Content-Type: application/json

{
  "mobile": "09120000000",
  "password": "yourpassword"
}


Response:

```json
{
  "mobile": "09120000000",
  "otp": null
}
```

## Product Endpoints (`/products/`)

| Endpoint            | Method | Description                                  |
| ------------------- | ------ | -------------------------------------------- |
| `/products/`        | GET    | List products (pagination, search, ordering) |
| `/products/`        | POST   | Create a new product                         |
| `/products/{slug}/` | GET    | Retrieve product details                     |
| `/products/{slug}/` | PUT    | Update product info                          |
| `/products/{slug}/` | PATCH  | Partially update product                     |
| `/products/{slug}/` | DELETE | Delete product                               |

### Product Model

| Field       | Type     | Notes                    |
| ----------- | -------- | ------------------------ |
| id          | integer  | Read-only                |
| name        | string   | Required                 |
| slug        | string   | Auto-generated           |
| description | string   | Markdown + JSX           |
| weight      | number   | e.g., 0.120 grams        |
| purity      | string   | e.g., "0.925" for silver |
| material    | string   | Material type            |
| stock       | integer  | Inventory count          |
| image       | uri      | Read-only                |
| is_active   | boolean  | Visibility toggle        |
| created_at  | datetime | Auto                     |
| updated_at  | datetime | Auto                     |

## Post Endpoints (`/posts/`)

| Endpoint         | Method | Description     |
| ---------------- | ------ | --------------- |
| `/posts/`        | GET    | List posts      |
| `/posts/`        | POST   | Create new post |
| `/posts/{slug}/` | GET    | Get single post |
| `/posts/{slug}/` | PUT    | Update post     |
| `/posts/{slug}/` | PATCH  | Partial update  |
| `/posts/{slug}/` | DELETE | Delete post     |

### Post Model

| Field      | Type     | Notes              |
| ---------- | -------- | ------------------ |
| id         | integer  | Read-only          |
| title      | string   | Required           |
| slug       | string   | Auto-generated     |
| content    | string   | Markdown-supported |
| created_at | datetime | Auto               |

## User Model

| Field       | Type     | Notes     |
| ----------- | -------- | --------- |
| id          | integer  | Read-only |
| mobile      | string   | Required  |
| first_name  | string   | Optional  |
| last_name   | string   | Optional  |
| is_active   | boolean  | Read-only |
| is_staff    | boolean  | Read-only |
| date_joined | datetime | Auto      |

## Token Refresh Example

```bash
POST /api/auth/refresh/
Content-Type: application/json

{
  "refresh": "your_refresh_token"
}
```

Response:

```json
{
  "access": "new_access_token"
}
```

## Setup & Installation

### 1. Clone Repository

```bash
git clone https://github.com/MianajiAli/felorance.git
cd felorance
```

### 2. Create Virtual Environment

```bash
python -m venv venv
source venv/bin/activate   # Linux/Mac
venv\Scripts\activate      # Windows
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Run Migrations

```bash
python manage.py migrate
```

### 5. Start Development Server

```bash
python manage.py runserver
```

## API Documentation

Open Swagger UI in your browser:

```
http://127.0.0.1:8000/swagger/
```

## Dependencies

* Django >= 5.0
* djangorestframework
* drf-yasg
* djangorestframework-simplejwt

## Roadmap

* Add product categories
* Implement cart & order system
* Add image upload (S3/Cloudinary)
* Admin dashboard with analytics

## License

BSD License — free for personal and commercial use with attribution.

## Repository

[GitHub → MianajiAli/felorance](https://github.com/MianajiAli/felorance)

```
```
