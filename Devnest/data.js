// data.js - Stores template data in a JavaScript array (simulating a backend)
const templates = [
    {
        id: 1,
        name: "Basic Node.js Server",
        description: "A simple Node.js server setup with Express.",
        tags: ["Node.js", "Express"],
        structure: ["server.js", "package.json", "routes/", "controllers/"],
        code: {
            server: `const express = require('express');\nconst app = express();\n\napp.get('/', (req, res) => {\n  res.send('Hello World!');\n});\n\napp.listen(3000, () => {\n  console.log('Server running on port 3000');\n});`,
            routes: `const express = require('express');\nconst router = express.Router();\n\nrouter.get('/api', (req, res) => {\n  res.json({ message: 'API endpoint' });\n});\n\nmodule.exports = router;`,
            controller: `const getData = (req, res) => {\n  res.json({ data: 'Sample data' });\n};\n\nmodule.exports = { getData };`
        },
        explanation: "server.js sets up the Express app and starts the server. routes.js defines API endpoints. controller.js handles business logic."
    },
    {
        id: 2,
        name: "REST API Boilerplate",
        description: "Full REST API with CRUD operations.",
        tags: ["Node.js", "Express", "API"],
        structure: ["server.js", "routes/api.js", "controllers/userController.js", "models/User.js"],
        code: {
            server: `const express = require('express');\nconst app = express();\n\napp.use(express.json());\napp.use('/api', require('./routes/api'));\n\napp.listen(3000);`,
            routes: `const router = require('express').Router();\nconst controller = require('../controllers/userController');\n\nrouter.get('/users', controller.getUsers);\nrouter.post('/users', controller.createUser);\n\nmodule.exports = router;`,
            controller: `const users = [];\n\nconst getUsers = (req, res) => {\n  res.json(users);\n};\n\nconst createUser = (req, res) => {\n  users.push(req.body);\n  res.status(201).json(req.body);\n};\n\nmodule.exports = { getUsers, createUser };`
        },
        explanation: "This template includes a full REST API structure. server.js initializes the app, routes.js handles routing, and controller.js manages data operations."
    },
     
    {
        id: 2,
        name: "REST API Boilerplate",
        description: "Full REST API with CRUD operations.",
        tags: ["Node.js", "Express", "API"],
        structure: ["server.js", "routes/api.js", "controllers/userController.js", "models/User.js"],
        code: {
            server: `const express = require('express');\nconst app = express();\n\napp.use(express.json());\napp.use('/api', require('./routes/api'));\n\napp.listen(3000);`,
            routes: `const router = require('express').Router();\nconst controller = require('../controllers/userController');\n\nrouter.get('/users', controller.getUsers);\nrouter.post('/users', controller.createUser);\n\nmodule.exports = router;`,
            controller: `const users = [];\n\nconst getUsers = (req, res) => {\n  res.json(users);\n};\n\nconst createUser = (req, res) => {\n  users.push(req.body);\n  res.status(201).json(req.body);\n};\n\nmodule.exports = { getUsers, createUser };`
        },
        explanation: "This template includes a full REST API structure. server.js initializes the app, routes.js handles routing, and controller.js manages data operations."
    },
    {
        id: 3,
        name: "JWT Authentication",
        description: "Secure API with JSON Web Token authentication.",
        tags: ["Node.js", "Express", "API", "JWT"],
        structure: ["server.js", "routes/auth.js", "controllers/authController.js", "middleware/auth.js"],
        code: {
            server: `const express = require('express');\nconst app = express();\n\napp.use(express.json());\napp.use('/auth', require('./routes/auth'));\n\napp.listen(3000);`,
            routes: `const router = require('express').Router();\nconst controller = require('../controllers/authController');\n\nrouter.post('/login', controller.login);\nrouter.get('/protected', require('../middleware/auth'), controller.protected);\n\nmodule.exports = router;`,
            controller: `const jwt = require('jsonwebtoken');\n\nconst login = (req, res) => {\n  const { username, password } = req.body;\n  if (username === 'admin' && password === 'pass') {\n    const token = jwt.sign({ user: username }, 'secret');\n    res.json({ token });\n  } else {\n    res.status(401).json({ error: 'Invalid credentials' });\n  }\n};\n\nconst protected = (req, res) => {\n  res.json({ message: 'Access granted' });\n};\n\nmodule.exports = { login, protected };`
        },
        explanation: "server.js sets up the app. routes/auth.js handles login and protected routes. controller.js manages authentication logic with JWT. middleware/auth.js verifies tokens."
    },
    {
        id: 4,
        name: "MongoDB Integration",
        description: "API with MongoDB database using Mongoose.",
        tags: ["Node.js", "Express", "MongoDB", "API"],
        structure: ["server.js", "routes/products.js", "controllers/productController.js", "models/Product.js"],
        code: {
            server: `const express = require('express');\nconst mongoose = require('mongoose');\nconst app = express();\n\nmongoose.connect('mongodb://localhost/devnest');\napp.use(express.json());\napp.use('/products', require('./routes/products'));\n\napp.listen(3000);`,
            routes: `const router = require('express').Router();\nconst controller = require('../controllers/productController');\n\nrouter.get('/', controller.getProducts);\nrouter.post('/', controller.createProduct);\n\nmodule.exports = router;`,
            controller: `const Product = require('../models/Product');\n\nconst getProducts = async (req, res) => {\n  const products = await Product.find();\n  res.json(products);\n};\n\nconst createProduct = async (req, res) => {\n  const product = new Product(req.body);\n  await product.save();\n  res.status(201).json(product);\n};\n\nmodule.exports = { getProducts, createProduct };`
        },
        explanation: "server.js connects to MongoDB and sets up the app. routes/products.js defines product endpoints. controller.js handles CRUD with Mongoose. models/Product.js defines the schema."
    },
    {
        id: 5,
        name: "File Upload API",
        description: "API for uploading and serving files.",
        tags: ["Node.js", "Express", "API", "File Upload"],
        structure: ["server.js", "routes/upload.js", "controllers/uploadController.js", "uploads/"],
        code: {
            server: `const express = require('express');\nconst multer = require('multer');\nconst app = express();\n\nconst upload = multer({ dest: 'uploads/' });\napp.use(express.json());\napp.use('/upload', require('./routes/upload'));\n\napp.listen(3000);`,
            routes: `const router = require('express').Router();\nconst controller = require('../controllers/uploadController');\nconst upload = require('multer')({ dest: 'uploads/' });\n\nrouter.post('/', upload.single('file'), controller.uploadFile);\n\nmodule.exports = router;`,
            controller: `const uploadFile = (req, res) => {\n  if (!req.file) {\n    return res.status(400).json({ error: 'No file uploaded' });\n  }\n  res.json({ message: 'File uploaded', filename: req.file.filename });\n};\n\nmodule.exports = { uploadFile };`
        },
        explanation: "server.js sets up Multer for file handling. routes/upload.js defines the upload endpoint. controller.js processes the uploaded file."
    },
    {
        id: 6,
        name: "WebSocket Chat",
        description: "Real-time chat application with WebSockets.",
        tags: ["Node.js", "WebSocket", "Real-time"],
        structure: ["server.js", "public/index.html", "public/chat.js"],
        code: {
            server: `const express = require('express');\nconst http = require('http');\nconst socketIo = require('socket.io');\nconst app = express();\nconst server = http.createServer(app);\nconst io = socketIo(server);\n\napp.use(express.static('public'));\n\nio.on('connection', (socket) => {\n  socket.on('chat message', (msg) => {\n    io.emit('chat message', msg);\n  });\n});\n\nserver.listen(3000);`,
            routes: `// No routes for this template - WebSocket only`,
            controller: `// No controller - handled in server.js`
        },
        explanation: "server.js sets up Express and Socket.IO for real-time communication. Clients connect via WebSocket to send and receive messages instantly."
    },
    {
        id: 7,
        name: "Email Sending API",
        description: "API to send emails using Nodemailer.",
        tags: ["Node.js", "Express", "Email", "API"],
        structure: ["server.js", "routes/email.js", "controllers/emailController.js"],
        code: {
            server: `const express = require('express');\nconst app = express();\n\napp.use(express.json());\napp.use('/email', require('./routes/email'));\n\napp.listen(3000);`,
            routes: `const router = require('express').Router();\nconst controller = require('../controllers/emailController');\n\nrouter.post('/send', controller.sendEmail);\n\nmodule.exports = router;`,
            controller: `const nodemailer = require('nodemailer');\n\nconst transporter = nodemailer.createTransporter({\n  service: 'gmail',\n  auth: { user: 'your-email@gmail.com', pass: 'password' }\n});\n\nconst sendEmail = (req, res) => {\n  const { to, subject, text } = req.body;\n  transporter.sendMail({ from: 'your-email@gmail.com', to, subject, text }, (err) => {\n    if (err) res.status(500).json({ error: 'Failed to send' });\n    else res.json({ message: 'Email sent' });\n  });\n};\n\nmodule.exports = { sendEmail };`
        },
        explanation: "server.js initializes the app. routes/email.js defines the send endpoint. controller.js uses Nodemailer to send emails."
    }
];



