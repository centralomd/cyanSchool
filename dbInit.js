const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

const CurrencyShop = require('./models/CurrencyShop')(sequelize, Sequelize.DataTypes);
require('./models/Users')(sequelize, Sequelize.DataTypes);
require('./models/UserItems')(sequelize, Sequelize.DataTypes);

const force = process.argv.includes('--force') || process.argv.includes('-f');

sequelize.sync({ force }).then(async () => {
	const shop = [
		CurrencyShop.upsert({ name: 'normal bread', cost: 1 }),
		CurrencyShop.upsert({ name: 'bread with blueberries', cost: 5 }),
		CurrencyShop.upsert({ name: 'big bread', cost: 15 }),
		CurrencyShop.upsert({ name: 'bread with choco', cost: 30 }),
		CurrencyShop.upsert({ name: 'thicc bread', cost: 45 }),
		CurrencyShop.upsert({ name: 'exclusive bread', cost: 75 }),
		CurrencyShop.upsert({ name: 'super exclusive bread', cost: 100 }),
		CurrencyShop.upsert({ name: 'bread throphy', cost: 670 }),
		CurrencyShop.upsert({ name: 'Holy Bread', cost: 2000 }),
		CurrencyShop.upsert({ name: 'bread laptop', cost: 4560 }),
		CurrencyShop.upsert({ name: 'bread PC', cost: 20699 }),
		CurrencyShop.upsert({ name: 'bread house', cost: 80299 }),
		CurrencyShop.upsert({ name: 'bread lambo', cost: 140000 }),
		CurrencyShop.upsert({ name: 'the legendary bread coin', cost: 1000000 }),
		CurrencyShop.upsert({ name: 'the original bread', cost: 10000001 }),
	];
	await Promise.all(shop);
	console.log('Database synced');
	sequelize.close();
}).catch(console.error);