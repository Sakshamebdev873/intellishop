import express, {} from 'express';
import morgan from 'morgan';
import authRouter from './routes/authRoutes.js';
import productRouter from './routes/productRoutes.js';
import { authMiddleware, requireAdmin } from './middleware/authMiddleware.js';
import cookieParser from 'cookie-parser';
import cartRouter from './routes/cartRoutes.js';
import orderRouter from './routes/orderRoutes.js';
import reviewRouter from './routes/reviewRoutes.js';
const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());
app.get('/', (req, res) => {
    console.log('hello world.......');
});
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/product', authMiddleware, requireAdmin, productRouter);
app.use('/api/v1/cart', authMiddleware, cartRouter);
app.use('/api/v1/orders', authMiddleware, orderRouter);
app.use('/api/v1/reviews', reviewRouter);
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