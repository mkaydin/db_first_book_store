
# Bookstore Application Overview

This document provides a comprehensive overview of the full-stack bookstore management application, covering its architecture, technology stack, and core components. The application enables users to view and manage books and authors through a modern web interface backed by a RESTful API.

- For frontend details, see **Frontend Application**.
- For backend API details, see **Backend API**.
- For database schema, see **Database Schema and Entity Relationships**.

---

## System Purpose and Architecture

The bookstore application is a **three-tier web application**:

- **Frontend**: React + Vite
- **Backend**: ASP.NET Core Web API
- **Database**: PostgreSQL

Supports full **CRUD** operations for managing books and authors (1:N relationship).

### High-Level Architecture

```
React (Vite Dev Server)
localhost:5173
     ↓ API Calls
ASP.NET Core Web API
localhost:5165/api
     ↓ EF Core
PostgreSQL Database
```

### Database Structure

- `authors` table
- `books` table (has `authorid` as FK)

---

## Source Files

- `bookstore-frontend/src/App.jsx` (Lines 9–94, 17–36, 96–170)
- `BookStoreAPI/Program.cs` (Lines 1–41, 5, 8–14, 13–14, 16–25, 32–33)
- `BookStoreAPI/Controllers/BooksController.cs` (Lines 9–16, 18–41, 22–38)
- `BookStoreAPI/Controllers/AuthorsController.cs` (Lines 9–16, 18–41, 22–38)
- `bookstore-frontend/src/App.css` (Lines 1–259)

---

## API Endpoints and React Components Mapping

### API Endpoints

#### `/api/Books`
- `GET /api/Books` → `GetBooks()`
- `GET /api/Books/{id}` → `GetBook()`
- `POST /api/Books` → `PostBook()`
- `PUT /api/Books/{id}` → `PutBook()`
- `DELETE /api/Books/{id}` → `DeleteBook()`

#### `/api/Authors`
- `GET /api/Authors` → `GetAuthors()`
- `GET /api/Authors/{id}` → `GetAuthor()`
- `POST /api/Authors` → `PostAuthor()`
- `PUT /api/Authors/{id}` → `PutAuthor()`
- `DELETE /api/Authors/{id}` → `DeleteAuthor()`

### React Components

- `BooksView({ books })`
  - Renders: `book.title`, `book.price`
- `AuthorsView({ authors })`
  - Renders: `author.name`, `author.bookCount`

### Data Fetch Functions

- `fetchBooks()`
- `fetchAuthors()`

---

## Technology Stack

| Tier       | Technology         | Purpose                  | Config/File                     |
|------------|--------------------|--------------------------|---------------------------------|
| Frontend   | React 18           | UI Framework             | `App.jsx:1`                     |
| Frontend   | Vite               | Dev Server & Build Tool  | Referenced in CORS              |
| Frontend   | Axios              | HTTP Client              | `App.jsx:3`                     |
| Backend    | ASP.NET Core       | Web API Framework        | `Program.cs:5`                  |
| Backend    | Entity Framework   | ORM/Data Access          | `Program.cs:13-14`              |
| Database   | PostgreSQL         | Relational Database      | `Program.cs:14`                 |
| Dev Tool   | Swagger            | API Docs                 | `Program.cs:32-33`              |

---

## Core Application Components

### Frontend Components

- `App`: Main app component managing state and navigation
- `BooksView`: Renders book cards
- `AuthorsView`: Shows authors and their books

#### State Hooks

```js
const [books, setBooks] = useState([]);
const [authors, setAuthors] = useState([]);
const [loading, setLoading] = useState(true);
const [activeTab, setActiveTab] = useState('books');
const [error, setError] = useState(null);
```

---

### Backend Controllers

| Controller        | Route         | Entity  | Key Methods                        |
|------------------|---------------|---------|------------------------------------|
| BooksController   | `/api/Books`   | Book    | GetBooks, GetBook, PostBook, etc. |
| AuthorsController | `/api/Authors` | Author  | GetAuthors, GetAuthor, etc.       |

Each controller uses proper HTTP codes and error handling.

---

### Data Access Pattern

- Uses **Entity Framework Core**
- Navigation: `.Include()` used for loading related data
- Projection: `.Select()` for transforming results
- Async: All DB calls use `async/await`

---

## Application Configuration

### CORS Setup

```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("ReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});
```

### API Base URL (Frontend)

```js
const API_BASE_URL = 'http://localhost:5165/api';
```

---

## Data Loading & State Management

Fetch both authors and books at once:

```js
const loadData = async () => {
    setLoading(true);
    await Promise.all([fetchBooks(), fetchAuthors()]);
    setLoading(false);
};
```

---

## User Interface Features

### Key UI Features

- **Tabbed interface** (Books / Authors)
- **Responsive Card Grid**: CSS Grid layout
- **Hover effects**, **transitions**
- **Loading and Error States**
- **Mobile-Responsive Design**

### CSS File References

- Grid layout: `App.css:67–72`
- Tabs: `App.css:23–50`
- Loading/Error: `App.css:168–215`
- Mobile: `App.css:225–259`

---

