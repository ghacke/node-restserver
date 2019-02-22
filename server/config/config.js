process.env.PORT = process.env.PORT || 3000;

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

process.env.URLDB = process.env.MONGO_URI || 'mongodb://localhost:27017/cafe';

// ============================
// vencimiento del Token
// ============================
process.env.CADUCIDAD_TOKEN = '48h';

// ============================
// SEED de auth
// ============================
process.env.SEED = process.env.SEED || 'este-es-el-seed-de-desarrollo';

// Google Client ID
process.env.CLIENT_ID = process.env.CLIENT_ID || '314911024817-1lejmda1j2ecjleovhs7j89lmkj1og7p.apps.googleusercontent.com';