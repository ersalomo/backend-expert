import CommentHandler from './handler'

export const routes = (handler: CommentHandler) => ([
  {
    method: 'POST',
    path: '/threads/{threadId}/comments',
    handler: handler.postAddComment,
    options: {
      auth: 'forumapi_jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/threads/{threadId}/comments/{commentId}',
    handler: handler.deleteCommentThread,
    options: {
      auth: 'forumapi_jwt',
    },
  },
]);

