/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('replay_comments', {
    id: {
      type: 'varchar(50)',
      primaryKey: true,
    },
    id_comment: {
      type: 'varchar(50)',
    },
    id_user: {
      type: 'varchar(50)',
    },
    content: {
      type: 'TEXT',
    },
    is_delete: {
      type: 'varchar(1)',
      default: 0,
    },
    date: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });
};

exports.down = (pgm) => pgm.dropTable('replay_comments');
