import { ApiDecorator } from "./api-decorator";
import { IExternalApi } from "./api-interface";

/** Concrete implementation to client */
export class UserApi extends ApiDecorator {

	constructor(service: IExternalApi){
		super(service);
		/** authenticate and set base url on instantiate */
		this.service.auth('user');
		this.service.setBaseURL('https://my-api.com/user');
	}

	/** you can implement the method and change behavior */
	get<T>(url: string): Promise<T> {
		/** change behavior */
		return this.service.get(`user behavior: ${url}`);
	}
}
