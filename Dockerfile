# Stage 1: Build the React Frontend (Vite)
FROM node:23.11.0-alpine AS frontend-builder

WORKDIR /app/frontend

# Copy frontend package.json and lock file
COPY todo-frontend/package*.json ./

# Install frontend dependencies
RUN npm install

# Copy the rest of the frontend code
COPY todo-frontend .

# Build the frontend
RUN npm run build

# Stage 2: Build the Flask Backend
FROM python:alpine AS backend-builder

WORKDIR /app/backend

# Copy backend requirements file
COPY todo-backend/requirements.txt ./

# Install backend dependencies
RUN pip install -r requirements.txt

# Copy the rest of the backend code
COPY todo-backend .

# Stage 3: Final Image with Flask and Built Frontend
FROM python:alpine

WORKDIR /app

# Copy built frontend from the frontend-builder stage
COPY --from=frontend-builder /app/frontend/dist ./static

# Copy backend files from the backend-builder stage
COPY --from=backend-builder /app/backend .

# Set environment variables
ENV FLASK_APP app.py
ENV FLASK_ENV production
ENV PORT 5000  # Standard Flask port

# Expose the port the Flask app will run on
EXPOSE 5000

# Command to run the Flask application
CMD ["flask", "run", "--host=0.0.0.0", "--port=$PORT"]