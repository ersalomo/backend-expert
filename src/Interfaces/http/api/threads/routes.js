const routes = (handler) => ([
  {
    method: 'POST',
    path: '/threads',
    handler: handler,
  },
  {
    method: 'GET',
    path: '/threads/{threadId}',
    handler: handler,
  },
]);

module.exports = routes;
