/** common interface to services */
export interface IExternalApi {
	get: <T>(url: string) => Promise<T>;
	post: <T, D>(url: string, body: D) => Promise<T>;
	put: <T, D>(url: string, body: D) => Promise<T>;
	delete: <T, D>(url: string, body: D) => Promise<T>;
	auth<T>(props: T): void;
	setBaseURL(url: string): void;
	setHeaders<T>(headers: T): void;
	setBody<T>(body: T): void;
	refreshToken(): void;
}
