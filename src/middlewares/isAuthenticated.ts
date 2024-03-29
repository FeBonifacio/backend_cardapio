import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface Payload{
    sub: string;
}

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
    
    // Receber token
    const authToken = req.headers.authorization;

    // Se nao tiver o token
    if(!authToken){
        return res.status(401).end();
    }

    const [, token] = authToken.split(" ")

    try {
        // Validar token
        const { sub } = verify(
            token,
            process.env.JWT_SECRET
        ) as Payload;

        // recuperar o id do token e colocar dentro de uma variavel user_id dentro do Req
        req.user_id = sub;

        return next();

    } catch (err) {
        return res.status(401).end();
    }
}
