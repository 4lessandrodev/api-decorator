import { IExternalApi } from "./api-interface";

/** Decorator to be injected on concrete */
export class ApiDecorator implements IExternalApi {

	constructor(protected readonly service: IExternalApi){}

	setBaseURL(url: string): void {
		this.service.setBaseURL(url);
	};

	setHeaders<T>(headers: T): void{
		this.service.setHeaders(headers);
	};

	setBody<T>(body: T): void{
		this.service.setBody(body);
	};

	refreshToken(): void {
		this.service.refreshToken();
	};

	auth<T>(props: T){
		this.service.auth(props);
	}

	get<T>(url: string): Promise<T> {
		return this.service.get(url);
	};
	
	post<T, D>(url: string, body: D): Promise<T> {
		return this.service.post(url, body);
	};

	put<T, D>(url: string, body: D): Promise<T> {
		return this.service.put(url, body);
	};

	delete<T, D>(url: string, body: D): Promise<T> {
		return this.service.put(url, body);
	};
}
