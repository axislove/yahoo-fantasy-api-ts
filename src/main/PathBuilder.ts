export class PathBuilder {
    private path: string;

    constructor(path: string) {
        this.path = path;
    }

    // append / and provided resource
    withResource(r: string): void {
        this.path += `/${r}`;
    }

    withParam(key: string, value: string): void {
        this.path += `;${key}=${value}`;
    }

    withParams(params: Map<string, string[]>): void {
        for (const [key, values] of params) {
            this.path += `;${key}=${values.join(',')}`;
        }
    }

    buildPath(): string {
        return this.path;
    }
}