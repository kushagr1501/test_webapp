import express from 'express'

const app = express();
import cors from 'cors';
import cookieParser from 'cookie-parser';
import routes from './routes/index.routes.js';
const corsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'],
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(cookieParser());
 
app.use("/api/v1/", routes);


app.get('/', (_req, res) => {
    res.send("Hello Kushagr");
});
app.all('*', (req, res) => {
    return res.status(404).json({
        success: false,
        message: "INVALID PAGE"
    });
});
export default app;