/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('reply_comments', {
    id: {
      type: 'varchar(50)',
      primaryKey: true,
    },
    id_thread: {
      type: 'varchar(50)',
      notNull: true,
      references: '"threads"',
      onDelete: 'cascade',
      onUpdate: 'cascade',
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
    content: {
      type: 'TEXT',
    },
    is_delete: {
      type: 'boolean',
      default: false,
    },
    date: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });
};

exports.down = (pgm) => pgm.dropTable('reply_comments');
