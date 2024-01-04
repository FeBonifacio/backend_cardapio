import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors'; //tratativa de erros e importar em secundo sempre
import cors from 'cors';
import path from 'path';

import { router } from './routes'

const app = express();

// rotas estao aqui
app.use(express.json());
app.use(router);
app.use(cors()) // para qualquer url acessar aplicação

// Rota statica Para acessar foto
app.use(
    '/files',
    express.static(path.resolve(__dirname, '..', 'tmp'))
)

// tratativa de erro
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof Error) {
        //Se for uma instancia de error
        return res.status(400).json({
            error: err.message
        })
    }

    return res.status(500).json({
        status: 'error',
        message: 'Internal server error.'
    })
})

// chamando a porta para rodar aplicação
app.listen(3333, () => console.log('Servidor funcionando e online!'));