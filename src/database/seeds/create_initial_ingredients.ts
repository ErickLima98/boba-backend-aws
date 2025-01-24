/* eslint-disable prettier/prettier */
import * as Knex from 'knex';

export async function seed(knex: Knex.Knex): Promise<any> {
  return knex('products')
    .count()
    .then(async (rows) => {
      if (+rows[0]['count'] === 0) {
        await knex('products').insert([
          {
            name: 'Pajillas',
            amount: 0,
            minimal_amount: 20,
            price: 5,
            used_amount: 1,
          },
        ]);
        await knex('products').insert([
          {
            name: 'Servilletas',
            amount: 0,
            minimal_amount: 20,
            price: 5,
            used_amount: 1,
          },
        ]);
        await knex('products').insert([
          {
            name: 'Vasos M.',
            amount: 0,
            minimal_amount: 20,
            price: 5,
            used_amount: 1,
          },
        ]);
        await knex('products').insert([
          {
            name: 'Vasos L.',
            amount: 0,
            minimal_amount: 20,
            price: 5,
            used_amount: 1,
          },
        ]);
        await knex('products').insert([
          {
            name: 'Caneca Azúcar',
            description: 'porcion en cc',
            amount: 0,
            minimal_amount: 20,
            price: 5,
            used_amount: 5,
          },
        ]);

        await knex('products').insert([
          {
            name: 'Polvo leche',
            description: 'porcion en cucharada',
            amount: 0,
            minimal_amount: 20,
            price: 5,
            used_amount: 10,
          },
        ]);
        await knex('products').insert([
          {
            name: 'Polvo Taro',
            description: 'porcion en cucharada',
            amount: 0,
            minimal_amount: 20,
            price: 5,
            used_amount: 12,
          },
        ]);
        await knex('products').insert([
          {
            name: 'Polvo Banano',
            description: 'porcion en cucharada',
            amount: 0,
            minimal_amount: 20,
            price: 5,
            used_amount: 10,
          },
        ]);
        await knex('products').insert([
          {
            name: 'Polvo Melón Verde',
            description: 'porcion en cucharada',
            amount: 0,
            minimal_amount: 20,
            price: 5,
            used_amount: 10,
          },
        ]);
        await knex('products').insert([
          {
            name: 'Polvo Matcha',
            description: 'porcion en cucharada',
            amount: 0,
            minimal_amount: 20,
            price: 5,
            used_amount: 10,
          },
        ]);
        await knex('products').insert([
          {
            name: 'Polvo Coco',
            description: 'porcion en cucharada',
            amount: 0,
            minimal_amount: 20,
            price: 5,
            used_amount: 10,
          },
        ]);
        await knex('products').insert([
          {
            name: 'Polvo Té Tailandia',
            description: 'porcion en cucharada',
            amount: 0,
            minimal_amount: 20,
            price: 5,
            used_amount: 12,
          },
        ]);
        await knex('products').insert([
          {
            name: 'Polvo Té Chai',
            description: 'porcion en cucharada',
            amount: 0,
            minimal_amount: 20,
            price: 5,
            used_amount: 12,
          },
        ]);
        await knex('products').insert([
          {
            name: 'Polvo Creama batida',
            description: 'porcion en cucharada',
            amount: 0,
            minimal_amount: 20,
            price: 5,
            used_amount: 10,
          },
        ]);
        await knex('products').insert([
          {
            name: 'Polvo Té Jasmin',
            description: 'porcion en cucharada',
            amount: 0,
            minimal_amount: 20,
            price: 5,
            used_amount: 10,
          },
        ]);
        await knex('products').insert([
          {
            name: 'Polvo Té Verde',
            description: 'porcion en cucharada',
            amount: 0,
            minimal_amount: 20,
            price: 5,
            used_amount: 10,
          },
        ]);
        await knex('products').insert([
          {
            name: 'Polvo Té Assam',
            description: 'porcion en cucharada',
            amount: 0,
            minimal_amount: 20,
            price: 5,
            used_amount: 10,
          },
        ]);
        await knex('products').insert([
          {
            name: 'Polvo Té Negro',
            description: 'porcion en cucharada',
            amount: 0,
            minimal_amount: 20,
            price: 5,
            used_amount: 10,
          },
        ]);
        await knex('products').insert([
          {
            name: 'Polvo Granizada Loka',
            description: 'porcion en cucharada',
            amount: 0,
            minimal_amount: 20,
            price: 5,
            used_amount: 10,
          },
        ]);
        await knex('products').insert([
          {
            name: 'Polvo Chocolate',
            description: 'porcion en cucharada',
            amount: 0,
            minimal_amount: 20,
            price: 5,
            used_amount: 14,
          },
        ]);

        await knex('products').insert([
          {
            name: 'Bobas',
            description: 'porcion en gr',
            amount: 0,
            minimal_amount: 20,
            price: 5,
            used_amount: 45,
          },
        ]);
        await knex('products').insert([
          {
            name: 'Boba Fresa',
            description: 'porcion en gr',
            amount: 0,
            minimal_amount: 20,
            price: 5,
            used_amount: 45,
            is_inactive: true,
          },
        ]);
        await knex('products').insert([
          {
            name: 'Boba Mango',
            description: 'porcion en gr',
            amount: 0,
            minimal_amount: 20,
            price: 5,
            used_amount: 45,
            is_inactive: true,
          },
        ]);
        await knex('products').insert([
          {
            name: 'Boba Maracuyá',
            description: 'porcion en gr',
            amount: 0,
            minimal_amount: 20,
            price: 5,
            used_amount: 45,
            is_inactive: true,
          },
        ]);
        await knex('products').insert([
          {
            name: 'Boba Melocotón',
            description: 'porcion en gr',
            amount: 0,
            minimal_amount: 20,
            price: 5,
            used_amount: 45,
            is_inactive: true,
          },
        ]);
        await knex('products').insert([
          {
            name: 'Boba Litchi',
            description: 'porcion en gr',
            amount: 0,
            minimal_amount: 20,
            price: 5,
            used_amount: 45,
            is_inactive: true,
          },
        ]);
        await knex('products').insert([
          {
            name: 'Boba Cerezas',
            description: 'porcion en gr',
            amount: 0,
            minimal_amount: 20,
            price: 5,
            used_amount: 45,
            is_inactive: true,
          },
        ]);
        await knex('products').insert([
          {
            name: 'Boba Kiwi',
            description: 'porcion en gr',
            amount: 0,
            minimal_amount: 20,
            price: 5,
            used_amount: 45,
            is_inactive: true,
          },
        ]);
        await knex('products').insert([
          {
            name: 'Boba Manazana Verde',
            description: 'porcion en gr',
            amount: 0,
            minimal_amount: 20,
            price: 5,
            used_amount: 45,
            is_inactive: true,
          },
        ]);
        await knex('products').insert([
          {
            name: 'Boba Sandía',
            description: 'porcion en gr',
            amount: 0,
            minimal_amount: 20,
            price: 5,
            used_amount: 45,
            is_inactive: true,
          },
        ]);
        await knex('products').insert([
          {
            name: 'Boba Granadina',
            description: 'porcion en gr',
            amount: 0,
            minimal_amount: 20,
            price: 5,
            used_amount: 45,
            is_inactive: true,
          },
        ]);
        await knex('products').insert([
          {
            name: 'Boba Crambery',
            description: 'porcion en gr',
            amount: 0,
            minimal_amount: 20,
            price: 5,
            used_amount: 45,
            is_inactive: true,
          },
        ]);
        await knex('products').insert([
          {
            name: 'Boba Limón Azul',
            description: 'porcion en gr',
            amount: 0,
            minimal_amount: 20,
            price: 5,
            used_amount: 45,
            is_inactive: true,
          },
        ]);
        await knex('products').insert([
          {
            name: 'Boba Chicle Chocolate',
            description: 'porcion en gr',
            amount: 0,
            minimal_amount: 20,
            price: 5,
            used_amount: 45,
            is_inactive: true,
          },
        ]);
        await knex('products').insert([
          {
            name: 'Boba Tutti Fruti',
            description: 'porcion en gr',
            amount: 0,
            minimal_amount: 20,
            price: 5,
            used_amount: 45,
            is_inactive: true,
          },
        ]);
        await knex('products').insert([
          {
            name: 'Boba Coco',
            description: 'porcion en gr',
            amount: 0,
            minimal_amount: 20,
            price: 5,
            used_amount: 45,
            is_inactive: true,
          },
        ]);
        await knex('products').insert([
          {
            name: 'Boba Piña',
            description: 'porcion en gr',
            amount: 0,
            minimal_amount: 20,
            price: 5,
            used_amount: 45,
            is_inactive: true,
          },
        ]);
        await knex('products').insert([
          {
            name: 'Boba Uva',
            description: 'porcion en gr',
            amount: 0,
            minimal_amount: 20,
            price: 5,
            used_amount: 45,
            is_inactive: true,
          },
        ]);
        await knex('products').insert([
          {
            name: 'Boba Miel',
            description: 'porcion en gr',
            amount: 0,
            minimal_amount: 20,
            price: 5,
            used_amount: 45,
            is_inactive: true,
          },
        ]);
        await knex('products').insert([
          {
            name: 'Boba Melón Verde',
            description: 'porcion en gr',
            amount: 0,
            minimal_amount: 20,
            price: 5,
            used_amount: 45,
            is_inactive: true,
          },
        ]);
        await knex('products').insert([
          {
            name: 'Boba Menta Limon',
            description: 'porcion en gr',
            amount: 0,
            minimal_amount: 20,
            price: 5,
            used_amount: 45,
            is_inactive: true,
          },
        ]);
        await knex('products').insert([
          {
            name: 'Boba Yogurt',
            description: 'porcion en gr',
            amount: 0,
            minimal_amount: 20,
            price: 5,
            used_amount: 45,
            is_inactive: true,
          },
        ]);
        await knex('products').insert([
          {
            name: 'Boba Banano',
            description: 'porcion en gr',
            amount: 0,
            minimal_amount: 20,
            price: 5,
            used_amount: 45,
            is_inactive: true,
          },
        ]);
        await knex('products').insert([
          {
            name: 'Boba Limón',
            description: 'porcion en gr',
            amount: 0,
            minimal_amount: 20,
            price: 5,
            used_amount: 45,
            is_inactive: true,
          },
        ]);
        await knex('products').insert([
          {
            name: 'Boba Matcha',
            description: 'porcion en gr',
            amount: 0,
            minimal_amount: 20,
            price: 5,
            used_amount: 45,
            is_inactive: true,
          },
        ]);
        await knex('products').insert([
          {
            name: 'Boba Pitaya',
            description: 'porcion en gr',
            amount: 0,
            minimal_amount: 20,
            price: 5,
            used_amount: 45,
            is_inactive: true,
          },
        ]);
        await knex('products').insert([
          {
            name: 'Boba Café',
            description: 'porcion en gr',
            amount: 0,
            minimal_amount: 20,
            price: 5,
            used_amount: 45,
            is_inactive: true,
          },
        ]);
        await knex('products').insert([
          {
            name: 'Boba Mandarina',
            description: 'porcion en gr',
            amount: 0,
            minimal_amount: 20,
            price: 5,
            used_amount: 45,
            is_inactive: true,
          },
        ]);
        await knex('products').insert([
          {
            name: 'Boba Naranja',
            description: 'porcion en gr',
            amount: 0,
            minimal_amount: 20,
            price: 5,
            used_amount: 45,
            is_inactive: true,
          },
        ]);

        await knex('products').insert([
          {
            name: 'Jelly',
            description: 'porcion en gr',
            amount: 0,
            minimal_amount: 20,
            price: 5,
            used_amount: 45,
          },
        ]);
        await knex('products').insert([
          {
            name: 'Jelly Maracuyá',
            description: 'porcion en gr',
            amount: 0,
            minimal_amount: 20,
            price: 5,
            used_amount: 45,
            is_inactive: true,
          },
        ]);
        await knex('products').insert([
          {
            name: 'Jelly Litchi',
            description: 'porcion en gr',
            amount: 0,
            minimal_amount: 20,
            price: 5,
            used_amount: 45,
            is_inactive: true,
          },
        ]);
        await knex('products').insert([
          {
            name: 'Jelly Fresa',
            description: 'porcion en gr',
            amount: 0,
            minimal_amount: 20,
            price: 5,
            used_amount: 45,
            is_inactive: true,
          },
        ]);
        await knex('products').insert([
          {
            name: 'Jelly Mango',
            description: 'porcion en gr',
            amount: 0,
            minimal_amount: 20,
            price: 5,
            used_amount: 45,
            is_inactive: true,
          },
        ]);
        await knex('products').insert([
          {
            name: 'Jelly Manzana Verde',
            description: 'porcion en gr',
            amount: 0,
            minimal_amount: 20,
            price: 5,
            used_amount: 45,
            is_inactive: true,
          },
        ]);
        await knex('products').insert([
          {
            name: 'Jelly Piña',
            description: 'porcion en gr',
            amount: 0,
            minimal_amount: 20,
            price: 5,
            used_amount: 45,
            is_inactive: true,
          },
        ]);
        await knex('products').insert([
          {
            name: 'Jelly Uva',
            description: 'porcion en gr',
            amount: 0,
            minimal_amount: 20,
            price: 5,
            used_amount: 45,
            is_inactive: true,
          },
        ]);
        await knex('products').insert([
          {
            name: 'Jelly Café',
            description: 'porcion en gr',
            amount: 0,
            minimal_amount: 20,
            price: 5,
            used_amount: 45,
          },
        ]);
        await knex('products').insert([
          {
            name: 'Brown Sugar',
            description: 'porcion en gr',
            amount: 0,
            minimal_amount: 20,
            price: 5,
            used_amount: 45,
          },
        ]);
        await knex('products').insert([
          {
            name: 'Jelly Corazón Fresa',
            description: 'porcion en gr',
            amount: 0,
            minimal_amount: 20,
            price: 5,
            used_amount: 45,
            is_inactive: true,
          },
        ]);
        await knex('products').insert([
          {
            name: 'Jelly Estrella Mango',
            description: 'porcion en gr',
            amount: 0,
            minimal_amount: 20,
            price: 5,
            used_amount: 45,
            is_inactive: true,
          },
        ]);
        await knex('products').insert([
          {
            name: 'Jelly Aloe',
            description: 'porcion en gr',
            amount: 0,
            minimal_amount: 20,
            price: 5,
            used_amount: 45,
            is_inactive: true,
          },
        ]);
        await knex('products').insert([
          {
            name: 'Jelly Chicle Delfín',
            description: 'porcion en gr',
            amount: 0,
            minimal_amount: 20,
            price: 5,
            used_amount: 45,
            is_inactive: true,
          },
        ]);

        await knex('products').insert([
          {
            name: 'Tapioca',
            description: 'porcion en kg',
            amount: 0,
            minimal_amount: 20,
            price: 5,
            used_amount: 45,
          },
        ]);

        await knex('products').insert([
          {
            name: 'Jugo Melocotón',
            description: 'porcion en cc',
            amount: 0,
            minimal_amount: 20,
            price: 5,
            used_amount: 5,
          },
        ]);
        await knex('products').insert([
          {
            name: 'Jugo Litchi',
            description: 'porcion en cc',
            amount: 0,
            minimal_amount: 20,
            price: 5,
            used_amount: 5,
          },
        ]);
        await knex('products').insert([
          {
            name: 'Jugo Fresa',
            description: 'porcion en cc',
            amount: 0,
            minimal_amount: 20,
            price: 5,
            used_amount: 5,
          },
        ]);
        await knex('products').insert([
          {
            name: 'Jugo Mango',
            description: 'porcion en cc',
            amount: 0,
            minimal_amount: 20,
            price: 5,
            used_amount: 5,
          },
        ]);
        await knex('products').insert([
          {
            name: 'Jugo Maracuyá',
            description: 'porcion en cc',
            amount: 0,
            minimal_amount: 20,
            price: 5,
            used_amount: 5,
          },
        ]);
        await knex('products').insert([
          {
            name: 'Jugo Limón',
            description: 'porcion en cc',
            amount: 0,
            minimal_amount: 20,
            price: 5,
            used_amount: 5,
          },
        ]);
        await knex('products').insert([
          {
            name: 'Jugo Uva',
            description: 'porcion en cc',
            amount: 0,
            minimal_amount: 20,
            price: 5,
            used_amount: 5,
          },
        ]);
        await knex('products').insert([
          {
            name: 'Jugo Melón Verde',
            description: 'porcion en cc',
            amount: 0,
            minimal_amount: 20,
            price: 5,
            used_amount: 5,
          },
        ]);
        await knex('products').insert([
          {
            name: 'Jugo Blueberry',
            description: 'porcion en cc',
            amount: 0,
            minimal_amount: 20,
            price: 5,
            used_amount: 5,
          },
        ]);
        await knex('products').insert([
          {
            name: 'Jugo Chicle',
            description: 'porcion en cc',
            amount: 0,
            minimal_amount: 20,
            price: 5,
            used_amount: 5,
          },
        ]);
        await knex('products').insert([
          {
            name: 'Jugo Yogurt',
            description: 'porcion en cc',
            amount: 0,
            minimal_amount: 20,
            price: 5,
            used_amount: 5,
          },
        ]);
        await knex('products').insert([
          {
            name: 'Jugo Kiwi',
            description: 'porcion en cc',
            amount: 0,
            minimal_amount: 20,
            price: 5,
            used_amount: 5,
          },
        ]);
        await knex('products').insert([
          {
            name: 'Jugo Cereza',
            description: 'porcion en cc',
            amount: 0,
            minimal_amount: 20,
            price: 5,
            used_amount: 5,
          },
        ]);
        await knex('products').insert([
          {
            name: 'Jugo Caramelo',
            description: 'porcion en cc',
            amount: 0,
            minimal_amount: 20,
            price: 5,
            used_amount: 5,
          },
        ]);
        await knex('products').insert([
          {
            name: 'Jugo Coco',
            description: 'porcion en cc',
            amount: 0,
            minimal_amount: 20,
            price: 5,
            used_amount: 5,
          },
        ]);
        await knex('products').insert([
          {
            name: 'Jugo Piña',
            description: 'porcion en cc',
            amount: 0,
            minimal_amount: 20,
            price: 5,
            used_amount: 5,
          },
        ]);
        await knex('products').insert([
          {
            name: 'Jugo Manzana Verde',
            description: 'porcion en cc',
            amount: 0,
            minimal_amount: 20,
            price: 5,
            used_amount: 5,
          },
        ]);
        await knex('products').insert([
          {
            name: 'Jugo Manazana Amarilla',
            description: 'porcion en cc',
            amount: 0,
            minimal_amount: 20,
            price: 5,
            used_amount: 5,
          },
        ]);
        await knex('products').insert([
          {
            name: 'Jugo Uva Verde',
            description: 'porcion en cc',
            amount: 0,
            minimal_amount: 20,
            price: 5,
            used_amount: 5,
          },
        ]);
        await knex('products').insert([
          {
            name: 'Jugo Menta',
            description: 'porcion en cc',
            amount: 0,
            minimal_amount: 20,
            price: 5,
            used_amount: 5,
          },
        ]);
        await knex('products').insert([
          {
            name: 'Jugo Sandia',
            description: 'porcion en cc',
            amount: 0,
            minimal_amount: 20,
            price: 5,
            used_amount: 5,
          },
        ]);
        await knex('products').insert([
          {
            name: 'Jugo Kumquat',
            description: 'porcion en cc',
            amount: 0,
            minimal_amount: 20,
            price: 5,
            used_amount: 5,
          },
        ]);
        await knex('products').insert([
          {
            name: 'Jugo Kumquat/Limón',
            description: 'porcion en cc',
            amount: 0,
            minimal_amount: 20,
            price: 5,
            used_amount: 5,
          },
        ]);
        await knex('products').insert([
          {
            name: 'Jugo Guayaba Rojo',
            description: 'porcion en cc',
            amount: 0,
            minimal_amount: 20,
            price: 5,
            used_amount: 5,
          },
        ]);
        await knex('products').insert([
          {
            name: 'Jugo Raspberry',
            description: 'porcion en cc',
            amount: 0,
            minimal_amount: 20,
            price: 5,
            used_amount: 5,
          },
        ]);
        await knex('products').insert([
          {
            name: 'Jugo Vainilla',
            description: 'porcion en cc',
            amount: 0,
            minimal_amount: 20,
            price: 5,
            used_amount: 5,
          },
        ]);
        await knex('products').insert([
          {
            name: 'Jugo Jamaica',
            description: 'porcion en cc',
            amount: 0,
            minimal_amount: 20,
            price: 5,
            used_amount: 5,
          },
        ]);
        await knex('products').insert([
          {
            name: 'Jugo Pitaya',
            description: 'porcion en cc',
            amount: 0,
            minimal_amount: 20,
            price: 5,
            used_amount: 5,
          },
        ]);
        await knex('products').insert([
          {
            name: 'Jugo Wax',
            description: 'porcion en cc',
            amount: 0,
            minimal_amount: 20,
            price: 5,
            used_amount: 5,
          },
        ]);
        await knex('products').insert([
          {
            name: 'Jugo Mix',
            description: 'porcion en cc',
            amount: 0,
            minimal_amount: 20,
            price: 5,
            used_amount: 5,
          },
        ]);
        await knex('products').insert([
          {
            name: 'Sellos',
            amount: 0,
            minimal_amount: 20,
            price: 5,
            used_amount: 1,
          },
        ]);
        await knex('products').insert([
          {
            name: 'Domos',
            amount: 0,
            minimal_amount: 20,
            price: 5,
            used_amount: 1,
          },
        ]);
      }
    });
}
