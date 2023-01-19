/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('threads', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    user_id: {
      type: 'VARCHAR(50)',
      notNull: true,
      references: '"users"',
      onDelete: 'cascade',
      onUpdate: 'cascade',
    },
    title: {
      type: 'VARCHAR(80)',
    },
    body: {
      type: 'TEXT',
    },
    date: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('CURRENT_DATE'),
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('threads');
};
