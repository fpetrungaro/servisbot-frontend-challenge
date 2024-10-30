import fs from 'fs/promises';
import path from "path";

export const readData = async (pathToData: string) => {
  const filePath = path.join(process.cwd(), 'data', pathToData);
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data);
};
