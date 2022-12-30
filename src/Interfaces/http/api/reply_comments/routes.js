
const routes = (handler) => ([
  {
    method: 'POST',
    path: '/threads/{threadId}/comments/{commentId}/replies',
    handler: handler.addPostReplayComment,
  },
  {
    method: 'delete',
    path: 'threads/{threadId}/comments/{commentId}/replies/{replyId}',
    handler: handler.deletePostReplayComment,
  },
]);

module.exports = routes;
