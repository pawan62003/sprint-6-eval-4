const jwt = require('jsonwebtoken');

const auth = (req,res,next)=>{
    const token = req.headers.authorization
    if(token){
        try {
            const decode = jwt.verify(token.split(" ")[1],'masai')
            if(decode){
                req.body.userID=decode.userID
                next();
            }
            else{
                res.send({"msg":"Please Login !!!"})
            }
        } catch (error) {
            res.send({"err":error})
        }
    }
    else{
        res.send({"msg":"Please Login !!!"})
    }
}

module.exports={
    auth
}