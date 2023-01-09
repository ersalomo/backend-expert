
const routes = (handler) => ([
  {
    method: 'POST',
    path: '/threads/{threadId}/comments/{commentId}/replies',
    handler: handler.addPostReplayComment,
    options: {
      auth: 'forumapi_jwt',
    },
  },
  {
    method: 'delete',
    path: '/threads/{threadId}/comments/{commentId}/replies/{replyId}',
    handler: handler.deletePostReplayComment,
    options: {
      auth: 'forumapi_jwt',
    },
  },
]);

module.exports = routes;
