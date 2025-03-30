import {
    ICredentialType,
    INodeProperties,
} from 'n8n-workflow';

export class AsariCrmApi implements ICredentialType {
    name = 'asariCrmApi';
    displayName = 'ASARI CRM API';
    documentationUrl = 'https://asaricrm.atlassian.net/wiki/';
    properties: INodeProperties[] = [
        {
            displayName: 'API Key',
            name: 'apiKey',
            type: 'string',
            default: '',
        },
    ];
}
