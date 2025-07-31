# TaskNest Backend

This is the backend for TaskNest, built with Node.js, Express, and MongoDB.

## File Structure

```
tasknest-backend/
├── config/
│   └── db.js               # MongoDB connection setup
├── controllers/
│   └── authController.js   # Login/Register logic
│   └── taskController.js   # CRUD logic for tasks
├── middleware/
│   └── authMiddleware.js   # Auth guard using JWT
├── models/
│   └── User.js
│   └── Task.js
├── routes/
│   └── authRoutes.js
│   └── taskRoutes.js
├── .env
├── .gitignore
├── package.json
├── server.js
└── README.md
``` 