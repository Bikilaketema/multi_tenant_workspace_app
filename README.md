# 🚀Multi-Tenant Workspace Application

This is a full-stack take-home assignment implementing a mini multi-tenant workspace application. The core challenge was integrating a third-party authentication solution (`better-auth`) to manage users, roles, and organizations, while strictly enforcing multi-tenancy rules at the API level.

## ✨ Features

* **Multi-Tenant Architecture:** Data (Outlines) is strictly scoped by the Organization ID, ensuring tenants only access their own data.
* **Authentication & Authorization (via `better-auth`):**
    * User Sign Up / Sign In (Email + Password).
    * Organization Creation and Joining.
    * Role-Based Access Control (RBAC): **Owner** and **Member** roles.
* **Data Management:** Full CRUD operations for "Outline" items.
* **Team Management:** Owner-only endpoints for inviting and removing members from an organization.
* **API Documentation:** Comprehensive API documentation using Swagger.

## 💻 Tech Stack

| Component | Technology | Rationale |
| :--- | :--- | :--- |
| **Backend Framework** | **NestJS** (Node.js) | Structured, modular, and scalable API development. |
| **Database** | **PostgreSQL** | Robust, open-source relational database. |
| **Auth/Identity** | **Better Auth** | Handles complex authentication flows and multi-tenancy (Organization Plugin). |
| **ORM/Database Access** | **Prisma** | Modern, type-safe ORM used for the application's data models (Outlines, etc.). |
| **Containerization** | **Docker** | Manages environment consistency and services (NestJS app and PostgreSQL database). |
| **Frontend Framework** | **Next.js** | Full-stack React framework for the workspace dashboard. |
| **Data Fetching** | **TanStack Query (React Query)** | Manages server state and caching on the frontend. |

## ⚙️ Backend Architecture & Enforcement

The backend follows a strict **Controller-Service-Module** architecture.

### Authorization Enforcement

All sensitive endpoints utilize custom NestJS Guards that enforce access rules using the `better-auth` service:

1.  **`MemberGuard`**: Checks if the authenticated user has a role (Owner or Member) in the organization specified by the URL (`/org/:orgId/outlines`).
2.  **`OwnerGuard`**: Checks if the authenticated user's role is specifically "Owner" within the organization, restricting access to sensitive member management endpoints.


---

## 🛠️ Getting Started (Local Setup)

### Prerequisites

* Docker and Docker Compose installed (Required for the PostgreSQL database).
* Node.js (v20+) and npm.

### 1. Configure Environment Variables

The project uses an `.env` file for configuration.

* **Action:** Copy the provided example file and rename it to `.env`:
    ```bash
    cp .env.example .env
    ```

* **Action:** Open the new `.env` file and fill in the necessary secrets.

    **Example `.env` Content:**
    ```env
    # Database Credentials (Note: Host must be 'localhost' for local Node run)
    DB_USERNAME=myuser
    DB_PASSWORD=mysecurepassword
    DB_DATABASE=fullstackdb
    DB_URL=postgresql://myuser:mysecurepassword@localhost:5432/fullstackdb

    # Better Auth Secrets
    AUTH_SECRET="A_VERY_LONG_AND_SECURE_RANDOM_STRING_FOR_BETTER_AUTH"
    ```

---

### 2. Run with Docker Compose (Recommended)

This is the fastest way to get both the application and the database running.

* **Action:** Run the command to build the NestJS app, start the PostgreSQL container, run migrations, and start the application.

    ```bash
    docker-compose up --build
    ```

---

### 3. Run with Node.js (Without Docker)

This option allows the developer to run the NestJS application directly, but requires using Docker Compose only for the database service.

#### A. Start the Database Separately

Start only the PostgreSQL database service using Docker Compose:

```bash
docker-compose up db
```

B. Install Dependencies
Install all Node dependencies locally:


```bash
npm install
```

C. Run Migrations
Run the necessary database migrations (Better Auth and Prisma) against the local database instance:

```bash
npm run better-auth:migrate
npm run prisma:migrate
```

D. Start the Application
Start the NestJS application in development mode:

```bash
npm run start:dev
```

4. Access the API Documentation
Once the server is running (logs show Application is running...), you can view the Swagger API documentation:

API Docs URL: http://localhost:3000/api/docs

## Frontend
To run the frontend change the dir to /frontend and run

```bash
npm install
```

then run

```bash
npm run dev
```

If you want to run the production build

run

```bash 
npm run build
```

then run

```bash
npm run start
```

and you will access the frontend on the port you see in the terminal.