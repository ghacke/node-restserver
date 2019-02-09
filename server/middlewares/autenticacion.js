const jwt = require('jsonwebtoken');

// ========================
// Verificar Token
// ========================
let vertificaToken = (req, res, next) => {

    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'El token no es valido.'
                }
            });
        }

        req.usuario = decoded.usuario;
        next();

    });

};

// ========================
// Verificar AdminRole
// ========================
let verificaRolAdmin = (req, res, next) => {

    if (req.usuario.role != 'ADMIN_ROLE') {
        return res.status(401).json({
            ok: false,
            err: {
                message: 'El usuario no es ADMIN.'
            }
        });
    }

    next();
};

module.exports = {
    vertificaToken,
    verificaRolAdmin
}