const cookieChecker=(req,res,next)=>{
    if(!req.cookies['access-token']){
        res.status(401).redirect("/backend");
    }
    next();
}

module.exports=cookieChecker;