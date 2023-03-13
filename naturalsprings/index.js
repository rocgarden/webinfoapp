require('dotenv').config();
const express = require('express');
const path = require('path');

const helmet = require('helmet');
const compression = require('compression');
const bodyParser = require('body-parser');

const cors = require('cors')
const app = express();
const apiPort = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express().use('*', cors()));
app.use(express.json());
app.use(helmet());
app.use(compression());
app.use(bodyParser.json());



const emailRoute = require('./routes/EmailRoute');

app.use('/api/contact', emailRoute);

app.use(express.static(path.join('public')));
app.use((req,res,next) =>{
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
})

//routing error
app.use(( req,res,next)=>{
    const error = new HttpError('Could not find route', 404);
    throw error;
});


app.listen(apiPort, () => console.log(`Success Server running on port ${apiPort} :)`))