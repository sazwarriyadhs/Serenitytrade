# Serenity AgriExport Hub

A trusted B2B marketplace designed to connect farmers, exporters, and international buyers, facilitating seamless and transparent trade of agricultural commodities. This platform empowers local farmers by providing access to global markets and equips exporters and buyers with the tools they need for efficient and secure transactions.

<p align="center">
  <img src="https://github.com/sazwarriyadhs/Serenitytrade/blob/main/public/images/logogith.png" alt="Serenitytrade Logo" width="300"/>
</p>

<p align="center"><em>A placeholder image of the application dashboard.</em></p>


---

## ✨ Key Features

- **Role-Based Dashboards**: Tailored interfaces for **Exporters**, **Buyers**, **Farmers**, and **Admin**, each with specific tools and data.
- **Commodity & Offer Management**: Easily list, browse, and manage agricultural commodities, offers, and requests.
- **AI-Powered Insights**:
    - **Demand Prediction**: Forecast commodity demand in various countries.
    - **Find New Markets**: Discover potential export markets for your products.
    - **Packaging Recommender**: Get optimal packaging solutions for logistics.
- **Partnership Ecosystem**: A structured system for exporters and farmers to collaborate, with built-in rules to ensure quality partnerships.
- **End-to-End Tracking**: Monitor shipments from the farm to the destination port and track payment flows with a secure escrow system.
- **Comprehensive Guides**: In-app resources for exporters and buyers covering documentation, international trade terms, and best practices.
- **Membership System**: A digital membership card for verified users to build trust within the ecosystem.

---

## 🛠️ Tech Stack

This project is built with a modern, robust, and scalable tech stack:

- **Framework**: [Next.js](https://nextjs.org/) (with App Router)
- **UI Library**: [React](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **AI Integration**: [Genkit](https://firebase.google.com/docs/genkit) for generative AI flows.
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Forms**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)

---

## 🚀 Getting Started

To get the project running locally, follow these steps:

1.  **Install Dependencies**:
    Open your terminal and run the following command to install all the necessary packages.
    ```bash
    npm install
    ```

2.  **Run the Development Server**:
    Start the Next.js development server. The application will be available at `http://localhost:9002`.
    ```bash
    npm run dev
    ```

3.  **Run the Genkit AI Flows**:
    To enable the AI-powered features, you'll need to run the Genkit flows in a separate terminal.
    ```bash
    npm run genkit:dev
    ```
    This will start the Genkit development environment, allowing the application to communicate with the defined AI prompts and models.

---

## 👤 Roles & Login

The platform supports multiple user roles. To simplify testing, the login page is pre-configured with mock credentials for each role. Simply select a role from the dropdown menu on the login page, and the email field will be auto-filled. Use "password" as the password for all roles.

-   **Exporter**: Manages commodities, finds new markets, and partners with farmers.
-   **Buyer**: Browses commodities, creates requests, and negotiates with exporters.
-   **Farmer**: Logs harvests, manages product certifications, and partners with an exporter.
-   **Admin**: Oversees the entire platform, manages users, and monitors transactions.

---

## 📂 Project Structure

A brief overview of the key directories:

```
.
├── src
│   ├── app                 # Next.js App Router pages and layouts
│   │   ├── (authenticated) # Pages protected by authentication
│   │   ├── (public)        # Public-facing pages (e.g., landing page)
│   │   └── login           # Login page
│   ├── ai                  # Genkit AI flows and configuration
│   │   ├── flows           # AI-powered business logic (e.g., predictDemand)
│   │   └── genkit.ts       # Genkit initialization
│   ├── components          # Reusable React components
│   │   └── ui              # ShadCN UI components
│   ├── hooks               # Custom React hooks
│   └── lib                 # Utility functions
└── ...                     # Other configuration files
```

---

This project was bootstrapped with Firebase Studio.
