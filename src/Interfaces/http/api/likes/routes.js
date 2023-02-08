const routes = (handler) => [
  {
    path: '/threads/{threadId}/comments/{idComment}/likes',
    method: 'PUT',
    handler: handler.likeComment,
    options: {
      auth: 'forumapi_jwt',
    },
  },
];

module.exports = routes;
