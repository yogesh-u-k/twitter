
# Twitter Clone - MERN Stack

A social media application similar to Twitter, built using the MERN stack (MongoDB, Express, Node.js, Postman) 

## Features

- ⚛️ **Tech Stack**: MongoDB, Node.js, Express
- 🔐 **Authentication**: JSON Web Tokens (JWT)
- 👥 **Suggested Users to Follow**
- ✍️ **Creating Posts**
- 🗑️ **Deleting Posts**
- 💬 **Commenting on Posts**
- ❤️ **Liking Posts**
- 🔒 **Delete Posts** 
- 📝 **Edit Profile Info**
- 🖼️ **Edit Cover Image and Profile Image**
- 📷 **Image Uploads** using Cloudinary
- 🔔 **Send Notifications**

## Getting Started

### Prerequisites

Ensure you have the following installed on your local machine:

- Node.js
- npm (Node Package Manager)
- MongoDB (or use a MongoDB cloud service)
### Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/your-username/twitter.git
    cd twitter
    ```
2. Install server dependencies:

    ```sh
    cd backend
    npm install
    ```
### Environment Variables

Create a .env file in the directory and add the following:

 ```sh
    MONGO_URI=your_mongo_db_uri
    PORT=your_port
    JWT_SECRET=your_jwt_secret
    NODE_ENV=development
    CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret
 ```
### Running the Application

1. Start the backend server:

    ```sh
    cd backend
    npm run dev
    ```
The application should now be running on `http://localhost:5000`.

### Using Postman for API Testing

1. Open Postman and create a new collection.

2. Add requests to the collection for each API endpoint. Common endpoints include:

    - **User Authentication**: 
        - POST `http://localhost:5000/api/auth/signup`
        - POST `http://localhost:5000/api/auth/login`
        - POST `http://localhost:5000/api/auth/logout`
        - GET `http://localhost:5000/api/auth/get`
          
    - **Posts**: 
        - POST `http://localhost:5000/api/posts/create`
        - POST `http://localhost:5000/api/posts/like/:id`
        - GET `http://localhost:5000/api/posts//likes/:id`
        - GET `http://localhost:5000/api/posts/following`
        - GET `http://localhost:5000/api/posts/user/:username`
        - POST `http://localhost:5000/api/posts/comment/:id`
        - DELETE `http://localhost:5000/api/posts/:id`
        - GET `http://localhost:5000/api/posts/all`
          
    - **Profile**: 
        - GET `http://localhost:5000/api/users/:id`
        - PUT `http://localhost:5000/api/users/:id`

3. Test each endpoint to ensure it works as expected.

## Folder Structure

```plaintext
    twitter-clone/
    ├── server/                 # Express.js backend
    │   ├── db/             # Configuration files (e.g., database connection)
    │   ├── controllers/        # API endpoint logic
    │   ├── middleware/         # Authentication and other middleware
    │   ├── models/             # Mongoose models
    │   ├── routes/             # API routes
    │   └── lib/utils/              # Utility functions
    └── .env                    # Environment variables
```

  ## Features Breakdown

- **Authentication**: Secure user authentication using JWT.
- **Posts**: Users can create, delete, and like posts. Only post owners can delete their posts.
- **Comments**: Users can comment on posts.
- **Profiles**: Users can edit their profile information, including cover and profile images.
- **Image Uploads**: Images are uploaded and stored using Cloudinary.
- **Notifications**: Users receive notifications for relevant activities.





