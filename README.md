
# Book Review API

A simple RESTful API built with Node.js, Express, MongoDB, and JWT authentication for managing books and reviews. Users can sign up, log in, add books, write reviews, and search for content.

---

# Getting Started

# Prerequisites

* Node.js (v14+ recommended)
* MongoDB (local or Atlas)

# Installation

```bash
git clone <your-repo-url>
cd book-review-api
npm install
```

### Configuration

Create a `.env` file in the root folder and add:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### Running the Server

```bash
npm start
```

---

# Database Schema Overview

This project uses **MongoDB** (with Mongoose) to store and manage data for users, books, and reviews. Here's a quick breakdown of how everything connects:

# User

Each user has a unique account used to log in and interact with the system.

* username: A unique name chosen by the user
* password: A securely hashed password

Users can add books and leave reviews.

# Book

Books are added by users and can be searched and reviewed.

* title: The name of the book
* author: Who wrote the book
* genre: Book category (optional)
* description: Short summary (optional)
* createdBy: The user who added the book

Each book can have many reviews.

# Review

Reviews allow users to rate and comment on books.

* book: The book being reviewed
* user: The person writing the review
* rating: A score from 1 to 5


Each user can leave one review per book.

# Relationships

* A User can add many Books
* A User can write many Reviews
* A Book can have many **Reviews**
* A Review belongs to both a User and a Book

-----------------------------------------------------------

# Authentication

##Sign Up

`POST /api/signup`

* Request: `{ "username": "test", "password": "123456" }`
* Response: User created message

## Login

`POST /api/login`

* Request: `{ "username": "test", "password": "123456" }`
* Response: `{ "token": "JWT_TOKEN" }`

Use the returned token as `Authorization: Bearer <token>` in protected routes.

-----------------------------------------------------------------------------------------

# API Endpoints

##  Books

* `POST /api/books` — Add new book *(Auth required)*
* `GET /api/books` — Get all books (with optional filters: author, genre, page)
* `GET /api/books/:id` — Get book details with average rating and paginated reviews

## Reviews

* `POST /api/books/:id/reviews` — Submit review *(Auth required)*
* `PUT /api/reviews/:id` — Update your review *(Auth required)*
* `DELETE /api/reviews/:id` — Delete your review *(Auth required)*

## Search

* `GET /api/search` — Search books by title or author (case-insensitive)

# Tech Stack

* **Node.js** + **Express.js**
* **MongoDB** with **Mongoose**
* **JWT** for user authentication
* **Postman** for API testing

---------------------------------------------------------------------------


