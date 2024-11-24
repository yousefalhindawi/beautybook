```markdown
# BeautyBook System

BeautyBook is an advanced system designed for managing beauty appointments, services, and staff. It allows users to add, update, delete, and view records, with features like search, filter, and PDF report generation. The system uses a modern tech stack and is containerized using Docker for seamless deployment.

---

### How to Use the BeautyBook App

Once you have the app set up and running, you can navigate through the different sections of the BeautyBook system to manage appointments, services, and staff. Below is a guide to using the app effectively.

---

### 1. Registration & Login
#### Registering a New Account
- On the landing page, you’ll see the Register button. Click on it to open the registration form.
- Fill in the required fields, including:
  - Name
  - Email
  - Phone
  - Address
  - Password (with at least 6 characters)
- After entering your details, click the Register button to create your account. You will be redirected to the login page.

#### Logging In
- After registering, click on the Login button on the landing page to enter your credentials.
- Enter your Email and Password.
- Click Login to access the dashboard. Upon successful login, you’ll be redirected to the main dashboard.

---

### 2. Dashboard & Navigation
Once you are logged in, you will be directed to the Dashboard. The dashboard will contain the following sections:

- Appointments
  - View, search, and filter existing appointments.
  - Add, update, or delete appointments as needed.
  
- Services
  - View, search, and filter available services.
  - Add, update, or delete services as required.

- Staff
  - View the staff members.
  - Add, update, or delete staff members.

- Navigation Menu
  - Use the Navbar to easily navigate between different sections: Appointments, Services, Staff, and Logout.

---

### 3. Managing Appointments
#### Viewing Appointments
- On the Appointments page, you’ll find a list of all your scheduled appointments.
- You can search appointments by date, service, staff, or status (pending, confirmed, completed, or canceled).

#### Adding a New Appointment
- Click the Add Appointment button on the Appointments page.
- Fill in the required details, such as:
  - Date & Time
  - Service
  - Staff
  - User (your account)
  - Status (e.g., pending)
- Click Save to create the appointment.
- ### Important note: If there are no available services or staff, the system will not allow users to add an appointment.

#### Updating an Appointment
- Click on the Update button next to an existing appointment.
- Modify the details and click Save.

#### Deleting an Appointment
- Click the Delete button next to the appointment.
- Confirm the deletion in the confirmation popup.

---

### 4. Managing Services
#### Viewing Services
- On the Services page, you’ll find a list of all available services.
- You can search services by name or price range.

#### Adding a New Service
- Click the Add Service button on the Services page.
- Fill in the service details, such as:
  - Service Name
  - Description
  - Price
  - Duration
- Click Save to add the service.

#### Updating a Service
- Click the Update button next to an existing service.
- Modify the service details and click Save.

#### Deleting a Service
- Click the Delete button next to the service.
- Confirm the deletion in the confirmation popup.

---

### 5. Managing Staff
#### Viewing Staff Members
- On the Staff page, you can see a list of all staff members.
- You can search staff by name or email.

#### Adding a New Staff Member
- Click the Add Staff button on the Staff page.
- Fill in the staff details, including:
  - Name
  - Email
  - Phone
- Click Save to add the staff member.

#### Updating Staff Details
- Click the Update button next to a staff member.
- Modify the staff details and click Save.

#### Deleting a Staff Member
- Click the Delete button next to the staff member.
- Confirm the deletion in the confirmation popup.

---

### 6. Logout
- To log out of your account, click the Logout button in the Navbar.
- This will log you out and return you to the login page.

---

### 7. Error Handling & Troubleshooting
If you encounter any errors or unexpected behavior, try the following:
- Refresh the page and ensure that you are logged in.
---

### 8. PDF Report
For appointment management, you can generate a PDF report of all your appointments:
- Go to the Appointments page.
- Click on the Generate PDF Report button to download a summary of your appointments in PDF format.

---

## Features

- User Authentication and Authorization
- CRUD Operations for:
  - Appointments
  - Services
  - Staff
- Search and filter by:
  - Name
  - Price range
  - Date
- PDF Report Generation for Appointments
- Fully responsive UI with React Bootstrap
- Optimized for large datasets and high-performance operations

---

## Tech Stack

### Frontend
- React.js: Component-based user interface
- Redux: State management
- Axios: API integration
- React Bootstrap: UI styling and responsiveness

### Backend
- Node.js: JavaScript runtime
- Express.js: Backend framework
- Prisma: ORM for database interactions
- MySQL: Database

### Deployment
- Docker: Containerization of frontend, backend, and database
- PM2: Process manager for backend and frontend

---

## Setup Instructions

### 1. Prerequisites
Ensure the following tools are installed on your system:
- Node.js (v18.12.0)
- Docker & Docker Compose
- Prisma CLI (`npm install -g prisma`)

---

### 2. Project Structure

```plaintext
/project-root
├── beautybook-backend/
│   ├── Dockerfile
│   ├── prisma/
│   │   └── schema.prisma
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   └── app.js
│   └── package.json
├── beautybook-frontend/
│   ├── Dockerfile
│   ├── src/
│   └── package.json
├── docker-compose.yml
└── .env
```

---

### 3. Setup Environment Variables

Create a `.env` file in the project root directory with the following variables:

```env
# MySQL Database
MYSQL_ROOT_PASSWORD=rootpassword
MYSQL_DATABASE=beautybook
MYSQL_USER=user
MYSQL_PASSWORD=password

