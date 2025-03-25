const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv').config()
const cookieparser = require('cookie-parser')


const userRouter = require('./routes/UserRoutes')
const dashRouter = require('./routes/DashRoutes')
const teamRouter = require('./routes/TeamRoutes')
const syncDatabase = require('./config/sync')



const app = express();

// Enable CORS for all origins
app.use(cors({
    origin: ['https://flexskill.onrender.com', 'http://localhost:5173'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: [
        'Content-Type',
        'Authorization',
        'X-Requested-With',
        'Accept',
        'Origin',
        'Access-Control-Allow-Headers',
        'Access-Control-Request-Method',
        'Access-Control-Request-Headers'
    ],
    exposedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json())



app.use('/sign',userRouter)
app.use('/dash',dashRouter)
app.use('/team',teamRouter)

app.listen(process.env.PORT,()=>{
    syncDatabase();
    console.log(`Server is listening at port ${process.env.PORT}`)
})