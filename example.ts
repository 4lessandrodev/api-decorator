interface IExternalApi {
	get: <T>(url: string) => Promise<T>;
	post: <T, D>(url: string, body: D) => Promise<T>;
	put: <T, D>(url: string, body: D) => Promise<T>;
	auth<T>(props: T): void;
	setBaseURL(url: string): void;
	setHeaders<T>(headers: T): void;
	refreshToken(): void;
}

/** Implementation AXIOS*/
export class ExternalApi implements IExternalApi {
	protected headers: any;
	protected baseURL: string = '';
	protected serviceName: string = '';
	
	auth<T>(props: T){
		// auth with props on service and get token
		this.serviceName = String(props);
		this.headers.token = `Bearer initial token...`;
	}

	setBaseURL(url: string): void {
		this.baseURL = url;
	};

	setHeaders<T>(headers: T): void{
		this.headers = Object.assign({}, { ...this.headers }, { ...headers });
	};

	refreshToken(): void {
		this.headers = Object.assign({}, { ...this.headers }, { token: 'Bearer updated token...' });
	};

	get<T>(url: string): Promise<T> {
		return new Promise((resolve) => resolve(url as unknown as T));
	};
	
	post<T, D>(url: string, body: D): Promise<T> {
		return new Promise((resolve) => resolve({ url, body } as unknown as T));
	};

	put<T, D>(url: string, body: D): Promise<T> {
		return new Promise((resolve) => resolve({ url, body } as unknown as T));
	};
}

/** Decorator to be injected on concrete */
class ApiDecorator implements IExternalApi {

	constructor(protected readonly service: IExternalApi){}

	setBaseURL(url: string): void {
		this.service.setBaseURL(url);
	};

	setHeaders<T>(headers: T): void{
		this.service.setHeaders(headers);
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
}


/** Concrete implementation to client */
class ProductApi extends ApiDecorator {

	constructor(service: IExternalApi){
		super(service);
		this.service.auth('product');
		this.service.setBaseURL('https://myapi.com/products');
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
}

/** Concrete implementation to client */
class PortalApi extends ApiDecorator {

	constructor(service: IExternalApi){
		super(service);
		this.service.auth('portal');
		this.service.setBaseURL('https://myapi.com/products');
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
}

export const clientCode = async () => {
	const axios = new ExternalApi();
	const productApi = new ProductApi(axios);
	const portalAPi = new PortalApi(axios);

	const productResult = await productApi.get<string>('product xyz');
	const portalResult = await portalAPi.get<string>('portal xyz');

	console.log(productResult);
	console.log(portalResult);
}
