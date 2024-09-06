# React + FastAPI Chat Application

This repository contains two applications:
1. **React App** - A frontend single-page application (SPA) built with React.
2. **FastAPI App** - A backend API server built with FastAPI.

## Prerequisites

Ensure you have the following installed on your system:
- **Node.js** (v14 or later) and **npm** (Node Package Manager)
- **Python** (v3.7 or later)
- **Pipenv** 

---

## Running Backend Locally

### 1. Naviagte to the backend folder

```bash
cd backend
```

### 2. Setup Virtual Env

```bash
python3 -m venv venv
source venv/bin/activate
```

### 3. Install dependencies

```bash
pip install fastapi uvicorn
```


### 4. Run Application

```bash
uvicorn main:app --reload
```

### 5. Use the Postman collection

- Use the provided postman collection in the backend folder to call the apis manually from postman
- Posmtan Collection File Name - **Chat Exercise Backend.postman_collection.json**

---

## Running Frontend Locally

### 1. Naviagte to the frontend folder

```bash
cd frontend
```

### 2. Install dependencies

```bash
npm install
```


### 3. Run Application

```bash
npm start
```

### 4. Access The Application

- Go the the following url in the browser - http://localhost:3000/





