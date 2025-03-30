
const axios = require('axios');

class AsariCrm {
    constructor() {
        this.description = {
            displayName: 'ASARI CRM',
            name: 'asariCrm',
            group: ['transform'],
            version: 1,
            description: 'Integracja z ASARI CRM',
            defaults: { name: 'ASARI CRM' },
            inputs: ['main'],
            outputs: ['main'],
            credentials: [{ name: 'asariCrmApi', required: true }],
            properties: [
                {
                    displayName: 'Akcja',
                    name: 'action',
                    type: 'options',
                    options: [
                        { name: 'Pobierz klientów', value: 'getClients' },
                        { name: 'Dodaj klienta', value: 'createClient' },
                    ],
                    default: 'getClients',
                    description: 'Wybierz akcję do wykonania',
                },
                {
                    displayName: 'Dane klienta',
                    name: 'clientData',
                    type: 'collection',
                    displayOptions: {
                        show: { action: ['createClient'] },
                    },
                    placeholder: 'Dodaj pole',
                    default: {},
                    options: [
                        { displayName: 'Imię', name: 'firstName', type: 'string', default: '' },
                        { displayName: 'Nazwisko', name: 'lastName', type: 'string', default: '' },
                        { displayName: 'Email', name: 'email', type: 'string', default: '' },
                        { displayName: 'Telefon', name: 'phone', type: 'string', default: '' },
                    ],
                },
            ],
        };
    }

    async execute() {
        const items = this.getInputData();
        const returnData = [];
        const credentials = await this.getCredentials('asariCrmApi');
        const action = this.getNodeParameter('action', 0);
        const baseUrl = 'https://api.asari.pl/v2';

        if (action === 'getClients') {
            const response = await axios.get(`${baseUrl}/clients`, {
                headers: {
                    'Authorization': `Bearer ${credentials.apiKey}`,
                    'Content-Type': 'application/json',
                },
            });
            returnData.push({ json: response.data });
        }

        if (action === 'createClient') {
            const clientData = this.getNodeParameter('clientData', 0);
            const response = await axios.post(`${baseUrl}/clients`, clientData, {
                headers: {
                    'Authorization': `Bearer ${credentials.apiKey}`,
                    'Content-Type': 'application/json',
                },
            });
            returnData.push({ json: response.data });
        }

        return [returnData];
    }
}

module.exports = { AsariCrm };
