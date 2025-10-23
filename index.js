const express = require('express');
const rutasCuentas = require('./rutasCuentas');

const app = express();
const PORT = 3130;

app.use(express.json());

app.use('/', rutasCuentas);

app.get('/', (req, res) => {
  res.json({
    message: 'Rutas de endopoints para el ejercicio de cuentas: ',
    endpoints: [
      'GET /cuentas --- Obtener todas las cuentas',
      'GET /cuenta/:id --- Obtener cuenta por ID',
      'GET /cuentas?Param=valor --- Buscar por ID, nombre o género',
      'GET /cuentasBalance --- Obtener balance total de cuentas activas'
    ]
  });
});



app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});