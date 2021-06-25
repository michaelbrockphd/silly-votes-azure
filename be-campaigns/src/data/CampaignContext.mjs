import mongoose from 'mongoose';

import CampaignSchema from './CampaignSchema.mjs';

const createContext = (connectionString) => {
    const connectionOptions = { useNewUrlParser: true };

    const connection = mongoose.createConnection(connectionString, connectionOptions);

    return( {
        Campaigns: connection.model(CampaignSchema.name, CampaignSchema.schema)
    } );
};

export default createContext;
