const routes = (handler) => ([
  {
    method: 'POST',
    path: '/threads',
    handler: handler.postThreadHandler,
  },
  {
    method: 'GET',
    path: '/threads/{threadId}',
    handler: handler,
  },
]);

module.exports = routes;
