const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '../src/environments/environment.ts');
const apiUrl = process.env.API_URL || '/api';
const isProd = process.env.NODE_ENV === 'production' || process.env.API_URL;

const envConfigFile = `export const environment = {
    production: ${!!isProd},
    apiUrl: '${apiUrl}',
};
`;

fs.writeFile(targetPath, envConfigFile, function (err) {
    if (err) {
        console.log(err);
    }
    console.log(`✅ Environment file generated at ${targetPath}`);
    console.log(`   - production: ${!!isProd}`);
    console.log(`   - apiUrl: ${apiUrl}`);
});
