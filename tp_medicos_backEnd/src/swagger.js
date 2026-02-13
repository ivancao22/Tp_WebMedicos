const path = require('path');
const fs = require('fs');

module.exports = function (app) {
  let swaggerUi;
  let YAML;
  try {
    swaggerUi = require('swagger-ui-express');
    YAML = require('yamljs');
  } catch (e) {
    console.warn('Instala swagger-ui-express y yamljs si querés la UI: npm i swagger-ui-express yamljs');
    return;
  }

  // Busca swagger.yaml en varias rutas posibles y usa la primera que exista
  const possiblePaths = [
    path.resolve(__dirname, '..', 'swagger.yaml'), // raíz del repo
    path.resolve(__dirname, 'swagger.yaml'),       // src/swagger.yaml (por si la dejaste ahí)
    path.resolve(process.cwd(), 'swagger.yaml')    // cwd/swagger.yaml
  ];

  const swaggerPath = possiblePaths.find(p => fs.existsSync(p));
  if (!swaggerPath) {
    console.warn('swagger.yaml no encontrado. Colócalo en la raíz o en src/ y reinicia.');
    return;
  }

  let swaggerDocument;
  try {
    swaggerDocument = YAML.load(swaggerPath);
  } catch (err) {
    console.warn('Error parsando swagger.yaml:', err.message);
    return;
  }

  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  console.log('Swagger UI disponible en /docs (cargado desde ' + swaggerPath + ')');
};