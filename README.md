# 🔗 URL Shortener

A backend-focused URL shortening service showcasing modern web development practices, API design patterns, and authentication mechanisms. This project demonstrates practical implementation of various web development concepts and security practices.

## Technical Implementation

### Authentication 
- **JWT-Based Authentication**: Implemented secure user authentication using JSON Web Tokens
- **Dual Client Support**: 
  - Browser-based authentication using HTTP-only cookies
  - API client support using Bearer token authentication
  - Middleware-based auth state management
- **Session Management**: Secure session handling with proper token validation

### URL Management System
- **Short URL Generation**: 
  - Implemented using nano-id for collision-resistant unique identifiers
  - Configurable URL length and character set
- **URL Analytics**: 
  - Visit history tracking
  - Click analytics implementation
  - Timestamp-based tracking

### Database Design
- **MongoDB Schema Design**:
  ```javascript
  // URL Schema with analytics
  {
    shortId: String,
    redirectURL: String,
    visitHistory: [{
      timestamp: Date,
      // Additional analytics data
    }],
    createdBy: ObjectId
  }

  // User Schema with security
  {
    email: String,
    password: String, // Hashed
    // User metadata
  }
  ```
- **Relationships**: Implemented document references for user-URL associations
- **Indexing**: Optimized queries with proper MongoDB indexing

### API Architecture
- **RESTful Endpoints**:
  ```
  POST /url           - Create short URL
  GET  /url/:shortId  - URL redirection
  POST /user/signup   - User registration
  POST /user/login    - Authentication
  ```
- **Response Handling**:
  - Proper HTTP status codes
  - Consistent error response format
  - Support for both JSON and view-based responses

### Security Implementation
- **Authentication Middleware**:
  ```javascript
  // Flexible auth middleware supporting both cookie and token-based auth
  async function restrictToLoggedinUserOnly(req, res, next) {
    // Browser-based cookie auth
    const userUid = req.cookies?.uid;
    
    // API client token auth
    // const token = req.headers.authorization?.split("Bearer ")[1];
    
    const user = getUser(userUid);
    req.user = user;
    next();
  }
  ```
- **Security Features**:
  - Password hashing
  - HTTP-only cookies
  - XSS protection
  - CSRF protection
  - Rate limiting

## Technical Challenges & Solutions

### 1. Multi-Client Authentication
- **Challenge**: Supporting both browser and API clients
- **Solution**: Implemented dual authentication handling
  - Cookie-based for browsers
  - Bearer token for API clients
  - Configurable middleware

### 2. URL Collision Prevention
- **Challenge**: Ensuring unique short URLs
- **Solution**: 
  - Used nano-id for URL generation
  - Implemented collision checking
  - Configurable ID length

### 3. Performance Optimization
- **Challenge**: Handling high-volume redirects
- **Solution**:
  - Efficient database indexing
  - Caching implementation
  - Optimized query patterns

## Learning Outcomes & Best Practices

### 1. API Design
- RESTful principles implementation
- Stateless authentication
- Error handling patterns
- Response format standardization

### 2. Security
- Authentication best practices
- Token management
- Security headers implementation
- Input validation

### 3. Database Management
- Schema design
- Indexing strategies
- Query optimization
- Data relationships

### 4. Code Architecture
- MVC pattern implementation
- Middleware design
- Service layer abstraction
- Error handling middleware

## Technical Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT
- **URL Generation**: nano-id
- **View Engine**: EJS

## Features

- 🔐 User Authentication (Login/Signup)
- 🔗 URL Shortening
- 📊 Click Analytics
- 🎯 Custom Short URLs
- 📱 Responsive Design
- ⚡ Fast Redirects

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Frontend**: EJS Templates, Bootstrap 5
- **Other Tools**: nodemon (development)

## Prerequisites

Before running this project, make sure you have:

- Node.js (v14 or higher)
- MongoDB installed and running
- npm or yarn package manager

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/url-shortener.git
   cd url-shortener
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```env
   MONGODB_URI=mongodb://localhost:27017/url-shortener
   JWT_SECRET=your_jwt_secret_key
   PORT=8000
   ```

4. Start the development server:
   ```bash
   npm start
   ```

The application will be available at `http://localhost:8000`

## API Endpoints

- `POST /url` - Create a new short URL
- `GET /url/:shortId` - Redirect to original URL
- `POST /user/signup` - Create a new user account
- `POST /user/login` - Login to existing account

## Project Structure

```
url-shortener/
├── controllers/     # Route controllers
├── middlewares/    # Custom middleware functions
├── models/         # Database models
├── routes/         # API routes
├── views/          # EJS templates
├── index.js        # Application entry point
└── connection.js   # Database connection
```

## Learning Outcomes

This project demonstrates several key concepts in backend development:

- RESTful API Design
- User Authentication & Authorization
- Database Schema Design
- MVC Architecture
- Error Handling
- Session Management
- Security Best Practices

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is licensed under the ISC License.

## Acknowledgments

- Built as a learning project to understand backend development
- Uses modern web development practices and tools
- Implements security best practices for user data protection 