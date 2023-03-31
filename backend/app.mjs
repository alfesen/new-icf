import bodyParser from 'body-parser';
import express from 'express';
import { connect } from 'mongoose';
import headerRoutes from './routes/header.routes.mjs';
import path from 'path';
const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@merncluster.c47z4pr.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const app = express();
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
});
app.use(bodyParser.json());
app.use('/api/', headerRoutes);
app.use('/uploads/images', express.static(path.join('uploads', 'images')));
app.use((error, req, res, next) => {
    res.status(error.statusCode || 500);
    res.json({ message: error.message || 'Unhandled Server Error' });
});
connect(url)
    .then(() => {
    console.log('connected');
    app.listen(5000);
})
    .catch(err => console.log(err));
