process.env.PORT = process.env.PORT || 3000;

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

process.env.URLDB = process.env.MONGO_URI || 'mongodb://localhost:27017/cafe';

// ============================
// vencimiento del Token
// ============================
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

// ============================
// SEED de auth
// ============================
process.env.SEED = process.env.SEED || 'este-es-el-seed-de-desarrollo';