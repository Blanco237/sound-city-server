const express = require("express");
const cors = require('cors');
const fileUpload = require('express-fileupload');


require('dotenv').config();



const app = express();



app.use(express.json());
app.use(cors());
app.use(fileUpload({
    useTempFiles: true,
    limits: { fileSize: 20 * 1024 * 1024}
}))

/*Database Import*/
const db = require('./models');

/*Router Import*/
const userRouter = require('./routes/Users');
const uploadRouter = require('./routes/Upload');
const songRouter = require('./routes/Songs');
app.use('/users', userRouter);
app.use('/upload', uploadRouter);
app.use('/songs', songRouter);

const port = process.env.PORT || 5000;
db.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on ${port}`)
    })
})

app.get('/', (req, res) => {
    res.status(200).send('<h1>Sound City Yoo</h1>')
})