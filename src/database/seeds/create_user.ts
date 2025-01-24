import * as Knex from 'knex';
import * as bcrypt from 'bcrypt';

export async function seed(knex: Knex.Knex): Promise<any> {
  return knex('users')
    .count()
    .then(async (rows) => {
      if (+rows[0]['count'] === 0) {
        const encryptedPassword = await bcrypt.hash('Tr4c30n', 10);
        await knex('users').insert([
          {
            full_name: 'Bryan Bac',
            email: 'bryanbacparedes@gmail.com',
            password: encryptedPassword,
            role: 'SA',
          },
        ]);
      }
    });
}
