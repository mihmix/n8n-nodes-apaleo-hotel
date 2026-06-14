import { INodeProperties } from 'n8n-workflow';

export const paymentAccountProperties: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['paymentAccount'],
			},
		},
		options: [
			{
				name: 'POST payment account by terminal',
				value: 'POST payment account by terminal',
				description:
					'Endpoint: /booking/v1/payment-accounts/by-terminal Creates payment account by using the terminal',
				action: 'POST payment account by terminal',
			},
			{
				name: 'POST payment account by link',
				value: 'POST payment account by link',
				description:
					'Endpoint: /booking/v1/payment-accounts/by-link Creates a link to a payment form that allows guests to complete the payment account',
				action: 'POST payment account by link',
			},
			{
				name: 'POST payment account by authorization',
				value: 'POST payment account by authorization',
				description:
					'Endpoint: /booking/v1/payment-accounts/by-authorization Creates payment account based on an existing authorization',
				action: 'POST payment account by authorization',
			},
			{
				name: 'POST payment account by stored payment method',
				value: 'POST payment account by stored payment method',
				description:
					'Endpoint: /booking/v1/payment-accounts/by-stored-payment-method Creates payment account based on a stored payment method',
				action: 'POST payment account by stored payment method',
			},
			{
				name: 'GET payment account',
				value: 'GET payment account',
				description:
					'Endpoint: /booking/v1/payment-accounts/{id} Returns a single payment account by ID',
				action: 'GET payment account',
			},
			{
				name: 'GET payment accounts',
				value: 'GET payment accounts',
				description:
					'Endpoint: /booking/v1/payment-accounts Returns a list of payment accounts based on the query parameters',
				action: 'GET payment accounts',
			},
		],
		default: 'GET payment accounts',
		required: true,
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
				resource: ['paymentAccount'],
				operation: ['GET payment account'],
			},
		},
	},
	{
		displayName: 'Expand',
		name: 'expand',
		type: 'multiOptions',
		options: [
			{
				name: 'Actions',
				value: 'actions',
			},
		],
		default: [],
		description: 'List of embedded resources that should be expanded in the response',
		displayOptions: {
			show: {
				resource: ['paymentAccount'],
				operation: ['GET payment account', 'GET payment accounts'],
			},
		},
	},
	{
		displayName: 'Payment Account Data',
		name: 'paymentAccountData',
		type: 'json',
		required: true,
		default: '{}',
		description: 'The definition of the payment account to be created',
		displayOptions: {
			show: {
				resource: ['paymentAccount'],
				operation: [
					'POST payment account by terminal',
					'POST payment account by link',
					'POST payment account by authorization',
					'POST payment account by stored payment method',
				],
			},
		},
	},
	{
		displayName: 'Idempotency Key',
		name: 'idempotencyKey',
		type: 'string',
		default: '',
		description:
			'Unique key for safely retrying requests without accidentally performing the same operation twice',
		displayOptions: {
			show: {
				resource: ['paymentAccount'],
				operation: [
					'POST payment account by terminal',
					'POST payment account by link',
					'POST payment account by authorization',
					'POST payment account by stored payment method',
				],
			},
		},
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['paymentAccount'],
				operation: ['GET payment accounts'],
			},
		},
		options: [
			{
				displayName: 'Payment Account IDs',
				name: 'paymentAccountIds',
				type: 'string',
				typeOptions: {
					multipleValues: true,
				},
				default: [],
				description: 'Filter result by requested payment account IDs',
			},
			{
				displayName: 'Property IDs',
				name: 'propertyIds',
				type: 'string',
				typeOptions: {
					multipleValues: true,
				},
				default: [],
				description: 'Filter result by requested properties',
			},
			{
				displayName: 'Booking IDs',
				name: 'bookingIds',
				type: 'string',
				typeOptions: {
					multipleValues: true,
				},
				default: [],
				description: 'Filter result by requested booking IDs',
			},
			{
				displayName: 'Reservation IDs',
				name: 'reservationIds',
				type: 'string',
				typeOptions: {
					multipleValues: true,
				},
				default: [],
				description: 'Filter result by requested reservation IDs',
			},
			{
				displayName: 'Payer Interactions',
				name: 'payerInteractions',
				type: 'multiOptions',
				options: [
					{ name: 'PCI Token', value: 'PciToken' },
					{ name: 'Terminal', value: 'Terminal' },
					{ name: 'Authorization', value: 'Authorization' },
					{ name: 'Payment Link', value: 'PaymentLink' },
				],
				default: [],
				description: 'Filter result by payment account payer interactions',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'multiOptions',
				options: [
					{ name: 'Pending', value: 'Pending' },
					{ name: 'Success', value: 'Success' },
					{ name: 'Failure', value: 'Failure' },
					{ name: 'Canceled', value: 'Canceled' },
					{ name: 'Expired', value: 'Expired' },
				],
				default: [],
				description: 'Filter result by payment account status',
			},
			{
				displayName: 'Target Types',
				name: 'targetTypes',
				type: 'multiOptions',
				options: [
					{ name: 'Booking', value: 'Booking' },
					{ name: 'Reservation', value: 'Reservation' },
				],
				default: [],
				description: 'Filter by target types',
			},
			{
				displayName: 'Date Field',
				name: 'dateField',
				type: 'options',
				options: [
					{ name: 'Creation', value: 'Creation' },
					{ name: 'Modification', value: 'Modification' },
				],
				default: '',
				description: 'Filter result by date and time attributes of payment account',
			},
			{
				displayName: 'From',
				name: 'from',
				type: 'dateTime',
				default: '',
				description: 'The start of the time interval',
			},
			{
				displayName: 'To',
				name: 'to',
				type: 'dateTime',
				default: '',
				description: 'The end of the time interval',
			},
			{
				displayName: 'Payment Link URLs',
				name: 'paymentLinkUrls',
				type: 'string',
				typeOptions: {
					multipleValues: true,
				},
				default: [],
				description: 'Filter by payment link URLs',
			},
			{
				displayName: 'Page Number',
				name: 'pageNumber',
				type: 'number',
				typeOptions: {
					minValue: 1,
				},
				default: 1,
				description: 'Page number to retrieve',
			},
			{
				displayName: 'Page Size',
				name: 'pageSize',
				type: 'number',
				typeOptions: {
					minValue: 1,
					maxValue: 500,
				},
				default: 500,
				description: 'Items per page (maximum 500)',
			},
			{
				displayName: 'Sort',
				name: 'sort',
				type: 'multiOptions',
				options: [
					{ name: 'Created Ascending', value: 'created:asc' },
					{ name: 'Created Descending', value: 'created:desc' },
					{ name: 'Updated Ascending', value: 'updated:asc' },
					{ name: 'Updated Descending', value: 'updated:desc' },
					{ name: 'Expires At Ascending', value: 'expiresat:asc' },
					{ name: 'Expires At Descending', value: 'expiresat:desc' },
				],
				default: [],
				description: 'List of fields that can be used to sort the results',
			},
		],
	},
];
