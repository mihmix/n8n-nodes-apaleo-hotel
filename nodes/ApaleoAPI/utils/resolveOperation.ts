import { IDataObject } from 'n8n-workflow';

const RESOURCE_DEFAULT_OPERATIONS: Record<string, string> = {
	block: 'GET blocks',
	blockAction: 'PUT confirm Block',
	booking: 'GET bookings',
	group: 'GET groups',
	offer: 'GET offers',
	paymentAccount: 'GET payment accounts',
	paymentAccountAction: 'PUT cancel payment account',
	reservation: 'GET reservations',
	reservationAction: 'PUT assign unit to reservation',
	types: 'GET sources',
	folio: 'GET folios',
	folioAction: 'PUT move multiple charges',
};

function inferPaymentAccountOperation(parameters: IDataObject): string | undefined {
	if (parameters.paymentAccountData !== undefined) {
		return 'POST payment account by terminal';
	}

	if (parameters.additionalFields !== undefined) {
		return 'GET payment accounts';
	}

	if (parameters.paymentAccountId !== undefined) {
		return 'GET payment account';
	}

	return undefined;
}

export function resolveOperation(resource: string, parameters: IDataObject): string {
	const explicitOperation = parameters.operation;

	if (typeof explicitOperation === 'string' && explicitOperation.length > 0) {
		return explicitOperation;
	}

	if (resource === 'paymentAccount') {
		const inferredOperation = inferPaymentAccountOperation(parameters);
		if (inferredOperation) {
			return inferredOperation;
		}
	}

	const defaultOperation = RESOURCE_DEFAULT_OPERATIONS[resource];
	if (defaultOperation) {
		return defaultOperation;
	}

	throw new Error(`Could not determine operation for resource "${resource}".`);
}
