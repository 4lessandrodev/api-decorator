interface IExternalApi {
	get: <T>(url: string) => Promise<T>;
	post: <T, D>(url: string, body: D) => Promise<T>;
	put: <T, D>(url: string, body: D) => Promise<T>;
}

/** Implementation AXIOS*/
class ExternalApi implements IExternalApi {
	
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

const clientCode = async () => {
	const axios = new ExternalApi();
	const productApi = new ProductApi(axios);

	const result = await productApi.get<string>('product xyz');

	console.log(result);
}
