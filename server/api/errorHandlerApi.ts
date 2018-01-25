import { Request, Response, RequestHandler, ErrorRequestHandler, NextFunction } from 'express';

export function errorRequestHandler(err: ErrorRequestHandler, req: Request,res:Response , next: NextFunction) {
    console.error(`API error handler foi executada: ${err}`);
        res.status(500).json({
        errorCode: 'ERR-001',
        message: 'Erro Interno do Servidor'
    });
}
