import { ExternalApi } from "../api";
import { clientCode } from "../main";
import { ProductApi } from "../product-api";
import { UserApi } from "../user-api";


describe('api-decorator-example', () => {
	it('should get product', async () => {

		const productApi = new ProductApi(new ExternalApi());

		const result = await clientCode(productApi, 'smartphone');

		expect(result).toBe(0);

	});

	it('should get user', async () => {

		const userAPi = new UserApi(new ExternalApi());

		const result = await clientCode(userAPi, 'john stuart');

		expect(result).toBe(0);

	});
});
