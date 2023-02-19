import { injectable } from "inversify";
import HttpService from "../../../ioc/interfaces/http.interface";
import ApiResponse from "./response.interface";

@injectable()
export class PlanimeterRequestService implements HttpService{
    public async post<T>(endpoint: string, data: any): Promise<ApiResponse<T> | undefined>{
        const url = `${process.env.REACT_APP_API_URL}/${endpoint}`;
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Access-Control-Allow-Origin', process.env.REACT_APP_API_URL!)
        headers.append('secret', process.env.REACT_APP_API_SECRET_KEY!);
        const response = await fetch(url, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(data)
        });
      
        if (!response.ok) {
            console.log(response);
            return;
        }
      
        const responseBody:Promise<ApiResponse<T>> = await response.json();
        return responseBody;
    }
}
