const fs = require('fs');
const { resolve } = require('path');
const { promisify } = require('util');

async function bootstrap() {
  const tmpFolderName = 'tmp';
  const tmpFolderPath = resolve(__dirname, '..', tmpFolderName);

  if (!fs.existsSync(tmpFolderPath)) {
    await fs.promises.mkdir(tmpFolderPath);
  }
}

module.exports = { bootstrap };
