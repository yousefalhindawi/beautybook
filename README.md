```markdown
# BeautyBook System

BeautyBook is an advanced system designed for managing beauty appointments, services, and staff. It allows users to add, update, delete, and view records, with features like search, filter, and PDF report generation. The system uses a modern tech stack and is containerized using Docker for seamless deployment.

---

## **Features**

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

## **Tech Stack**

### **Frontend**
- **React.js**: Component-based user interface
- **Redux**: State management
- **Axios**: API integration
- **React Bootstrap**: UI styling and responsiveness

### **Backend**
- **Node.js**: JavaScript runtime
- **Express.js**: Backend framework
- **Prisma**: ORM for database interactions
- **MySQL**: Database

### **Deployment**
- **Docker**: Containerization of frontend, backend, and database
- **PM2**: Process manager for backend and frontend

---

## **Setup Instructions**

### **1. Prerequisites**
Ensure the following tools are installed on your system:
- Node.js (v18.12.0)
- Docker & Docker Compose
- Prisma CLI (`npm install -g prisma`)

---

### **2. Project Structure**

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

### **3. Setup Environment Variables**

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

### **4. Running the Project**

#### **Using Docker Compose**
1. **Build and start containers**:
    ```bash
  docker-compose --build --no-cache
  ```
  ```bash
  docker-compose up
  ```
2. Open the application:
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:5000](http://localhost:5000)

#### **Manual Setup (Without Docker)**
1. **Backend**:
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

2. **Frontend**:
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

### **5. Key Commands**

#### **Database Management**
- Open Prisma Studio:
  ```bash
  npx prisma studio
  ```
- Generate Prisma Client:
  ```bash
  npx prisma generate
  ```

#### **Docker Commands**
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

### **6. Deployment**

1. **Frontend**: Serve the React app using:
   ```bash
   serve -s build
   ```
2. **Backend**: Use PM2 for production:
   ```bash
   pm2 start app.js --name backend --no-daemon
   ```

---

### **7. API Endpoints**

#### **Authentication**
- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Login a user

#### **Appointments**
- `GET /api/appointments`: Get all appointments
- `POST /api/appointments`: Create a new appointment
- `PUT /api/appointments/:id`: Update an appointment
- `DELETE /api/appointments/:id`: Delete an appointment

#### **Services**
- `GET /api/services`: Get all services
- `POST /api/services`: Create a new service
- `PUT /api/services/:id`: Update a service
- `DELETE /api/services/:id`: Delete a service

#### **Staff**
- `GET /api/staff`: Get all staff
- `POST /api/staff`: Add a new staff member
- `PUT /api/staff/:id`: Update staff details
- `DELETE /api/staff/:id`: Remove a staff member

---

## **Contributing**
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

## **License**
This project is licensed under the MIT License.
```

Let me know if you need any modifications or additional details!