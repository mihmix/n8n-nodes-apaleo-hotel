import { IExecuteFunctions, IHttpRequestMethods } from 'n8n-workflow';
import { getAccessToken } from './auth/getAccessToken';

function formatApaleoQueryParams(qs: Record<string, any>): Record<string, any> {
	const formatted: Record<string, any> = {};

	for (const [key, value] of Object.entries(qs)) {
		if (value === undefined || value === null) {
			continue;
		}

		if (Array.isArray(value)) {
			if (!value.length) {
				continue;
			}

			formatted[key] = value.join(',');
		} else {
			formatted[key] = value;
		}
	}

	return formatted;
}

export async function apiRequest(
	this: IExecuteFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body?: any,
	qs?: Record<string, any>,
	idempotencyKey?: string,
) {
	const accessToken = await getAccessToken(this);

	const options: Record<string, any> = {
		method,
		url: 'https://api.apaleo.com' + endpoint,
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${accessToken}`,
		},
		json: true,
	};

	if (body !== undefined) {
		options.body = body;
	}

	if (qs !== undefined) {
		options.qs = formatApaleoQueryParams(qs);
	}

	// Add idempotency key for POST requests
	if (method === 'POST') {
		if (idempotencyKey) {
			options.headers['Idempotency-Key'] = idempotencyKey;
		} else {
			options.headers['Idempotency-Key'] = `${Date.now()}-${Math.random()
				.toString(36)
				.substring(7)}`;
		}
	}

	try {
		const response = await this.helpers.request(options);
		return response;
	} catch (error) {
		if (error.statusCode === 404) {
			return undefined;
		}
		throw error;
	}
}
