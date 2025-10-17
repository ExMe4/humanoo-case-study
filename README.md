# Humanoo Case Study

A full-stack web application built with **React (Vite)** and **Spring Boot**, designed to manage a collection of books. You can create, update, and delete books from your library.

---

## Tech Stack

### Frontend
- **React 19** with Vite for fast development
- **React Router v7** for navigation
- **React Hook Form** for form handling & validation
- **Axios** for API requests
- **Vitest + React Testing Library** for unit testing

### Backend
- **Spring Boot 3.5.6**
- **Java 21**
- **Spring Data JPA / Hibernate**
- **H2 Database** (file-based persistent mode)
- **Lombok**
- **Jakarta Validation API**
- **JUnit / Spring Boot Test**
- **RESTful API** exposing CRUD endpoints under `/api/books`

---

## Running the Project Locally

### Backend

```bash
cd backend
mvn spring-boot:run
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Tests

### Backend

```bash
mvn test
```

### Frontend

```bash
npm test
```
