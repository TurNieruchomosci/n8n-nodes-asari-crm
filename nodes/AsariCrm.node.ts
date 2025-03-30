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
                ],
                default: 'getClients',
                description: 'Wybierz akcję do wykonania',
            },
        ],
    };

    async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
        const returnData: INodeExecutionData[] = [];

        const credentials = await this.getCredentials('asariCrmApi') as { apiKey: string };

        const action = this.getNodeParameter('action', 0) as string;

        let responseData;
        const baseUrl = 'https://api.asari.pl/v2';

        if (action === 'getClients') {
            const response = await axios.get(`${baseUrl}/clients`, {
                headers: {
                    'Authorization': `Bearer ${credentials.apiKey}`,
                    'Content-Type': 'application/json',
                },
            });
            responseData = response.data;
        }

        returnData.push({
            json: responseData,
        });

        return [returnData];
    }
}
