const { writeFileSync } = require('fs');
const { resolve } = require('path');
const { version } = require('../package.json');

const targetPath = resolve(__dirname, '../src/environments/version.ts');
const content = `export const appVersion = '${version}';\n`;

writeFileSync(targetPath, content);
console.log(`✔️ Versión ${version} generada en version.ts`);
