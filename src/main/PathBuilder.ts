export class PathBuilder {
    private path: string;

    constructor(path: string) {
        this.path = path;
    }

    // append '/' and provided resource
    withResource(r: string): PathBuilder {
        const newBuilder = new PathBuilder(this.path);
        newBuilder.path += `/${r}`;

        return newBuilder;
    }

    withParam(key: string, value: string): PathBuilder {
        const newBuilder = new PathBuilder(this.path);
        newBuilder.path += `;${key}=${value}`;

        return newBuilder
    }

    withParams(params: Map<string, string[]>): PathBuilder {
        const newBuilder = new PathBuilder(this.path);
        for (const [key, values] of params) {
            newBuilder.path += `;${key}=${values.join(',')}`;
        }

        return newBuilder;
    }

    buildPath(): string {
        return this.path;
    }
}