import { IExternalApi } from "./api-interface";

/** Client code */
export const clientCode = async (api: IExternalApi, urlParam: string): Promise<number> => {

	const result = await api.get<string>(urlParam);

	console.log(result);
	console.log(api);

	return (0);

}
