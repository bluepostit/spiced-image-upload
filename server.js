const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const { uploader } = require('./middleware');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());

app.post('/image', uploader.single('file'), (req, res) => {
    // validation
    // get the file from the request
    // save the file somewhere
    // respond to client
    if (req.file) {
        res.json({
            success: true,
            message: 'Thank you!',
            path: `/uploads/${req.file.filename}`
        });
    } else {
        res.json({
            success: false,
            message: 'Please try again'
        });
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => console.log(`I'm listening on port ${PORT}.`));
