import { AxiosInstance, HttpStatusCode } from "axios";
import { ParserOptions, parseStringPromise } from "xml2js";
import { ZodError, ZodType } from "zod";

export class RequestExecutor {
    private readonly client: AxiosInstance;
    private readonly parserOptions: ParserOptions;

    constructor(client: AxiosInstance) {
        this.client = client;
        this.parserOptions = {
            explicitArray: false,
            mergeAttrs: true
        }
    }

    async makeGetRequest<T>(path: string, schema: ZodType): Promise<T> {
        try {
            const response = await this.client.get(path);
            if (response.status != HttpStatusCode.Ok.valueOf()) {
                // TODO: api errors
            }
            const responseXml = response.data as string;
            const parsedJson = await parseStringPromise(responseXml, this.parserOptions) as string;

            const data = parsedJson.fantasy_content;
            return schema.parse(data) as T;
        } catch (error: any) {
            console.error(`Error making GET to endpoint: ${path}`);
            if (error instanceof ZodError) {
                throw new Error("ZodError occurred");
            }
            
            throw error;
        }
    }
}