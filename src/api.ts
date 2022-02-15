import { IExternalApi } from "./api-interface";

/** AXIOS abstraction Implementation. you may inject axios or any lib here */
export class ExternalApi implements IExternalApi {
	
	/** you may control api state */
	protected headers: any = { Authorization: '' };
	protected baseURL: string = '';
	protected params: string = '';
	protected body: any = {};
	
	/** here you authenticate on api if it is required */
	auth<T>(props: T){
		// auth with props on service and get Authorization
		this.params = String(props);
		this.headers.Authorization = `Bearer initial Authorization...`;
	}

	/** you may set base url to your service */
	setBaseURL(url: string): void {
		this.baseURL = url;
	};

	/** you may change the api headers */
	setHeaders<T>(headers: T): void{
		this.headers = Object.assign({}, { ...this.headers }, { ...headers });
	};

	/** you may change the api body */
	setBody<T>(body: T): void{
		this.body = Object.assign({}, { ...this.body }, { ...body });
	};
	
	/** you may update authentication if Authorization is expired */
	refreshToken(): void {
		/** verify if token is expired and refresh. you must provide jwt by param */
		// get Authorization again and set on headers
		this.headers = Object.assign({}, { ...this.headers }, { Authorization: 'Bearer updated Authorization...' });
	};

	/** rest api methods GET, POST, PUT, DELETE ... */
	get<T>(url: string): Promise<T> {
		return new Promise((resolve) => resolve(url as unknown as T));
	};
	
	post<T, D>(url: string, body: D): Promise<T> {
		return new Promise((resolve) => resolve({ url, body } as unknown as T));
	};

	put<T, D>(url: string, body: D): Promise<T> {
		return new Promise((resolve) => resolve({ url, body } as unknown as T));
	};

	delete<T, D>(url: string, body: D): Promise<T> {
		return new Promise((resolve) => resolve({ url, body } as unknown as T));
	};
}
