const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv').config()
const cookieparser = require('cookie-parser')


const userRouter = require('./routes/UserRoutes')
const dashRouter = require('./routes/DashRoutes')
const teamRouter = require('./routes/TeamRoutes')
const syncDatabase = require('./config/sync')



const app = express();

const allowedOrigins = [`${process.env.FRONTEND_URL}`]

app.use((req, res, next) => {
    const origin = req.get('Origin');
    
    if (allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin);
    } else {
        res.header('Access-Control-Allow-Origin', ''); // Or set to null if you prefer
    }

    res.header('Access-Control-Allow-Methods', 'GET, POST,PATCH, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.sendStatus(204); // No content
        return;
    }

    next();
});

app.use(express.json())



app.use('/sign',userRouter)
app.use('/dash',dashRouter)
app.use('/team',teamRouter)

app.listen(process.env.PORT,()=>{
    syncDatabase();
    console.log(`Server is listening at port ${process.env.PORT}`)
})