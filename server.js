const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`¡Noche de Confesiones está corriendo!`);
  console.log(`Abre tu navegador y ve a http://localhost:${port}`);
});