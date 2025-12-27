const bcrypt = require('bcryptjs');

console.log('Generating bcrypt hashes for seed data...\n');
console.log('Admin123!:', bcrypt.hashSync('Admin123!', 10));
console.log('Student123!:', bcrypt.hashSync('Student123!', 10));
console.log('Sponsor123!:', bcrypt.hashSync('Sponsor123!', 10));
console.log('Cause123!:', bcrypt.hashSync('Cause123!', 10));
