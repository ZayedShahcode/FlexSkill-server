const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv').config()
const cookieparser = require('cookie-parser')


const userRouter = require('./routes/UserRoutes')
const dashRouter = require('./routes/DashRoutes')
const teamRouter = require('./routes/TeamRoutes')
const syncDatabase = require('./config/sync')



const app = express();
app.use(cookieparser());
app.use(cors({
    origin: `${process.env.FRONTEND_URL}`,
    credentials: true,
}));
app.use(express.json())



app.use('/sign',userRouter)
app.use('/dash',dashRouter)
app.use('/team',teamRouter)

app.listen(process.env.PORT,()=>{
    syncDatabase();
    console.log(`Server is listening at port ${process.env.PORT}`)
})