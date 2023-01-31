/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('likes', {
    id: {
      type: 'varchar(50)',
      primaryKey: true,
    },
    id_comment: {
      type: 'varchar(50)',
      notNull: true,
      references: '"comments"',
      onDelete: 'cascade',
      onUpdate: 'cascade',
    },
    id_user: {
      type: 'varchar(50)',
      notNull: true,
      references: '"users"',
      onDelete: 'cascade',
      onUpdate: 'cascade',
    },
    is_liked: {
      type: 'boolean',
      default: true,
    },
    date: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('likes');
};

