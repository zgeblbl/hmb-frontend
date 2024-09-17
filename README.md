# HMB Frontend

This is the frontend of the HMB project, developed using React. The frontend interacts with the Spring Boot backend to provide functionalities such as user authentication, user queries, language switching, and leave applications.  This project was completed as part of an internship at HMB/Bilgi Teknolojileri Genel Müdürlüğü over a span of 20 days.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Getting Started](#getting-started)
5. [Project Structure](#project-structure)
6. [Usage](#usage)
7. [Authors](#authors)
8. [Contributing](#contributing)
9. [License](#license)

## Project Overview

The HMB frontend is a React application designed to provide an interface for various features such as user sign-up, authentication, language switching, and leave applications. It communicates with the HMB backend to retrieve, display, and manage data. 

## Features

- **User Authentication**: Allows users to sign in and authenticate.
- **Dashboard/Homepage**: A landing page with images.
- **User Query**: Collects and displays user data based on TCKN, name, and surname.
- **Leave Application**: Users can apply for different types of leave (annual, sick, etc.) through a form.
- **Language Switching**: Provides buttons to toggle between English and Turkish.
- **Dynamic Navigation**: Implemented using React Router for seamless navigation between different pages.
- **Contact Page**: Allows users to send messages or inquiries to the admin.
- **Admin Panel**: Accessible to administrators for managing user information and adding users to the system.
- **Approve/Decline Leave Requests**: Executives can view, approve or decline permission requests.
- **Profile Settings**: Users can change their passwords.
 
## Tech Stack

- **React**: A JavaScript library for building user interfaces.
- **CSS**: For styling components and pages.
- **React Router**: For navigation between different pages.
- **Node.js & npm**: For managing dependencies and running the development server.

## Getting Started

To get started with this project, follow these steps:

### Prerequisites

- Node.js and npm installed on your machine.
- The HMB backend running locally or on a server.

### Installation

1. Clone the repository:
```bash
   git clone https://github.com/zgeblbl/hmb-frontend.git
```
2. Navigate to the project directory:
```bash
   cd hmb-frontend
``` 
3. Install the required dependencies:
```bash
   npm install
```
4. Configure the backend API URL in the project (if needed). Locate the file where API URLs are defined and update the base URL to match your backend:
```bash
   const API_BASE_URL = 'http://localhost:9090';
```

### Running the Application

Start the development server:
```bash
npm start
```
The application will run locally on http://localhost:3000. You can access it in your web browser.

### Building for Production

To create an optimized production build, run:
```bash
npm run build
```
This command generates a build folder containing the static files for deployment.

## Project Structure
Here is a brief overview of the project's file structure:
```
hmb-frontend/

  public/                   // Public assets (e.g., index.html)
  src/                      // Source code
    media/                // Media assets (e.g., images, icons)
    App.js                // Main application component
    index.js              // Entry point of the React application
    other files

  package.json              // Project metadata and dependencies
```
## Usage

- **Sign In**: Users can log in using their credentials. Authentication is handled via the backend.
- **Dashboard/Homepage**: Users will land on the homepage upon logging in. The dashboard provides a visual overview with images to users.
- **Leave Application**: Users can apply for leave through a form and submit it for approval.
- **Language Switching**: Toggle between English and Turkish using the language buttons.
- **User Query**: Search users based on TCKN, name, or surname.
- **Contact Page**: Users can submit queries or feedback to the admin through a contact form.
- **Admin Panel**: Administrators can log in to access the admin panel, where they can manage user data and review contact messages.
- **Approve/Decline Leave Requests**: Executives can navigate to the leave request section, view all pending requests, and choose to approve or decline them.
- **Profile Settings**: Users can go to their profile settings to change their passwords.

## Authors
- Özge BÜLBÜL
- Eda Eylül ASLAN

## Contributing
Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (git checkout -b feature/YourFeature).
3. Make your changes.
4. Commit your changes (git commit -m 'Add your feature').
5. Push to the branch (git push origin feature/YourFeature).
6. Open a pull request.

## License
This project is licensed under the MIT License.



