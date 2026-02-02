export class PathBuilder {
    private path: string;

    constructor(path: string) {
        this.path = path;
    }

    withParam(s: string): void {
        this.path += s;
    }

    // append / and provided resource
    withResource(r: string): void {
        this.path += `/${r}`;
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