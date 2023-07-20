const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { VectorizeDocument } = require('../../app/VectorizeDocument');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Specify the directory where you want to save the uploaded files
    cb(null, path.resolve(__dirname, '..', '..', 'uploads/'));
  },
  filename: (req, file, cb) => {
    // Generate a unique filename for the uploaded file
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
  },
});

const upload = multer({ storage });

router.post('/', upload.single('file'), (req, res) => {
  console.log('File upload: ', req.file);
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const file = req.file;
  console.log('File uploaded: ', file.filename);

  VectorizeDocument(file.path);

  res.status(200).send({
    message: 'File successfully uploaded',
    filename: file.filename,
    mimetype: file.mimetype,
    size: file.size,
    path: file.path,
  });
});

module.exports = router;
