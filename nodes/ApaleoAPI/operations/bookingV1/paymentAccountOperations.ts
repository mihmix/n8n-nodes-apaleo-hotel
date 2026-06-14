import { IExecuteFunctions, INodeExecutionData, IHttpRequestMethods } from 'n8n-workflow';
import { apiRequest } from '../../transport';

export async function paymentAccountOperations(
	this: IExecuteFunctions,
	index: number,
	operation: string,
	accessToken: string,
	returnData: INodeExecutionData[],
) {
	let endpoint = '';
	let method: IHttpRequestMethods = 'GET';
	let body = undefined;
	let qs: Record<string, any> = {};
	let idempotencyKey: string | undefined;
	let responseData;

	switch (operation) {
		case 'POST payment account by terminal':
			method = 'POST';
			endpoint = '/booking/v1/payment-accounts/by-terminal';
			body = this.getNodeParameter('paymentAccountData', index);
			if (typeof body === 'string') {
				body = JSON.parse(body);
			}
			idempotencyKey = this.getNodeParameter('idempotencyKey', index, '') as string;
			break;

		case 'POST payment account by link':
			method = 'POST';
			endpoint = '/booking/v1/payment-accounts/by-link';
			body = this.getNodeParameter('paymentAccountData', index);
			if (typeof body === 'string') {
				body = JSON.parse(body);
			}
			idempotencyKey = this.getNodeParameter('idempotencyKey', index, '') as string;
			break;

		case 'POST payment account by authorization':
			method = 'POST';
			endpoint = '/booking/v1/payment-accounts/by-authorization';
			body = this.getNodeParameter('paymentAccountData', index);
			if (typeof body === 'string') {
				body = JSON.parse(body);
			}
			idempotencyKey = this.getNodeParameter('idempotencyKey', index, '') as string;
			break;

		case 'POST payment account by stored payment method':
			method = 'POST';
			endpoint = '/booking/v1/payment-accounts/by-stored-payment-method';
			body = this.getNodeParameter('paymentAccountData', index);
			if (typeof body === 'string') {
				body = JSON.parse(body);
			}
			idempotencyKey = this.getNodeParameter('idempotencyKey', index, '') as string;
			break;

		case 'GET payment account': {
			const paymentAccountId = this.getNodeParameter('paymentAccountId', index) as string;
			endpoint = `/booking/v1/payment-accounts/${paymentAccountId}`;
			const expand = this.getNodeParameter('expand', index, []) as string[];
			if (expand.length) {
				qs.expand = expand;
			}
			break;
		}

		case 'GET payment accounts':
			endpoint = '/booking/v1/payment-accounts';
			{
				const additionalFields = this.getNodeParameter('additionalFields', index) as {
					paymentAccountIds?: string[];
					propertyIds?: string[];
					bookingIds?: string[];
					reservationIds?: string[];
					payerInteractions?: string[];
					status?: string[];
					targetTypes?: string[];
					dateField?: string;
					from?: string;
					to?: string;
					paymentLinkUrls?: string[];
					pageNumber?: number;
					pageSize?: number;
					sort?: string[];
				};

				if (additionalFields.paymentAccountIds?.length) {
					qs.paymentAccountIds = additionalFields.paymentAccountIds;
				}
				if (additionalFields.propertyIds?.length) {
					qs.propertyIds = additionalFields.propertyIds;
				}
				if (additionalFields.bookingIds?.length) {
					qs.bookingIds = additionalFields.bookingIds;
				}
				if (additionalFields.reservationIds?.length) {
					qs.reservationIds = additionalFields.reservationIds;
				}
				if (additionalFields.payerInteractions?.length) {
					qs.payerInteractions = additionalFields.payerInteractions;
				}
				if (additionalFields.status?.length) {
					qs.status = additionalFields.status;
				}
				if (additionalFields.targetTypes?.length) {
					qs.targetTypes = additionalFields.targetTypes;
				}
				if (additionalFields.dateField) {
					qs.dateField = additionalFields.dateField;
				}
				if (additionalFields.from) {
					qs.from = additionalFields.from;
				}
				if (additionalFields.to) {
					qs.to = additionalFields.to;
				}
				if (additionalFields.paymentLinkUrls?.length) {
					qs.paymentLinkUrls = additionalFields.paymentLinkUrls;
				}
				if (additionalFields.pageNumber) {
					qs.pageNumber = additionalFields.pageNumber;
				}
				if (additionalFields.pageSize) {
					qs.pageSize = additionalFields.pageSize;
				}
				if (additionalFields.sort?.length) {
					qs.sort = additionalFields.sort;
				}
			}
			{
				const expand = this.getNodeParameter('expand', index, []) as string[];
				if (expand.length) {
					qs.expand = expand;
				}
			}
			break;

		default:
			throw new Error(`Operation "${operation}" is not supported in paymentAccountOperations.`);
	}

	responseData = await apiRequest.call(
		this,
		method,
		endpoint,
		body,
		qs,
		idempotencyKey || undefined,
	);

	if (responseData !== undefined) {
		returnData.push({ json: responseData });
	} else {
		returnData.push({ json: {} });
	}

	return responseData;
}
