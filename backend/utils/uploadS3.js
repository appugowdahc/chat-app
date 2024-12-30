const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const multer = require('multer');
const multerS3 = require('multer-s3');

const dotenv = require('dotenv');
dotenv.config()
// Configure AWS SDK v3
const s3 = new S3Client({
  region: process.env.AWS_REGION, // e.g., 'us-east-1'
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY, // Store in environment variables
    secretAccessKey: process.env.AWS_SECRET_KEY, // Store in environment variables
  },
});

// Configure Multer-S3
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'ag-chat-app',
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, Date.now().toString() + '-' + file.originalname);
    }
  }),
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type, only images are allowed!'), false);
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 } // 5 MB file size limit
});

module.exports = { upload };
