require('dotenv').config({ path: './credenciales.env' }); // archivo real con tus credenciales
const app = require('./app');

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});