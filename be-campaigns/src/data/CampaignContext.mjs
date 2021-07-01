import {CosmosClient} from '@azure/cosmos';

const createContext = (options) => {
    const { connectionString, databaseId, containerId } = options;

    const client = new CosmosClient( connectionString );

    const db = client.database(databaseId);

    const container = db.container(containerId);

    return( {
        Campaign: container,
        Campaigns: container.items
    } );
};

export default createContext;
