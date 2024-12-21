import jwt from 'jsonwebtoken'

export function checkIfAuthenticated(req, res, next){
    const token = req.cookies.access_token;

    if(!token){
        return next()
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded
        return res.status(400).send("Ya estás autenticado");
    }catch(err){
        return next()
    }
}

