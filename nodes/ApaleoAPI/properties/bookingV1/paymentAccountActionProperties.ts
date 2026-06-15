import { INodeProperties } from 'n8n-workflow';

export const paymentAccountActionProperties: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['paymentAccountAction'],
			},
		},
		options: [
			{
				name: 'PUT cancel payment account',
				value: 'PUT cancel payment account',
				description:
					'Endpoint: /booking/v1/payment-account-actions/{paymentAccountId}/cancel Sets payment account status to Canceled',
				action: 'PUT cancel payment account',
			},
			{
				name: 'PUT expire payment link',
				value: 'PUT expire payment link',
				description:
					'Endpoint: /booking/v1/payment-account-actions/{paymentAccountId}/expire-payment-link Expires the pending payment link and updates the status to Expired',
				action: 'PUT expire payment link',
			},
		],
		default: 'PUT cancel payment account',
	},
	{
		displayName: 'Payment Account ID',
		name: 'paymentAccountId',
		type: 'string',
		required: true,
		default: '',
		description: 'The identifier of the payment account',
		displayOptions: {
			show: {
				resource: ['paymentAccountAction'],
				operation: ['PUT cancel payment account', 'PUT expire payment link'],
			},
		},
	},
];
