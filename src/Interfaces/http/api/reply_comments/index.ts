import {Server} from '@hapi/hapi'
import ReplyCommentHandler from './handler';
import {routes} from './routes';
// import {Container} from 'instances-container';

export const replies = {
  name: 'replies',
  register: (server:Server, {container}:any) => {
    const replyCommentHandler = new ReplyCommentHandler(container);
    server.route(routes(replyCommentHandler));
  },
};
