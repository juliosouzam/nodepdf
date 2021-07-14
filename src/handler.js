const fs = require('fs');
const { resolve } = require('path');

class Handler {
  constructor({ pdf }) {
    this.pdf = pdf;
  }

  async main() {
    const tmpFolder = resolve(__dirname, '..', 'tmp');
    const files = await fs.promises.readdir(tmpFolder);
    if (!files.length) return;

    const now = new Date();
    this.pdf.pipe(fs.createWriteStream(`${now.getTime()}.pdf`));

    files.map((filename) => {
      const img = this.pdf.openImage(resolve(tmpFolder, filename));
      this.pdf.addPage({ size: [img.width, img.height] });
      this.pdf.image(img, 0, 0);
    });

    this.pdf.end();
  }
}

const pdf = new (require('pdfkit'))({
  autoFirstPage: false,
});

const handler = new Handler({ pdf });

module.exports = { handler: handler.main.bind(handler) };
