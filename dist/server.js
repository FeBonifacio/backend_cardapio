"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("express-async-errors"); //tratativa de erros e importar em secundo sempre
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const routes_1 = require("./routes");
const app = (0, express_1.default)();
// rotas estao aqui
app.use(express_1.default.json());
app.use((0, cors_1.default)()); // para qualquer url acessar aplicação/ chamar sempre antes do router
app.use(routes_1.router);
// Rota statica Para acessar foto
app.use('/files', express_1.default.static(path_1.default.resolve(__dirname, '..', 'tmp')));
// tratativa de erro
app.use((err, req, res, next) => {
    if (err instanceof Error) {
        //Se for uma instancia de error
        return res.status(400).json({
            error: err.message
        });
    }
    return res.status(500).json({
        status: 'error',
        message: 'Internal server error.'
    });
});
// chamando a porta para rodar aplicação
app.listen(3333, () => console.log('Servidor funcionando e online!'));
