import mongoose from 'mongoose';

import CampaignSchema from './CampaignSchema.mjs';

const createContext = (connectionString) => {
    const connectionOptions = { useNewUrlParser: true };

    mongoose.connect(connectionString, connectionOptions);

    return( {
        Campaigns: mongoose.model(CampaignSchema.name, CampaignSchema.schema)
    } );
};

export default createContext;
