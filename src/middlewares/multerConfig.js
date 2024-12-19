// middlewares/multerConfig.js
import multer from 'multer';

// Configure multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads'); 
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

// File filter to accept only images
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Only .jpeg, .png, and .jpg formats are allowed!'), false);
    }
};

// Configure multer
const upload = multer({
    storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // Limit file size to 5MB
    fileFilter,
});

export default upload;
