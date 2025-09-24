# WORQELY API Endpoints for Bravo Studio

## Base URL
`https://api.worqely.com/v1`

## Authentication Endpoints

### POST /auth/login
**Description**: User login endpoint
**Request Body**:
```json
{
  "mobile": "string",
  "password": "string",
  "userType": "customer" | "worker" | "admin"
}
```
**Response**:
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "string",
      "fullName": "string",
      "email": "string",
      "mobile": "string",
      "type": "customer" | "worker" | "admin",
      "profilePhoto": "string",
      "token": "string"
    }
  }
}
```

### POST /auth/signup
**Description**: User registration endpoint
**Request Body**:
```json
{
  "fullName": "string",
  "mobile": "string",
  "email": "string",
  "password": "string",
  "userType": "customer" | "worker",
  "aadhaarNumber": "string",
  "workCategory": "string" // for workers only
}
```

### POST /auth/logout
**Description**: User logout endpoint

## User Endpoints

### GET /users/profile
**Description**: Get current user profile
**Headers**: `Authorization: Bearer {token}`
**Response**:
```json
{
  "success": true,
  "data": {
    "id": "string",
    "fullName": "string",
    "email": "string",
    "mobile": "string",
    "type": "customer" | "worker" | "admin",
    "profilePhoto": "string",
    "aadhaarNumber": "string",
    "address": {
      "street": "string",
      "city": "string",
      "state": "string",
      "pincode": "string"
    },
    "rating": "number",
    "totalEarnings": "number" // for workers
  }
}
```

### PUT /users/profile
**Description**: Update user profile
**Headers**: `Authorization: Bearer {token}`

## Service Categories Endpoints

### GET /services/categories
**Description**: Get all service categories
**Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": "string",
      "name": "string",
      "icon": "string",
      "description": "string",
      "workers_count": "number"
    }
  ]
}
```

### GET /services/categories/{categoryId}/workers
**Description**: Get workers in a specific category
**Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": "string",
      "fullName": "string",
      "profilePhoto": "string",
      "rating": "number",
      "hourlyRate": "number",
      "experience": "string",
      "availability": "available" | "busy" | "offline",
      "distance": "string",
      "skills": ["string"]
    }
  ]
}
```

## Tasks/Bookings Endpoints

### GET /tasks
**Description**: Get tasks (available for workers, booked for customers)
**Headers**: `Authorization: Bearer {token}`
**Query Parameters**: `status`, `category`, `limit`, `offset`
**Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": "string",
      "title": "string",
      "description": "string",
      "category": "string",
      "location": "string",
      "budget": "number",
      "urgency": "low" | "medium" | "high",
      "status": "posted" | "assigned" | "in-progress" | "completed",
      "createdAt": "string",
      "deadline": "string",
      "customerName": "string",
      "workerName": "string"
    }
  ]
}
```

### POST /tasks
**Description**: Create a new task (for customers)
**Headers**: `Authorization: Bearer {token}`
**Request Body**:
```json
{
  "title": "string",
  "description": "string",
  "category": "string",
  "location": "string",
  "budget": "number",
  "urgency": "low" | "medium" | "high",
  "deadline": "string",
  "requirements": ["string"]
}
```

### PUT /tasks/{taskId}/apply
**Description**: Apply to a task (for workers)
**Headers**: `Authorization: Bearer {token}`

### PUT /tasks/{taskId}/status
**Description**: Update task status
**Headers**: `Authorization: Bearer {token}`
**Request Body**:
```json
{
  "status": "assigned" | "in-progress" | "completed"
}
```

## Dashboard Endpoints

### GET /dashboard/stats
**Description**: Get dashboard statistics
**Headers**: `Authorization: Bearer {token}`
**Response**:
```json
{
  "success": true,
  "data": {
    "totalTasks": "number",
    "completedTasks": "number",
    "totalEarnings": "number",
    "rating": "number",
    "activeTasks": "number"
  }
}
```

### GET /dashboard/recent-activity
**Description**: Get recent activity for dashboard
**Headers**: `Authorization: Bearer {token}`
**Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": "string",
      "type": "task_created" | "task_completed" | "payment_received",
      "title": "string",
      "description": "string",
      "timestamp": "string",
      "amount": "number"
    }
  ]
}
```

## Language Support

### GET /languages
**Description**: Get supported languages
**Response**:
```json
{
  "success": true,
  "data": [
    {
      "code": "en",
      "name": "English",
      "nativeName": "English"
    },
    {
      "code": "hi",
      "name": "Hindi",
      "nativeName": "हिन्दी"
    }
  ]
}
```

### GET /translations/{languageCode}
**Description**: Get translations for a specific language
**Response**:
```json
{
  "success": true,
  "data": {
    "welcome": "स्वागत",
    "customer": "ग्राहक",
    "worker": "श्रमिक"
  }
}
```