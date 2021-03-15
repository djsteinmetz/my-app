const sqlite = require('sqlite');

async function setup() {
    const db = await sqlite.open('./mydb.sqlite');
    await db.migrate({ force: 'last' });

    const users = await db.all('SELECT * FROM users');
    console.log('ALL USERS', JSON.stringify(users, null, 2))

    const books = await db.all('SELECT * FROM books');
    console.log('ALL BOOKS', JSON.stringify(books, null, 2))
}

setup();