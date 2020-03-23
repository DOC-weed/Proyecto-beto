process.env.PORT = process.env.PORT || 3000;
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
let URLDB;
if (process.env.NODE_ENV === 'dev') {
    URLDB = 'mongodb://localhost:27017/sample_airbnb';
} else {
    URLDB = '';
}
process.env.URLDB = URLDB;
process.env.SEED = process.env.SEED || 'firma-Andres-Edson';