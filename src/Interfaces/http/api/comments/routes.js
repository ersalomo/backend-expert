
const routes = (handler) => ([
  {
    method: 'POST',
    path: '/threads/{threadId}/comments',
    handeler: handler,
  },
  {
    method: 'DELETE',
    path: '/threads/{threadId}/comments/{commentId}',
    handeler: handler,
  },
]);

module.exports = routes;
