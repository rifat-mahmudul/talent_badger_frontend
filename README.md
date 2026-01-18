# Talent Badger - Frontend (Talent Marketplace)

TalentBadger is a professional talent hiring platform designed to bridge the gap between clients and expert engineers. This repository contains the **Frontend** source code of the application, built with a focus on seamless user experience, role based dashboards, and real-time project tracking.

## 🚀 Live Demo
[**Click here to view the Live Site**](https://talentbadger.com/)
---

## 🛠️ Tech Stack

* **Framework:** React.js
* **Styling:** Tailwind CSS, Shadcn
* **Data Fetching:** [TanStack Query, Axios]
* **Authentication:** Next Auth
* **Icons & UI Components:** Lucide React, Headless UI

---

## ✨ Key Features (Frontend)

-   **Multi-Role Dashboards:** Unique and optimized interfaces for **Admins, Clients, and Engineers**.
-   **Project Management UI:** Specialized views for creating projects, assigning engineers, and tracking progress percentages visually.
-   **Interactive Call Booking:** A clean calendar/time-slot interface for scheduling meetings between clients and teams.
-   **Progress Tracker:** Real-time progress bar and status updates for active projects.
-   **Responsive Design:** Fully optimized for Mobile, Tablet, and Desktop screens.
-   **Secure Auth Flow:** Protected routes based on user roles (RBAC).

---

## 📦 Installation & Setup

Follow these steps to run the project locally:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/rifat-mahmudul/talent_badger_frontend
    ```

2.  **Navigate to the directory:**
    ```bash
    cd talent_badger_frontend
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Set up Environment Variables:**
    Create a `.env` file in the root directory and add your keys:
    ```env
    NEXT_PUBLIC_BACKEND_URL=
    NEXTAUTH_SECRET=
    NEXTAUTH_URL=
    ```

5.  **Run the application:**
    ```bash
    npm run dev
    ```

---

## 🏗️ Architecture Note
The frontend is built with a **component-based architecture**, ensuring high reusability and clean code practices. Folder structure follows a modular approach separating Hooks, Services, Components, and Pages.
