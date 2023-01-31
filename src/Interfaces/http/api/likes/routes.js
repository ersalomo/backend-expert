const routes = (handler) => [
  {
    path: '/threads/{threadId}/comments/{idComment}/likes',
    method: 'POST',
    handler: handler.likeComment,
    options: {
      auth: 'forumapi_jwt',
    },
  },
];

module.exports = routes;
