export interface PermitGet<T> {
    get(): Promise<T>;
}