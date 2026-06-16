# Phonebook-CRUD-API
A secure, production-ready RESTful CRUD API built with **Node.js**, **Express**, and **MongoDB** to manage a digital phonebook. This project demonstrates backend architectural fundamentals, database persistence, and secure configuration practices.

---

## Features

- **Full CRUD Operations**: Create, Read, Update, and Delete contact records seamlessly.
- **Database Persistence**: Integrated with **MongoDB Atlas** via Mongoose ODM for reliable data storage.
- **Security-First Approach**: Sensitive credentials and environment-specific variables are fully protected using `dotenv`.
- **Robust Error Handling**: Handles invalid IDs, missing payloads, and server exceptions gracefully.

---

## Tech Stack

- **Runtime Environment**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB Atlas
- **Object Data Modeling (ODM)**: Mongoose
- **Environment Management**: Dotenv

---

## API Endpoints

| Method | Endpoint | Description | Request Body (JSON) | Status Codes |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | `/contacts` | Fetch all saved contacts | None | `200 OK`, `500` |
| **GET** | `/contacts/:id` | Fetch a single contact by its unique ID | None | `200 OK`, `404`, `500` |
| **POST** | `/contacts` | Create/Save a new contact | `{ "name": "string", "phone": "string" }` | `201 Created`, `400` |
| **PUT** | `/contacts/:id` | Update an existing contact's details | `{ "name": "string", "phone": "string" }` | `200 OK`, `404`, `500` |
| **DELETE** | `/contacts/:id` | Delete a contact permanently from the DB | None | `200 OK`, `404`, `500` |

---

