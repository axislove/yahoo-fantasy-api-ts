import fs from 'node:fs/promises';
import path from 'node:path';

export async function getMockResponse(fileName: string): Promise<string> {
    const filePath: string = path.join(__dirname, 'mock', 'responses', fileName);
    console.log(filePath);
    return await fs.readFile(filePath, { encoding: 'utf-8' });
}