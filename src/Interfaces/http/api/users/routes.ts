import UserHandler from './handler';

export const routes = (handler:UserHandler) => ([
  {
    method: 'post',
    path: '/users',
    handler: handler.postUserHandler,
  },
]);
