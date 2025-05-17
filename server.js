const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Servir archivos estáticos desde la carpeta correcta
app.use(express.static(path.join(__dirname, 'dist','ng-web-site-ti-company')));

// Manejar rutas y redirigir al archivo index.html
app.get(/(.*)/, (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'ng-web-site-ti-company',  'index.html'));
});

app.listen(PORT, () => {
    console.log( `Servidor Angular Expediente corriendo en http://localhost:${PORT}`);
});
