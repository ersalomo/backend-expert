const routes = (handler) => [
  {
    path: '/threads/{threadId}/comments/{idComment}/likes',
    method: 'POST',
    handler: handler.postToAddLike,
    options: {
      auth: 'forumapi_jwt',
    },
  },
  {
    path: '/threads/{threadId}/comments/{idComment}/likes/{idLike}',
    method: 'PUT',
    handler: handler.putToUnLike,
    options: {
      auth: 'forumapi_jwt',
    },
  },
];

module.exports = routes;
