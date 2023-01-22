import ReplyCommentHandler from './handler';

export const routes = (handler:ReplyCommentHandler) => ([
  {
    method: 'POST',
    path: '/threads/{threadId}/comments/{commentId}/replies',
    handler: handler.addPostReplayComment,
    // options: {
    //   auth: 'forumapi_jwt',
    // },
  },
  {
    method: 'delete',
    path: '/threads/{threadId}/comments/{commentId}/replies/{replyId}',
    handler: handler.deletePostReplayComment,
    // options: {
    //   auth: 'forumapi_jwt',
    // },
  },
]);

