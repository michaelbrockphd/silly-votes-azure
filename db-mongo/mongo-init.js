var dbName = 'sillyvotes';

// Create the database.

db = db.getSiblingDB(dbName);

// Create the users.

db.createUser({
    user: 'adent',
    pwd: 'earth',
    roles: [
        { role: 'read', db: dbName }
    ]
});

db.createUser({
    user: 'fprefect',
    pwd: 'galaxy',
    roles: [
        { role: 'readWrite', db: dbName }
    ]
});

// Create and pre-seed the campaigns collection.

db.createCollection('campaigns');

db.campaigns.insert(
    [
        {
            title: 'Which direction?',
            poolSize: 100,
            email: "welcome@example.com",
            choices:
            [
                'Left',
                'Right'
            ]
        },
        {
            title: 'Which direction now?',
            poolSize: 75,
            email: "bugs.bunny@example.com",
            choices:
            [
                'Up',
                'Down'
            ]
        },
        {
            title: 'Pineapple on pizza?',
            poolSize: 511,
            email: "chaos@example.com",
            choices:
            [
                'Yes',
                'No'
            ]
        },
        {
            title: 'Test Survey 1',
            poolSize: 10,
            email: "ms@example.com",
            choices:
            [
                'Choice 1',
                'Choice 2'
            ]
        }
    ]
);
