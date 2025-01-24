/* eslint-disable prettier/prettier */
import * as Knex from 'knex';

export async function seed(knex: Knex.Knex): Promise<any> {
  return knex('beverages')
    .count()
    .then(async (rows) => {
      if (+rows[0]['count'] === 0) {
        await knex('beverages').insert([
          {
            name: 'Clásico',
            code: 'A-1',
            medium_price: 20,
            large_price: 23,
            recipe: JSON.stringify([
              { id: 6, amount_medium: 2, amount_large: 3 },
              { id: 18, amount_medium: 0.15, amount_large: 0.1 },
              { id: 5, amount_medium: 2, amount_large: 2.5 },
            ]),
          },
        ]);
        await knex('beverages').insert([
          {
            name: 'Té verde',
            code: 'A-2',
            medium_price: 20,
            large_price: 23,
            recipe: JSON.stringify([
              { id: 6, amount_medium: 2, amount_large: 3 },
              { id: 16, amount_medium: 0.15, amount_large: 0.1 },
              { id: 5, amount_medium: 2, amount_large: 2.5 },
            ]),
          },
        ]);
        await knex('beverages').insert([
          {
            name: 'Coco',
            code: 'A-3',
            medium_price: 20,
            large_price: 23,
            recipe: JSON.stringify([
              { id: 6, amount_medium: 1, amount_large: 1 },
              { id: 11, amount_medium: 2, amount_large: 3 },
              { id: 5, amount_medium: 2, amount_large: 2.5 },
            ]),
          },
        ]);
        await knex('beverages').insert([
          {
            name: 'Banano',
            code: 'A-4',
            medium_price: 20,
            large_price: 23,
            recipe: JSON.stringify([
              { id: 6, amount_medium: 1, amount_large: 1 },
              { id: 8, amount_medium: 2, amount_large: 3 },
              { id: 5, amount_medium: 2, amount_large: 2.5 },
            ]),
          },
        ]);
        await knex('beverages').insert([
          {
            name: 'Melón Verde',
            code: 'A-5',
            medium_price: 20,
            large_price: 23,
            recipe: JSON.stringify([
              { id: 6, amount_medium: 1, amount_large: 1 },
              { id: 9, amount_medium: 2, amount_large: 3 },
              { id: 5, amount_medium: 2, amount_large: 2.5 },
            ]),
          },
        ]);
        await knex('beverages').insert([
          {
            name: 'Taro',
            code: 'A-6',
            medium_price: 20,
            large_price: 23,
            recipe: JSON.stringify([
              { id: 6, amount_medium: 1, amount_large: 1 },
              { id: 7, amount_medium: 2, amount_large: 3 },
              { id: 5, amount_medium: 2, amount_large: 2.5 },
            ]),
          },
        ]);
        await knex('beverages').insert([
          {
            name: 'Coco-Fresa',
            code: 'A-7',
            medium_price: 22,
            large_price: 25,
            recipe: JSON.stringify([
              { id: 6, amount_medium: 1, amount_large: 1 },
              { id: 11, amount_medium: 2, amount_large: 3 },
              { id: 67, amount_medium: 4, amount_large: 6 },
              { id: 5, amount_medium: 2, amount_large: 2.5 },
            ]),
          },
        ]);
        await knex('beverages').insert([
          {
            name: 'Coco-Mango',
            code: 'A-8',
            medium_price: 22,
            large_price: 25,
            recipe: JSON.stringify([
              { id: 6, amount_medium: 1, amount_large: 1 },
              { id: 11, amount_medium: 2, amount_large: 3 },
              { id: 68, amount_medium: 4, amount_large: 6 },
              { id: 5, amount_medium: 2, amount_large: 2.5 },
            ]),
          },
        ]);
        await knex('beverages').insert([
          {
            name: 'Chocolate',
            code: 'A-9',
            medium_price: 20,
            large_price: 23,
            recipe: JSON.stringify([
              { id: 20, amount_medium: 2, amount_large: 3 },
              { id: 5, amount_medium: 1, amount_large: 1.5 },
            ]),
          },
        ]);
        await knex('beverages').insert([
          {
            name: 'Capuchino',
            code: 'A-10',
            medium_price: 20,
            large_price: 23,
            recipe: JSON.stringify([
              { id: 6, amount_medium: 1, amount_large: 1 },
              { id: 5, amount_medium: 2, amount_large: 2.5 },
            ]),
          },
        ]);
        await knex('beverages').insert([
          {
            name: 'Yuen Yang Té',
            code: 'A-11',
            medium_price: 20,
            large_price: 23,
            recipe: JSON.stringify([
              { id: 6, amount_medium: 1, amount_large: 1 },
              { id: 18, amount_medium: 0.15, amount_large: 0.2 },
              { id: 5, amount_medium: 2, amount_large: 2.5 },
            ]),
          },
        ]);
        await knex('beverages').insert([
          {
            name: 'Matcha',
            code: 'A-12',
            medium_price: 20,
            large_price: 23,
            recipe: JSON.stringify([
              { id: 6, amount_medium: 1, amount_large: 1 },
              { id: 10, amount_medium: 2, amount_large: 3 },
              { id: 5, amount_medium: 2, amount_large: 2.5 },
            ]),
          },
        ]);
        await knex('beverages').insert([
          {
            name: 'Mocaccino',
            code: 'A-13',
            medium_price: 20,
            large_price: 23,
            recipe: JSON.stringify([
              { id: 6, amount_medium: 1, amount_large: 1 },
              { id: 20, amount_medium: 1, amount_large: 2 },
              { id: 5, amount_medium: 2, amount_large: 2.5 },
            ]),
          },
        ]);
        await knex('beverages').insert([
          {
            name: 'Té Chai',
            code: 'A-14',
            medium_price: 20,
            large_price: 23,
            recipe: JSON.stringify([
              { id: 6, amount_medium: 1, amount_large: 1 },
              { id: 13, amount_medium: 2, amount_large: 3 },
              { id: 5, amount_medium: 2, amount_large: 2.5 },
            ]),
          },
        ]);
        await knex('beverages').insert([
          {
            name: 'Té de Tailandia',
            code: 'A-15',
            medium_price: 20,
            large_price: 23,
            recipe: JSON.stringify([
              { id: 6, amount_medium: 1, amount_large: 1 },
              { id: 12, amount_medium: 2, amount_large: 3 },
              { id: 5, amount_medium: 2, amount_large: 2.5 },
            ]),
          },
        ]);
        await knex('beverages').insert([
          {
            name: 'Melocotón',
            code: 'B-1',
            medium_price: 22,
            large_price: 25,
            recipe: JSON.stringify([
              { id: 65, amount_medium: 9, amount_large: 12 },
              { id: 5, amount_medium: 0.5, amount_large: 1 },
            ]),
          },
        ]);
        await knex('beverages').insert([
          {
            name: 'Litchi',
            code: 'B-2',
            medium_price: 22,
            large_price: 25,
            recipe: JSON.stringify([
              { id: 66, amount_medium: 9, amount_large: 12 },
              { id: 5, amount_medium: 0.5, amount_large: 1 },
            ]),
          },
        ]);
        await knex('beverages').insert([
          {
            name: 'Fresa',
            code: 'B-3',
            medium_price: 22,
            large_price: 25,
            recipe: JSON.stringify([
              { id: 67, amount_medium: 9, amount_large: 12 },
              { id: 5, amount_medium: 0.5, amount_large: 1 },
            ]),
          },
        ]);
        await knex('beverages').insert([
          {
            name: 'Mango',
            code: 'B-4',
            medium_price: 22,
            large_price: 25,
            recipe: JSON.stringify([
              { id: 68, amount_medium: 9, amount_large: 12 },
              { id: 5, amount_medium: 0.5, amount_large: 1 },
            ]),
          },
        ]);
        await knex('beverages').insert([
          {
            name: 'Maracuyá',
            code: 'B-5',
            medium_price: 22,
            large_price: 25,
            recipe: JSON.stringify([
              { id: 69, amount_medium: 9, amount_large: 12 },
              { id: 5, amount_medium: 0.5, amount_large: 1 },
            ]),
          },
        ]);
        await knex('beverages').insert([
          {
            name: 'Limón',
            code: 'B-6',
            medium_price: 22,
            large_price: 25,
            recipe: JSON.stringify([
              { id: 70, amount_medium: 9, amount_large: 12 },
              { id: 5, amount_medium: 0.5, amount_large: 1 },
            ]),
          },
        ]);
        await knex('beverages').insert([
          {
            name: 'Uva',
            code: 'B-7',
            medium_price: 22,
            large_price: 25,
            recipe: JSON.stringify([
              { id: 71, amount_medium: 9, amount_large: 12 },
              { id: 5, amount_medium: 0.5, amount_large: 1 },
            ]),
          },
        ]);
        await knex('beverages').insert([
          {
            name: 'BlueBerry',
            code: 'B-8',
            medium_price: 22,
            large_price: 25,
            recipe: JSON.stringify([
              { id: 73, amount_medium: 9, amount_large: 12 },
              { id: 5, amount_medium: 0.5, amount_large: 1 },
            ]),
          },
        ]);
        await knex('beverages').insert([
          {
            name: 'Yogurt',
            code: 'B-9',
            medium_price: 22,
            large_price: 25,
            recipe: JSON.stringify([
              { id: 75, amount_medium: 9, amount_large: 12 },
              { id: 5, amount_medium: 0.5, amount_large: 1 },
            ]),
          },
        ]);
        await knex('beverages').insert([
          {
            name: 'Melón Verde',
            code: 'B-10',
            medium_price: 25,
            large_price: 28,
            recipe: JSON.stringify([
              { id: 72, amount_medium: 9, amount_large: 12 },
              { id: 5, amount_medium: 0.5, amount_large: 1 },
            ]),
          },
        ]);
        await knex('beverages').insert([
          {
            name: 'Chicle',
            code: 'B-11',
            medium_price: 25,
            large_price: 28,
            recipe: JSON.stringify([
              { id: 74, amount_medium: 9, amount_large: 12 },
              { id: 5, amount_medium: 0.5, amount_large: 1 },
            ]),
          },
        ]);
        await knex('beverages').insert([
          {
            name: 'Limonada Rosada',
            code: 'B-12',
            medium_price: 25,
            large_price: 28,
            recipe: JSON.stringify([
              { id: 70, amount_medium: 4, amount_large: 6 },
              { id: 67, amount_medium: 5, amount_large: 6 },
              { id: 5, amount_medium: 0.5, amount_large: 1 },
            ]),
          },
        ]);
        await knex('beverages').insert([
          {
            name: 'Limonada Azul',
            code: 'B-13',
            medium_price: 25,
            large_price: 28,
            recipe: JSON.stringify([
              { id: 70, amount_medium: 4, amount_large: 6 },
              { id: 74, amount_medium: 5, amount_large: 6 },
              { id: 5, amount_medium: 0.5, amount_large: 1 },
            ]),
          },
        ]);
        await knex('beverages').insert([
          {
            name: 'FrutiMix',
            code: 'B-14',
            medium_price: 25,
            large_price: 28,
            recipe: JSON.stringify([
              { id: 65, amount_medium: 3, amount_large: 4 },
              { id: 69, amount_medium: 3, amount_large: 4 },
              { id: 72, amount_medium: 3, amount_large: 4 },
              { id: 5, amount_medium: 0.5, amount_large: 1 },
            ]),
          },
        ]);
        await knex('beverages').insert([
          {
            name: 'Kiwi',
            code: 'B-15',
            medium_price: 25,
            large_price: 28,
            recipe: JSON.stringify([
              { id: 76, amount_medium: 9, amount_large: 12 },
              { id: 5, amount_medium: 0.5, amount_large: 1 },
            ]),
          },
        ]);
        await knex('beverages').insert([
          {
            name: 'Manzana verde',
            code: 'B-16',
            medium_price: 25,
            large_price: 28,
            recipe: JSON.stringify([
              { id: 81, amount_medium: 9, amount_large: 12 },
              { id: 5, amount_medium: 0.5, amount_large: 1 },
            ]),
          },
        ]);
        await knex('beverages').insert([
          {
            name: 'Algodón dulce',
            code: 'B-17',
            medium_price: 25,
            large_price: 28,
            recipe: JSON.stringify([
              { id: 74, amount_medium: 7, amount_large: 9 },
              { id: 14, amount_medium: 1, amount_large: 1 },
              { id: 5, amount_medium: 0.5, amount_large: 1 },
            ]),
          },
        ]);
        await knex('beverages').insert([
          {
            name: 'Granizada Loka',
            code: 'B-18',
            medium_price: 22,
            large_price: 25,
            recipe: JSON.stringify([
              { id: 19, amount_medium: 2, amount_large: 2 },
            ]),
          },
        ]);
        await knex('beverages').insert([
          {
            name: 'Chamoyada',
            code: 'B-19',
            medium_price: 22,
            large_price: 25,
            recipe: JSON.stringify([{}]),
          },
        ]);
        await knex('beverages').insert([
          {
            name: 'Melocotón Chamoyada',
            code: 'B-1.1',
            medium_price: 22,
            large_price: 25,
            recipe: JSON.stringify([
              { id: 65, amount_medium: 9, amount_large: 12 },
              { id: 5, amount_medium: 0.5, amount_large: 1 },
            ]),
          },
        ]);
        await knex('beverages').insert([
          {
            name: 'Litchi Chamoyada',
            code: 'B-2.1',
            medium_price: 22,
            large_price: 25,
            recipe: JSON.stringify([
              { id: 66, amount_medium: 9, amount_large: 12 },
              { id: 5, amount_medium: 0.5, amount_large: 1 },
            ]),
          },
        ]);
        await knex('beverages').insert([
          {
            name: 'Fresa Chamoyada',
            code: 'B-3.1',
            medium_price: 22,
            large_price: 25,
            recipe: JSON.stringify([
              { id: 67, amount_medium: 9, amount_large: 12 },
              { id: 5, amount_medium: 0.5, amount_large: 1 },
            ]),
          },
        ]);
        await knex('beverages').insert([
          {
            name: 'Mango Chamoyada',
            code: 'B-4.1',
            medium_price: 22,
            large_price: 25,
            recipe: JSON.stringify([
              { id: 68, amount_medium: 9, amount_large: 12 },
              { id: 5, amount_medium: 0.5, amount_large: 1 },
            ]),
          },
        ]);
        await knex('beverages').insert([
          {
            name: 'Maracuyá Chamoyada',
            code: 'B-5.1',
            medium_price: 22,
            large_price: 25,
            recipe: JSON.stringify([
              { id: 69, amount_medium: 9, amount_large: 12 },
              { id: 5, amount_medium: 0.5, amount_large: 1 },
            ]),
          },
        ]);
        await knex('beverages').insert([
          {
            name: 'Limón Chamoyada',
            code: 'B-6.1',
            medium_price: 22,
            large_price: 25,
            recipe: JSON.stringify([
              { id: 70, amount_medium: 9, amount_large: 12 },
              { id: 5, amount_medium: 0.5, amount_large: 1 },
            ]),
          },
        ]);
        await knex('beverages').insert([
          {
            name: 'Uva Chamoyada',
            code: 'B-7.1',
            medium_price: 22,
            large_price: 25,
            recipe: JSON.stringify([
              { id: 71, amount_medium: 9, amount_large: 12 },
              { id: 5, amount_medium: 0.5, amount_large: 1 },
            ]),
          },
        ]);
        await knex('beverages').insert([
          {
            name: 'BlueBerry Chamoyada',
            code: 'B-8.1',
            medium_price: 22,
            large_price: 25,
            recipe: JSON.stringify([
              { id: 73, amount_medium: 9, amount_large: 12 },
              { id: 5, amount_medium: 0.5, amount_large: 1 },
            ]),
          },
        ]);
        await knex('beverages').insert([
          {
            name: 'Yogurt Chamoyada',
            code: 'B-9.1',
            medium_price: 22,
            large_price: 25,
            recipe: JSON.stringify([
              { id: 75, amount_medium: 9, amount_large: 12 },
              { id: 5, amount_medium: 0.5, amount_large: 1 },
            ]),
          },
        ]);
        await knex('beverages').insert([
          {
            name: 'Melón Verde Chamoyada',
            code: 'B-10.1',
            medium_price: 25,
            large_price: 28,
            recipe: JSON.stringify([
              { id: 72, amount_medium: 9, amount_large: 12 },
              { id: 5, amount_medium: 0.5, amount_large: 1 },
            ]),
          },
        ]);
        await knex('beverages').insert([
          {
            name: 'Chicle Chamoyada',
            code: 'B-11.1',
            medium_price: 25,
            large_price: 28,
            recipe: JSON.stringify([
              { id: 74, amount_medium: 9, amount_large: 12 },
              { id: 5, amount_medium: 0.5, amount_large: 1 },
            ]),
          },
        ]);
        await knex('beverages').insert([
          {
            name: 'Limonada Rosada Chamoyada',
            code: 'B-12.1',
            medium_price: 25,
            large_price: 28,
            recipe: JSON.stringify([
              { id: 70, amount_medium: 4, amount_large: 6 },
              { id: 67, amount_medium: 5, amount_large: 6 },
              { id: 5, amount_medium: 0.5, amount_large: 1 },
            ]),
          },
        ]);
        await knex('beverages').insert([
          {
            name: 'Limonada Azul Chamoyada',
            code: 'B-13.1',
            medium_price: 25,
            large_price: 28,
            recipe: JSON.stringify([
              { id: 70, amount_medium: 4, amount_large: 6 },
              { id: 74, amount_medium: 5, amount_large: 6 },
              { id: 5, amount_medium: 0.5, amount_large: 1 },
            ]),
          },
        ]);
        await knex('beverages').insert([
          {
            name: 'FrutiMix Chamoyada',
            code: 'B-14.1',
            medium_price: 25,
            large_price: 28,
            recipe: JSON.stringify([
              { id: 65, amount_medium: 3, amount_large: 4 },
              { id: 69, amount_medium: 3, amount_large: 4 },
              { id: 72, amount_medium: 3, amount_large: 4 },
              { id: 5, amount_medium: 0.5, amount_large: 1 },
            ]),
          },
        ]);
        await knex('beverages').insert([
          {
            name: 'Kiwi Chamoyada',
            code: 'B-15.1',
            medium_price: 25,
            large_price: 28,
            recipe: JSON.stringify([
              { id: 76, amount_medium: 9, amount_large: 12 },
              { id: 5, amount_medium: 0.5, amount_large: 1 },
            ]),
          },
        ]);
        await knex('beverages').insert([
          {
            name: 'Manzana verde Chamoyada',
            code: 'B-16.1',
            medium_price: 25,
            large_price: 28,
            recipe: JSON.stringify([
              { id: 81, amount_medium: 9, amount_large: 12 },
              { id: 5, amount_medium: 0.5, amount_large: 1 },
            ]),
          },
        ]);
        await knex('beverages').insert([
          {
            name: 'Algodón dulce Chamoyada',
            code: 'B-17.1',
            medium_price: 25,
            large_price: 28,
            recipe: JSON.stringify([
              { id: 74, amount_medium: 7, amount_large: 9 },
              { id: 14, amount_medium: 1, amount_large: 1 },
              { id: 5, amount_medium: 0.5, amount_large: 1 },
            ]),
          },
        ]);
        await knex('beverages').insert([
          {
            name: 'Granizada Loka Chamoyada',
            code: 'B-18.1',
            medium_price: 22,
            large_price: 25,
            recipe: JSON.stringify([
              { id: 19, amount_medium: 2, amount_large: 2 },
            ]),
          },
        ]);
        await knex('beverages').insert([
          {
            name: 'Melocotón',
            code: 'C-1',
            medium_price: 17,
            large_price: 20,
            recipe: JSON.stringify([
              { id: 65, amount_medium: 4, amount_large: 6 },
              { id: 16, amount_medium: 0.15, amount_large: 0.2 },
              { id: 5, amount_medium: 0.5, amount_large: 1 },
            ]),
          },
        ]);
        await knex('beverages').insert([
          {
            name: 'Litchi',
            code: 'C-2',
            medium_price: 17,
            large_price: 20,
            recipe: JSON.stringify([
              { id: 66, amount_medium: 4, amount_large: 6 },
              { id: 16, amount_medium: 0.15, amount_large: 0.2 },
              { id: 5, amount_medium: 0.5, amount_large: 1 },
            ]),
          },
        ]);
        await knex('beverages').insert([
          {
            name: 'Fresa',
            code: 'C-3',
            medium_price: 17,
            large_price: 20,
            recipe: JSON.stringify([
              { id: 67, amount_medium: 4, amount_large: 6 },
              { id: 16, amount_medium: 0.15, amount_large: 0.2 },
              { id: 5, amount_medium: 0.5, amount_large: 1 },
            ]),
          },
        ]);
        await knex('beverages').insert([
          {
            name: 'Mango',
            code: 'C-4',
            medium_price: 17,
            large_price: 20,
            recipe: JSON.stringify([
              { id: 68, amount_medium: 4, amount_large: 6 },
              { id: 16, amount_medium: 0.15, amount_large: 0.2 },
              { id: 5, amount_medium: 0.5, amount_large: 1 },
            ]),
          },
        ]);
        await knex('beverages').insert([
          {
            name: 'Maracuyá',
            code: 'C-5',
            medium_price: 17,
            large_price: 20,
            recipe: JSON.stringify([
              { id: 69, amount_medium: 4, amount_large: 6 },
              { id: 16, amount_medium: 0.15, amount_large: 0.2 },
              { id: 5, amount_medium: 0.5, amount_large: 1 },
            ]),
          },
        ]);
        await knex('beverages').insert([
          {
            name: 'Limón',
            code: 'C-6',
            medium_price: 17,
            large_price: 20,
            recipe: JSON.stringify([
              { id: 70, amount_medium: 4, amount_large: 6 },
              { id: 16, amount_medium: 0.15, amount_large: 0.2 },
              { id: 5, amount_medium: 0.5, amount_large: 1 },
            ]),
          },
        ]);
        await knex('beverages').insert([
          {
            name: 'Uva',
            code: 'C-7',
            medium_price: 17,
            large_price: 20,
            recipe: JSON.stringify([
              { id: 71, amount_medium: 4, amount_large: 6 },
              { id: 16, amount_medium: 0.15, amount_large: 0.2 },
              { id: 5, amount_medium: 0.5, amount_large: 1 },
            ]),
          },
        ]);
        await knex('beverages').insert([
          {
            name: 'BlueBerry',
            code: 'C-8',
            medium_price: 17,
            large_price: 20,
            recipe: JSON.stringify([
              { id: 73, amount_medium: 4, amount_large: 6 },
              { id: 16, amount_medium: 0.15, amount_large: 0.2 },
              { id: 5, amount_medium: 0.5, amount_large: 1 },
            ]),
          },
        ]);
        await knex('beverages').insert([
          {
            name: 'Melocotón Te Verde',
            code: 'C-1.1',
            medium_price: 17,
            large_price: 20,
            recipe: JSON.stringify([
              { id: 65, amount_medium: 4, amount_large: 6 },
              { id: 16, amount_medium: 0.15, amount_large: 0.2 },
              { id: 5, amount_medium: 0.5, amount_large: 1 },
            ]),
          },
        ]);
        await knex('beverages').insert([
          {
            name: 'Melocotón Te Negro',
            code: 'C-1.2',
            medium_price: 17,
            large_price: 20,
            recipe: JSON.stringify([
              { id: 65, amount_medium: 4, amount_large: 6 },
              { id: 18, amount_medium: 0.15, amount_large: 0.2 },
              { id: 5, amount_medium: 0.5, amount_large: 1 },
            ]),
          },
        ]);
        await knex('beverages').insert([
          {
            name: 'Litchi Te Verde',
            code: 'C-2.1',
            medium_price: 17,
            large_price: 20,
            recipe: JSON.stringify([
              { id: 66, amount_medium: 4, amount_large: 6 },
              { id: 16, amount_medium: 0.15, amount_large: 0.2 },
              { id: 5, amount_medium: 0.5, amount_large: 1 },
            ]),
          },
        ]);
        await knex('beverages').insert([
          {
            name: 'Litchi Te Negro',
            code: 'C-2.2',
            medium_price: 17,
            large_price: 20,
            recipe: JSON.stringify([
              { id: 66, amount_medium: 4, amount_large: 6 },
              { id: 18, amount_medium: 0.15, amount_large: 0.2 },
              { id: 5, amount_medium: 0.5, amount_large: 1 },
            ]),
          },
        ]);
        await knex('beverages').insert([
          {
            name: 'Fresa Te Verde',
            code: 'C-3.1',
            medium_price: 17,
            large_price: 20,
            recipe: JSON.stringify([
              { id: 67, amount_medium: 4, amount_large: 6 },
              { id: 16, amount_medium: 0.15, amount_large: 0.2 },
              { id: 5, amount_medium: 0.5, amount_large: 1 },
            ]),
          },
        ]);
        await knex('beverages').insert([
          {
            name: 'Fresa Te Negro',
            code: 'C-3.2',
            medium_price: 17,
            large_price: 20,
            recipe: JSON.stringify([
              { id: 67, amount_medium: 4, amount_large: 6 },
              { id: 18, amount_medium: 0.15, amount_large: 0.2 },
              { id: 5, amount_medium: 0.5, amount_large: 1 },
            ]),
          },
        ]);
        await knex('beverages').insert([
          {
            name: 'Mango Te Verde',
            code: 'C-4.1',
            medium_price: 17,
            large_price: 20,
            recipe: JSON.stringify([
              { id: 68, amount_medium: 4, amount_large: 6 },
              { id: 16, amount_medium: 0.15, amount_large: 0.2 },
              { id: 5, amount_medium: 0.5, amount_large: 1 },
            ]),
          },
        ]);
        await knex('beverages').insert([
          {
            name: 'Mango Te Negro',
            code: 'C-4.2',
            medium_price: 17,
            large_price: 20,
            recipe: JSON.stringify([
              { id: 68, amount_medium: 4, amount_large: 6 },
              { id: 18, amount_medium: 0.15, amount_large: 0.2 },
              { id: 5, amount_medium: 0.5, amount_large: 1 },
            ]),
          },
        ]);
        await knex('beverages').insert([
          {
            name: 'Maracuyá Te Verde',
            code: 'C-5.1',
            medium_price: 17,
            large_price: 20,
            recipe: JSON.stringify([
              { id: 69, amount_medium: 4, amount_large: 6 },
              { id: 16, amount_medium: 0.15, amount_large: 0.2 },
              { id: 5, amount_medium: 0.5, amount_large: 1 },
            ]),
          },
        ]);
        await knex('beverages').insert([
          {
            name: 'Maracuyá Te Negro',
            code: 'C-5.2',
            medium_price: 17,
            large_price: 20,
            recipe: JSON.stringify([
              { id: 69, amount_medium: 4, amount_large: 6 },
              { id: 18, amount_medium: 0.15, amount_large: 0.2 },
              { id: 5, amount_medium: 0.5, amount_large: 1 },
            ]),
          },
        ]);
        await knex('beverages').insert([
          {
            name: 'Limón Te Verde',
            code: 'C-6.1',
            medium_price: 17,
            large_price: 20,
            recipe: JSON.stringify([
              { id: 70, amount_medium: 4, amount_large: 6 },
              { id: 16, amount_medium: 0.15, amount_large: 0.2 },
              { id: 5, amount_medium: 0.5, amount_large: 1 },
            ]),
          },
        ]);
        await knex('beverages').insert([
          {
            name: 'Limón Te Negro',
            code: 'C-6.2',
            medium_price: 17,
            large_price: 20,
            recipe: JSON.stringify([
              { id: 70, amount_medium: 4, amount_large: 6 },
              { id: 18, amount_medium: 0.15, amount_large: 0.2 },
              { id: 5, amount_medium: 0.5, amount_large: 1 },
            ]),
          },
        ]);
        await knex('beverages').insert([
          {
            name: 'Uva Te Verde',
            code: 'C-7.1',
            medium_price: 17,
            large_price: 20,
            recipe: JSON.stringify([
              { id: 71, amount_medium: 4, amount_large: 6 },
              { id: 16, amount_medium: 0.15, amount_large: 0.2 },
              { id: 5, amount_medium: 0.5, amount_large: 1 },
            ]),
          },
        ]);
        await knex('beverages').insert([
          {
            name: 'Uva Te Negro',
            code: 'C-7.2',
            medium_price: 17,
            large_price: 20,
            recipe: JSON.stringify([
              { id: 71, amount_medium: 4, amount_large: 6 },
              { id: 18, amount_medium: 0.15, amount_large: 0.2 },
              { id: 5, amount_medium: 0.5, amount_large: 1 },
            ]),
          },
        ]);
        await knex('beverages').insert([
          {
            name: 'BlueBerry Te Verde',
            code: 'C-8.1',
            medium_price: 17,
            large_price: 20,
            recipe: JSON.stringify([
              { id: 73, amount_medium: 4, amount_large: 6 },
              { id: 16, amount_medium: 0.15, amount_large: 0.2 },
              { id: 5, amount_medium: 0.5, amount_large: 1 },
            ]),
          },
        ]);
        await knex('beverages').insert([
          {
            name: 'BlueBerry Te Negro',
            code: 'C-8.2',
            medium_price: 17,
            large_price: 20,
            recipe: JSON.stringify([
              { id: 73, amount_medium: 4, amount_large: 6 },
              { id: 18, amount_medium: 0.15, amount_large: 0.2 },
              { id: 5, amount_medium: 0.5, amount_large: 1 },
            ]),
          },
        ]);
        await knex('beverages').insert([
          {
            name: 'Soda Tropical',
            code: 'D-1',
            medium_price: 22,
            large_price: 25,
            recipe: JSON.stringify([
              { id: 73, amount_medium: 4, amount_large: 6 },
              { id: 16, amount_medium: 0.15, amount_large: 0.2 },
              { id: 5, amount_medium: 0.5, amount_large: 1 },
            ]),
          },
        ]);
        await knex('beverages').insert([
          {
            name: 'Soda Mix',
            code: 'D-2',
            medium_price: 22,
            large_price: 25,
            recipe: JSON.stringify([
              { id: 75, amount_medium: 2, amount_large: 2 },
              { id: 67, amount_medium: 1, amount_large: 2 },
              { id: 83, amount_medium: 2, amount_large: 2 },
              { id: 5, amount_medium: 0.5, amount_large: 1 },
            ]),
          },
        ]);
        await knex('beverages').insert([
          {
            name: 'Hawaiiano',
            code: 'D-3',
            medium_price: 22,
            large_price: 25,
            recipe: JSON.stringify([
              { id: 72, amount_medium: 4, amount_large: 2 },
              { id: 67, amount_medium: 1, amount_large: 2 },
              { id: 83, amount_medium: 2, amount_large: 2 },
              { id: 5, amount_medium: 0.5, amount_large: 1 },
            ]),
          },
        ]);
        await knex('beverages').insert([
          {
            name: 'Boom Pop',
            code: 'D-4',
            medium_price: 22,
            large_price: 25,
            recipe: JSON.stringify([
              { id: 66, amount_medium: 4, amount_large: 6 },
              { id: 69, amount_medium: 2, amount_large: 2 },
              { id: 5, amount_medium: 0.5, amount_large: 1 },
            ]),
          },
        ]);
        await knex('beverages').insert([
          {
            name: 'Boba Soda',
            code: 'D-5',
            medium_price: 22,
            large_price: 25,
            recipe: JSON.stringify([
              { id: 5, amount_medium: 0.5, amount_large: 1 },
            ]),
          },
        ]);
        await knex('beverages').insert([
          {
            name: 'Yogurt Boom',
            code: 'D-6',
            medium_price: 22,
            large_price: 25,
            recipe: JSON.stringify([
              { id: 5, amount_medium: 0.5, amount_large: 1 },
            ]),
          },
        ]);
        await knex('beverages').insert([
          {
            name: 'Personalizada',
            code: 'G-1',
            medium_price: 0,
            large_price: 0,
            recipe: JSON.stringify([]),
          },
        ]);
      }
    });
}
