# Task Tracker Pro

Task Tracker Pro is a small full-stack web application built to demonstrate modern software development skills for my job applications.

It uses:

- **Backend:** Django & Django REST Framework
- **Frontend:** React + Vite
- **API style:** JSON REST API
- **State management:** React Hooks (`useState`, `useEffect`)

---

## Features

- View a list of tasks
- Create new tasks with title, description, and due date
- Mark tasks as complete or incomplete
- Delete tasks
- Frontend and backend run as separate services and communicate via a REST API
- CORS configured between React and Django

---

## Tech Stack

### Backend

- Python 3
- Django
- Django REST Framework
- django-cors-headers

### Frontend

- Node.js (managed via `nvm`)
- React
- Vite

---

## Project Structure

```text
task-tracker-pro/
  backend/
    manage.py
    config/
      settings.py
      urls.py
    tasks/
      models.py
      views.py
      serializers.py
  frontend/
    index.html
    package.json
    src/
      main.jsx
      App.jsx
```

---

## Running the Project (Development)

### 1. Backend (Django API)

```bash
cd backend
python -m venv venv        # first time only
source venv/bin/activate
pip install django djangorestframework django-cors-headers
python manage.py migrate
python manage.py runserver
```

API base URL:

```
http://localhost:8000/api/tasks/
```

---

### 2. Frontend (React + Vite)

```bash
cd frontend
npm install        # first time only
npm run dev
```

Frontend URL:

```
http://localhost:5173/
```

---

## What This Project Demonstrates

- Building a REST API with Django REST Framework
- Creating a separate React frontend that consumes the API
- Handling CORS between frontend and backend
- Managing state and side effects in React
- Implementing full CRUD operations:
  - Create tasks
  - Read tasks
  - Update tasks (mark complete/incomplete)
  - Delete tasks
- Designing clean UI layouts using React components and basic CSS
- Running a two-service development environment
- Understanding how frontend and backend communicate via REST

This project is intentionally small but realistic, and is suitable for inclusion in my developer portfolio or as a talking point in technical interviews.

