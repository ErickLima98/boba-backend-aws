import * as Knex from 'knex';
import * as bcrypt from 'bcrypt';

export async function seed(knex: Knex.Knex): Promise<any> {
  return knex('owners')
    .count()
    .then(async (rows) => {
      if (+rows[0]['count'] === 0) {
        const encryptedPassword = await bcrypt.hash('bobatea', 10);
        return knex('owners').insert([
          {
            full_name: 'BobaTea Admin',
            email: 'boba@admin.com',
            password: encryptedPassword,
          },
        ]);
      }
    });
}
