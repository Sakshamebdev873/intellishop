import express, { type Request, type Response } from 'express'
import morgan from 'morgan'
import authRouter from './routes/authRoutes'



const app = express()
app.use(express.json())
app.use(morgan('dev'))


app.use('/',(req:Request,res:Response)=>{
console.log('hello world.......');
})
app.use('/api/v1/auth',authRouter)
const start = () =>{
    try {
        app.listen(5100,()=>{
            console.log('Sever is listening on port 5100.....');
        })
    } catch (error:any) {
        console.log(error);
    }
}
start()