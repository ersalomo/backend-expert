/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('comments', {
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
    thread_id: {
      type: 'VARCHAR(50)',
      notNull: true,
      references: '"threads"',
      onDelete: 'cascade',
      onUpdate: 'cascade',
    },
    content: {
      type: 'TEXT',
    },
    date: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_date'),
    },
    is_deleted: {
      type: 'BOOLEAN',
      notNull: true,
      default: false,
    },
  });
};

exports.down = (pgm) => pgm.dropTable('comments');
