const cuentas = require('../data/cuentasDeclaracion');

const cuentasTotales = (req, res) => {
    if (Object.keys(req.query).length > 0) {
        return buscarCuentasParametros(req, res);
    }

    res.json({
        count: cuentas.length,
        data: cuentas
    });
};

const cuentaPorId = (req, res) => {
    const { id } = req.params;
    const cuenta = cuentas.find(c => c._id === id);

    if (cuenta) {
        res.json({
            finded: true,
            account: cuenta
        });
    } else {
        res.json({
            finded: false,
            account: null
        });
    }
};

const buscarCuentasParametros = (req, res) => {
    const consultaParam = Object.keys(req.query)[0];
    const consultValor = req.query[consultaParam];

    if (!consultValor) {
        return res.status(400).json({
            error: "Hace falta un parámetro para realizar la consulta"
        });
    }

    let resultado = [];

    if (consultaParam === '_id' || consultaParam === 'id') {
        resultado = cuentas.filter(c => c._id === consultValor);
    }
    else if (consultaParam === 'client' || consultaParam === 'nombre') {
        resultado = cuentas.filter(c =>
            c.client.toLowerCase().includes(consultValor.toLowerCase())
        );
    }

    else if (consultaParam === 'gender' || consultaParam === 'genero') {
        resultado = cuentas.filter(c =>
            c.gender.toLowerCase() === consultValor.toLowerCase()
        );
    }

    if (resultado.length === 1) {
        return res.json({
            finded: true,
            account: resultado[0]
        });
    }

    if (resultado.length > 1) {
        return res.json({
            finded: true,
            data: resultado
        });
    }

    res.json({
        finded: false,
        account: null
    });
};

const cuentasBalance = (req, res) => {
    const cuentasActivas = cuentas.filter(c => c.isActive === true);

    if (cuentasActivas.length === 0) {
        return res.json({
            status: false,
            accountBalance: 0
        });
    }

    const totalBalance = cuentasActivas.reduce((sum, cuenta) => {
        const balance = parseFloat(cuenta.balance.replace(/[$,]/g, ''));
        return sum + balance;
    }, 0);

    res.json({
        status: true,
        accountBalance: totalBalance.toFixed(2)
    });
};


module.exports = {
    cuentasTotales,
    cuentaPorId,
    buscarCuentasParametros,
    cuentasBalance
};
