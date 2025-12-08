📚 Book Explorer App – Angular 18

A complete Angular 18 application built as a developer task to demonstrate real-world frontend skills including routing, guards, interceptors, reactive forms, error handling, and integration with public APIs.

This project allows users to authenticate, explore books, and perform full CRUD (Create, Read, Update, Delete) operations using real REST APIs.

🚀 Features
🔐 User Authentication

Login using the public ReqRes API

Stores token in localStorage

Redirects to the dashboard after login

Shows friendly error messages for failed login

🛡️ Route Protection

Implements CanActivateFn AuthGuard

Blocks access to book pages without a valid token

SSR-friendly using isPlatformBrowser

📘 Book Management (CRUD)

Uses CrudCrud.com for backend API

Displays books in a clean, responsive UI

Search by title or author

Sort by title or price

Add new books using a validated Reactive Form

Edit books with pre-filled form data

Delete books with confirmation

Handles CrudCrud 24-hour API reset gracefully

❌ Error Handling

A global HttpInterceptor is used to catch API errors and show human-friendly messages for:

401 – Unauthorized

404 – Not Found

500 – Server Errors

⚙️ Tech Stack & Tools

Angular 18 (Standalone Components)

Routing + Guards

Reactive Forms

HttpClient Module

Auth & Error Interceptors

Services + RxJS

LocalStorage for token persistence

Bootstrap / Angular Material for UI

📝 APIs Used
🔐 Login API – ReqRes
POST https://reqres.in/api/login


Example Body:

{
  "email": "eve.holt@reqres.in",
  "password": "cityslicka"
}

📚 Books API – CrudCrud
https://crudcrud.com/api/<YOUR-UNIQUE-ID>/books


Schema:

{
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "category": "Software",
  "price": 39.99,
  "description": "A handbook of Agile software craftsmanship."
}

🎯 Project Objective

The goal of this project is to demonstrate the ability to build a complete, production-style Angular application with:

Secure authentication

Protected routing

Clean UI

CRUD operations

Solid architecture using services, interceptors, reactive forms, and error handling

This project reflects real-world frontend engineering practices and follows modern Angular standards.

📦 How to Run the Project
npm install
ng serve -o


Make sure to update the CrudCrud API endpoint in the environment file with your unique ID.

✨ Bonus Features

Debounced search using RxJS

Responsive UI

Code structured for scalability

👨‍💻 Author

Omar Abd Elbary
Angular Developer | Frontend Engineer
Passionate about building clean, scalable web applications.
