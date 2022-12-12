const connectDB = require('./config/db');
const users = require('./models/User.model');

const main = () => {
    connectDB();

    const admin = new users.User({
        username: 'admin@vocuaba.com',
        password: 'admin',
        role: 'admin',
        phone_number: '0123456789',
        address: 'Ho Chi Minh City'
    });

    admin.save((err, user) => {
        if (err) {
            console.log(err);
        }

        console.log(user);
    });
}

main();