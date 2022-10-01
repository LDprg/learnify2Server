db.createUser(
    {
        user: "user",
        pwd: "9TF5KKZSu9kDQbxj",
        roles: [
            {
                role: "readWrite",
                db: "learnify"
            }
        ]
    }
);

db = db.getSiblingDB('learnify');
// db.createCollection('users');
// db.createCollection('set');