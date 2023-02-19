import { interfaces } from "inversify";
import ApiResponse from "../../pages/planimeter/requests/response.interface";

export default interface HttpService{
    post<T>(endpoint: string, data: any): Promise<ApiResponse<T> | undefined>;
}
export namespace HttpService {
    export const $: interfaces.ServiceIdentifier<HttpService> = Symbol('HttpService');
}