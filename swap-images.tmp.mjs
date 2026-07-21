import sharp from 'sharp';

const jobs = [
  // IMG_5130: glas med tavlehonning i lyst køkken → Mange slags honning
  sharp('_raw/galleri/IMG_5130.jpg')
    .rotate()
    .resize({ width: 1600, height: 1600, fit: 'inside' })
    .jpeg({ quality: 80 })
    .toFile('assets/img/mange-slags-honning.jpg'),

  // IMG_5138: tavlehonning skæres i blokke → Fra blomst til glas
  sharp('_raw/galleri/IMG_5138.jpg')
    .rotate()
    .resize({ width: 1600, height: 1600, fit: 'inside' })
    .jpeg({ quality: 80 })
    .toFile('assets/img/fra-blomst-til-glas.jpg'),
];

// baeredygtig.jpg: beskær den mørke, uskarpe plamage i toppen væk (øverste 15 %)
const b = await sharp('assets/img/baeredygtig.jpg')
  .extract({ left: 0, top: 180, width: 1600, height: 1020 })
  .jpeg({ quality: 85 })
  .toBuffer();
const bJob = sharp(b).toFile('assets/img/baeredygtig.jpg');

await Promise.all([...jobs, bJob]);
console.log('done');
