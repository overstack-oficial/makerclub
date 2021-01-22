const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const configAuth = require('../../config/auth');

module.exports = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            error: true,
            code: 101,
            message: "Erro: Você precisa estar logado para fazer essa requisição!"
        });
    }

    const [, token] = authHeader.split(' ');

    try {
        const decoded = await promisify(jwt.verify)(token, configAuth.secret);
        req.body.user = decoded.id;

        return next();
    } catch (err) {
        return res.status(401).json({
            error: true,
            code: 102,
            message: "Erro: Token Inválido!"
        });
    }
}