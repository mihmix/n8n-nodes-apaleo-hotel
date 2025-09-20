import { INodeProperties } from 'n8n-workflow';

export const reservationProperties: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['reservation'],
			},
		},
		options: [
			{
				name: 'GET reservations',
				value: 'GET reservations',
				description: 'Endpoint: /booking/v1/reservations Returns a list of all reservations',
				action: 'GET reservations',
			},
			{
				name: 'GET reservation by ID',
				value: 'GET reservation by ID',
				description: 'Endpoint: /booking/v1/reservations/{id} Return a specific reservation',
				action: 'GET reservation by ID',
			},
			{
				name: 'PATCH reservation by ID',
				value: 'PATCH reservation by ID',
				description:
					'Endpoint: /booking/v1/reservation/{id} Allow to modify certain reservation properties',
				action: 'PATCH reservation by ID',
			},
			{
				name: 'GET reservation count',
				value: 'GET reservation count',
				description: 'Endpoint: /booking/v1/reservations/$count Returns the count of reservations',
				action: 'GET reservation count',
			},
			{
				name: 'GET reservation offers',
				value: 'GET reservation offers',
				description:
					'Endpoint: /booking/v1/reservations/{id}/offers Returns offers for a reservation',
				action: 'GET reservation offers',
			},
			{
				name: 'GET reservation service offers',
				value: 'GET reservation service offers',
				description:
					'Endpoint: /booking/v1/reservations/{id}/service-offers Returns service offers for a reservation',
				action: 'GET reservation service offers',
			},
			{
				name: 'GET reservation services',
				value: 'GET reservation services',
				description:
					'Endpoint: /booking/v1/reservations/{id}/services Returns services for a reservation',
				action: 'GET reservation services',
			},
			{
				name: 'DELETE reservation service',
				value: 'DELETE reservation service',
				description:
					'Endpoint: /booking/v1/reservations/{id}/services Removes a service from a reservation',
				action: 'DELETE reservation service',
			},
		],
		default: 'GET reservations',
		noDataExpression: true,
		required: true,
	},
	{
		displayName: 'Reservation ID',
		name: 'reservationId',
		type: 'string',
		default: '',
		required: true,
		description: 'The ID of the reservation',
		displayOptions: {
			show: {
				resource: ['reservation'],
				operation: [
					'GET reservation by ID',
					'PATCH reservation by ID',
					'GET reservation offers',
					'GET reservation service offers',
					'GET reservation services',
					'DELETE reservation service',
				],
			},
		},
	},
	{
		displayName: 'Service ID',
		name: 'serviceId',
		type: 'string',
		default: '',
		required: true,
		description: 'The ID of the service to delete',
		displayOptions: {
			show: {
				resource: ['reservation'],
				operation: ['DELETE reservation service'],
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
				resource: ['reservation'],
				operation: ['GET reservations', 'GET reservation count'],
			},
		},
		options: [
			{
				displayName: 'Channel Code',
				name: 'channelCode',
				type: 'string',
				default: '',
				description: 'Filter reservations by channel code',
			},
			{
				displayName: 'Created From',
				name: 'createdFrom',
				type: 'string',
				default: '',
				description: 'Filter reservations by creation date and time from',
			},
			{
				displayName: 'Created To',
				name: 'createdTo',
				type: 'string',
				default: '',
				description: 'Filter reservations by creation date and time to',
			},
			{
				displayName: 'From',
				name: 'from',
				type: 'string',
				default: '',
				description: 'Filter reservations by arrival date from',
			},
			{
				displayName: 'Group ID',
				name: 'groupId',
				type: 'string',
				default: '',
				description: 'Filter reservations by group ID',
			},
			{
				displayName: 'Modified From',
				name: 'modifiedFrom',
				type: 'string',
				default: '',
				description: 'Filter reservations by modification date and time from',
			},
			{
				displayName: 'Modified To',
				name: 'modifiedTo',
				type: 'string',
				default: '',
				description: 'Filter reservations by modification date and time to',
			},
			{
				displayName: 'Property IDs',
				name: 'propertyIds',
				type: 'string',
				default: '',
				description: 'Filter reservations by property IDs',
			},
			{
				displayName: 'Service IDs',
				name: 'serviceIds',
				type: 'string',
				default: '',
				description: 'Filter reservations by service IDs',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				options: [
					{
						name: 'Confirmed',
						value: 'Confirmed',
					},
					{
						name: 'Canceled',
						value: 'Canceled',
					},
					{
						name: 'CheckedIn',
						value: 'CheckedIn',
					},
					{
						name: 'CheckedOut',
						value: 'CheckedOut',
					},
					{
						name: 'NoShow',
						value: 'NoShow',
					},
				],
				default: 'Confirmed',
				description: 'Filter reservations by status',
			},
			{
				displayName: 'Date Filter',
				name: 'dateFilter',
				type: 'options',
				options: [
					{
						name: 'Arrival',
						value: 'Arrival',
					},
					{
						name: 'Departure',
						value: 'Departure',
					},
					{
						name: 'Stay',
						value: 'Stay',
					},
				],
				default: 'Stay',
				description: 'Date filter to use for from/to date filtering',
			},
			{
				displayName: 'To',
				name: 'to',
				type: 'string',
				default: '',
				description: 'Filter reservations by departure date to',
			},
			{
				displayName: 'Unit IDs',
				name: 'unitIds',
				type: 'string',
				default: '',
				description: 'Filter reservations by assigned units',
			},
			{
				displayName: 'Unit Group IDs',
				name: 'unitGroupIds',
				type: 'string',
				default: '',
				description: 'Filter reservations by requested unit groups',
			},
			{
				displayName: 'Unit Group Types',
				name: 'unitGroupTypes',
				type: 'multiOptions',
				options: [
					{
						name: 'BedRoom',
						value: 'BedRoom',
					},
					{
						name: 'MeetingRoom',
						value: 'MeetingRoom',
					},
					{
						name: 'EventSpace',
						value: 'EventSpace',
					},
					{
						name: 'ParkingLot',
						value: 'ParkingLot',
					},
					{
						name: 'Other',
						value: 'Other',
					},
				],
				default: [],
				description: 'Filter reservations by unit group types',
			},
			{
				displayName: 'Block IDs',
				name: 'blockIds',
				type: 'string',
				default: '',
				description: 'Filter reservations by requested blocks',
			},
			{
				displayName: 'Market Segment IDs',
				name: 'marketSegmentIds',
				type: 'string',
				default: '',
				description: 'Filter reservations by market segments',
			},
			{
				displayName: 'External Code',
				name: 'externalCode',
				type: 'string',
				default: '',
				description: 'Filter reservations by external code',
			},
			{
				displayName: 'Text Search',
				name: 'textSearch',
				type: 'string',
				default: '',
				description: 'Search text in reservations',
			},
			{
				displayName: 'Page Number',
				name: 'pageNumber',
				type: 'number',
				default: 1,
				description: 'Page number for results',
			},
			{
				displayName: 'Page Size',
				name: 'pageSize',
				type: 'number',
				default: 100,
				description: 'Number of items per page',
			},
			{
				displayName: 'Expand',
				name: 'expand',
				type: 'multiOptions',
				options: [
					{
						name: 'Property',
						value: 'property',
					},
					{
						name: 'Unit Group',
						value: 'unitGroup',
					},
					{
						name: 'Rate Plan',
						value: 'ratePlan',
					},
					{
						name: 'Services',
						value: 'services',
					},
					{
						name: 'Company',
						value: 'company',
					},
					{
						name: 'Block',
						value: 'block',
					},
				],
				default: [],
				description: 'Expand additional information',
			},
		],
	},
	{
		displayName: 'Patch Operations reservation',
		name: 'patchOperationsReservation',
		type: 'string',
		default: `[
			{
				"op": "replace",
				"path": "/path/to/field",
				"value": "new value"
			}
		]`,
		description: 'PATCH operations in JSON format',
		displayOptions: {
			show: {
				resource: ['reservation'],
				operation: ['PATCH reservation by ID'],
			},
		},
	},
];
