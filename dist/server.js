import express, {} from 'express';
import morgan from 'morgan';
import authRouter from './routes/authRoutes.js';
import productRouter from './routes/productRoutes.js';
import { authMiddleware, requireAdmin } from './middleware/authMiddleware.js';
import cookieParser from 'cookie-parser';
const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());
app.get('/', (req, res) => {
    console.log('hello world.......');
});
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/product', authMiddleware, requireAdmin, productRouter);
const start = () => {
    try {
        app.listen(5100, () => {
            console.log('Sever is listening on port 5100.....');
        });
    }
    catch (error) {
        console.log(error);
    }
};
start();
//# sourceMappingURL=server.js.map