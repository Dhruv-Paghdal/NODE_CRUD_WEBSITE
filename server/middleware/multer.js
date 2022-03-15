const multer = require('multer');

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"uploads");
    },
    filename:(req,file,cb)=>{
        let extension=file.originalname.slice(file.originalname.lastIndexOf('.'));
        let originalName=file.originalname.slice(0,file.originalname.lastIndexOf("."));
        cb(null,originalName+"-"+Date.now()+extension);
    }
})

const store = multer({storage});

module.exports=store;