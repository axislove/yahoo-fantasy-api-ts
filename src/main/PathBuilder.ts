export class PathBuilder {
    private path: string;

    constructor(path: string) {
        this.path = path;
    }

    // append '/' and provided resource
    withResource(r: string): this {
        this.path += `/${r}`;
        return this;
    }

    withParam(key: string, value: string): this {
        this.path += `;${key}=${value}`;
        return this;
    }

    withParams(params: Map<string, string[]>): this {
        for (const [key, values] of params) {
            this.path += `;${key}=${values.join(',')}`;
        }
        return this;
    }

    buildPath(): string {
        return this.path;
    }
}