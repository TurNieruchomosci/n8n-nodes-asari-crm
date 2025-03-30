// /nodes/AsariCrm.node.ts
import {
    IExecuteFunctions,
} from 'n8n-workflow';

import {
    INodeExecutionData,
    INodeType,
    INodeTypeDescription,
} from 'n8n-workflow';

import axios from 'axios';

export class AsariCrm implements INodeType {
    description: INodeTypeDescription = {
        displayName: 'ASARI CRM',
        name: 'asariCrm',
        group: ['transform'],
        version: 1,
        description: 'Integracja z ASARI CRM',
        defaults: {
            name: 'ASARI CRM',
        },
        inputs: ['main'],
        outputs: ['main'],
        credentials: [
            {
                name: 'asariCrmApi',
                required: true,
            },
        ],
        properties: [
            {
                displayName: 'Akcja',
                name: 'action',
                type: 'options',
                options: [
                    {
                        name: 'Pobierz klientów',
                        value: 'getClients',
                    },
                    {
                        name: 'Dodaj klienta',
                        value: 'createClient',
                    },
                ],
                default: 'getClients',
                description: 'Wybierz akcję do wykonania',
            },
            {
                displayName: 'Dane klienta',
                name: 'clientData',
                type: 'collection',
                displayOptions: {
                    show: {
                        action: ['createClient'],
                    },
                },
                placeholder: 'Dodaj pole',
                default: {},
                options: [
                    {
                        displayName: 'Imię',
                        name: 'firstName',
                        type: 'string',
                        default: '',
                    },
                    {
                        displayName: 'Nazwisko',
                        name: 'lastName',
                        type: 'string',
                        default: '',
                    },
                    {
                        displayName: 'Email',
                        name: 'email',
                        type: 'string',
                        default: '',
                    },
                    {
                        displayName: 'Telefon',
                        name: 'phone',
                        type: 'string',
                        default: '',
                    },
                ],
            },
        ],
    };

    async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
        const returnData: INodeExecutionData[] = [];
        const credentials = await this.getCredentials('asariCrmApi') as { apiKey: string };
        const action = this.getNodeParameter('action', 0) as string;
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
            const clientData = this.getNodeParameter('clientData', 0) as {
                firstName?: string;
                lastName?: string;
                email?: string;
                phone?: string;
            };

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
