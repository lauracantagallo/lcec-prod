import sharp from "sharp";
import { readdirSync, mkdirSync, existsSync } from "fs";
import { join, basename, extname } from "path";

const inputDir = "src/img";
const outputDir = "dist/img";

if (!existsSync(outputDir)) mkdirSync(outputDir, { recursive: true });

const files = readdirSync(inputDir).filter(f => /\.(jpg|jpeg|png)$/i.test(f) && !f.startsWith("og-image") && !f.startsWith("icon"));

await Promise.all(files.map(async file => {
  const name = basename(file, extname(file));
  const input = join(inputDir, file);
  const output = join(outputDir, `${name}.webp`);
  try {
    await sharp(input).webp({ quality: 82 }).toFile(output);
    console.log(`[images] ${file} → ${name}.webp`);
  } catch (err) {
    console.error(`[images] failed: ${file}`, err.message);
  }
}));
