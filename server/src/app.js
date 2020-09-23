const express = require('express');
const fileUpload = require('express-fileupload');
const helmet = require('helmet');
const cors = require('cors');
const { NODE_ENV, PORT } = require('./config');
const errorHandler = require('./middleware/error-handler');

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(fileUpload({
    safeFileNames: new RegExp(/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i)
}));

app.post('/upload', async (req, res, next) => {
    if (!app.files) {
        res.status(400).json({
            message: 'No file(s) uploaded!'
        });
    }
    try {

        const { pics } = req.files;
        await pics.mv(`${__dirname}/client/public/uploads/${pics.name}`);

        return res.status(200).json({ fileName: pics.name, filePath: `/uploads/${pics.name}` });
    } catch (err) {
        next(err);
    }
});

app.use(errorHandler);

app.listen(PORT, () => console.info(`Express.js server listening on ${PORT}`));