# Backend
DATABASE_URL=mysql://user:password@mysql:3306/beautybook // for docker-compose

# Frontend
REACT_APP_API_URL=http://localhost:5000
```

---

### 4. Running the Project

#### Using Docker Compose
1. Build and start containers:
    ```bash
    docker-compose build --no-cache
    ```
    ```bash
    docker-compose up
    ```
2. Open the application:
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:5000](http://localhost:5000)

#### Manual Setup (Without Docker)
1. MYSQL:
    - Install MySQL Server from the official MySQL Image.
      ```bash
      docker run --name beautybook-db -e MYSQL_ROOT_PASSWORD=rootpassword -e MYSQL_DATABASE=beautybook -e MYSQL_USER=user -e MYSQL_PASSWORD=password -p 3306:3306 -d mysql:9.1
      ```
      ```bash
      docker run --name beautybook-shadowdb -e MYSQL_ROOT_PASSWORD=rootpassword -e MYSQL_DATABASE=beautybook -e MYSQL_USER=user -e MYSQL_PASSWORD=password -p 3307:3306 -d mysql:9.1
      ```
2. Backend:
   - Navigate to `beautybook-backend/`:
     ```bash
     cd beautybook-backend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Run Prisma migrations:
     ```bash
     npx prisma migrate dev
     ```
   - Start the backend:
     ```bash
     pm2 start app.js --name backend --no-daemon
     ```

3. Frontend:
   - Navigate to `beautybook-frontend/`:
     ```bash
     cd beautybook-frontend
     ```
   - Install dependencies:
     ```bash
     npm install --legacy-peer-deps
     ```
   - Start the frontend:
     ```bash
     npm run start
     ```

---

### 5. Key Commands

#### Database Management
- Open Prisma Studio:
  ```bash
  npx prisma studio
  ```
- Generate Prisma Client:
  ```bash
  npx prisma generate
  ```

#### Docker Commands
- Build and start containers:
  ```bash
  docker-compose build --no-cache
  ```
  ```bash
  docker-compose up
  ```
- Stop containers:
  ```bash
  docker-compose down 
  docker-compose down -v // to remove volumes
  ```
- View logs:
  ```bash
  docker-compose logs
  ```

---

### 6. Deployment

1. Frontend: Serve the React app using:
   ```bash
   serve -s build
   ```
2. Backend: Use PM2 for production:
   ```bash
   pm2 start app.js --name backend --no-daemon
   ```

---

### 7. API Endpoints

#### Authentication
- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Login a user

#### Appointments
- `GET /api/appointments`: Get all appointments
- `POST /api/appointments`: Create a new appointment
- `PUT /api/appointments/:id`: Update an appointment
- `DELETE /api/appointments/:id`: Delete an appointment

#### Services
- `GET /api/services`: Get all services
- `POST /api/services`: Create a new service
- `PUT /api/services/:id`: Update a service
- `DELETE /api/services/:id`: Delete a service

#### Staff
- `GET /api/staff`: Get all staff
- `POST /api/staff`: Add a new staff member
- `PUT /api/staff/:id`: Update staff details
- `DELETE /api/staff/:id`: Remove a staff member

---

## Contributing
1. Fork the repository
2. Create a new branch for your feature:
   ```bash
   git checkout -b feature-name
   ```
3. Commit changes:
   ```bash
   git commit -m "Add feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Create a pull request

---

## License
This project is licensed under the MIT License.
```

Let me know if you need any modifications or additional details!