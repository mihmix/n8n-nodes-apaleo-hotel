import { IExecuteFunctions, INodeExecutionData, IHttpRequestMethods } from 'n8n-workflow';
import { apiRequest } from '../../transport';

export async function paymentAccountActionOperations(
	this: IExecuteFunctions,
	index: number,
	operation: string,
	accessToken: string,
	returnData: INodeExecutionData[],
) {
	const paymentAccountId = this.getNodeParameter('paymentAccountId', index) as string;
	let endpoint = '';
	let method: IHttpRequestMethods = 'PUT';
	let responseData;

	switch (operation) {
		case 'PUT cancel payment account':
			endpoint = `/booking/v1/payment-account-actions/${paymentAccountId}/cancel`;
			break;

		case 'PUT expire payment link':
			endpoint = `/booking/v1/payment-account-actions/${paymentAccountId}/expire-payment-link`;
			break;

		default:
			throw new Error(`Operation "${operation}" is not supported in paymentAccountActionOperations.`);
	}

	responseData = await apiRequest.call(this, method, endpoint);

	if (responseData !== undefined) {
		returnData.push({ json: responseData });
	} else {
		returnData.push({ json: {} });
	}

	return responseData;
}
