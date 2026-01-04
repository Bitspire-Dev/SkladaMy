const mysql = require('mysql2/promise');

async function check() {
  const connection = await mysql.createConnection({
    host: '94.232.173.134',
    port: 3306,
    user: 'srv93337_skladamy',
    password: 'XKl)CK3a_gU',
    database: 'srv93337_skladamy'
  });

  console.log('Connected to database');

  // Check permissions
  const [permissions] = await connection.execute(
    'SELECT action, role FROM up_permissions WHERE action LIKE "api::%" ORDER BY action LIMIT 50'
  );

  console.log('\n📊 Permissions in database:');
  console.table(permissions);

  await connection.end();
}

check().catch(console.error);
