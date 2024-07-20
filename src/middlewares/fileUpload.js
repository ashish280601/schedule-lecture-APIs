import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./assets/uploads");
    },
    filename: (req, file, cb) => {
        // extracting file extension
        const ext = file.originalname.split(".").pop();
        // construct aa unique filename with a timestamp
        const filename =
            new Date().toISOString().replace(/:/g, "-") +
            "-" +
            Math.random().toString(36).substring(7) +
            "-" +
            ext;
        cb(null, filename);
    },
});

const uploads = multer({
    storage: storage,
});

export default uploads;