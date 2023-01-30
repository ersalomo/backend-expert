const routes = (handler) => [
  {
    path: '/threads/{threadId}/comments/{commentId}/likes',
    method: 'POST',
    handler: handler.postLike,
    options: {
      auth: 'forumapi_jwt',
    },
  },
  {
    path: '/threads/{threadId}/comments/{commentId}/likes',
    method: 'PUT',
    handler: handler.putLike,
    options: {
      auth: 'forumapi_jwt',
    },
  },
];

module.exports = routes;
