const express = require('express');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const cors = require('cors');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use(express.json());

app.post('/upload', upload.single('file'), async (req, res) => {
    if (!req.file) return res.status(400).send('No file uploaded');

    const fileBuffer = req.file.buffer;
    const data = await pdfParse(fileBuffer);
    res.json({ text: data.text });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
