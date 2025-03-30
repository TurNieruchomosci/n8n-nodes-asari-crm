
class AsariCrmApi {
    constructor() {
        this.name = 'asariCrmApi';
        this.displayName = 'ASARI CRM API';
        this.documentationUrl = 'https://asaricrm.atlassian.net/wiki/';
        this.properties = [
            {
                displayName: 'API Key',
                name: 'apiKey',
                type: 'string',
                default: '',
            },
        ];
    }
}

module.exports = { AsariCrmApi };
