import fs from 'node:fs/promises';
import path from 'node:path';

export class UnitTestUtil {

    static async getMockResponse(fileName: string): Promise<string> {
        const filePath: string = path.join(__dirname, 'mock', 'responses', fileName);
        return await fs.readFile(filePath, { encoding: 'utf-8' });
    }
}