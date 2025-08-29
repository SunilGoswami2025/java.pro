const multer = require("multer");
const path = require("path");

// Configure multer for file uploads
// const upload = multer();
// const upload = multer({ dest:"./public/images"})



const storage = multer.diskStorage({
  destination: (req,file, cb) => { 
    cb(null, path.join(__dirname, "..","..", "product", "images"));
  },
  filename: (req, file, cb) => {  
    const proFix = Date.now() + "-"+Math.ceil(Math.random() * 1000) ; 
    cb(null,proFix +"_"+  file.originalname)
  } 
});
const upload = multer({ storage: storage });


module.exports = upload;




