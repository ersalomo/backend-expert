/* istanbul ignore file */

import {createContainer} from 'instances-container';
// import {Container} from 'instances-container';
// external agency
import {nanoid} from 'nanoid';
import bcrypt from 'bcrypt';
import {pool} from './database/postgres/pool';
import Jwt from '@hapi/jwt';
// service (repository, helper, manager, etc)
import UserRepositoryPostgres from './repository/UserRepositoryPostgres';
import BcryptPasswordHash from './security/BcryptPasswordHash';

// use case
import AddUserUseCase from '../Applications/use_case/AddUserUseCase';
import UserRepository from '../Domains/users/UserRepository';
import PasswordHash from '../Applications/security/PasswordHash';
// new add
import AddThreadUseCase from '../Applications/use_case/AddThreadUseCase';
import ThreadRepository from '../Domains/threads/ThreadRepository';
import ThreadRepositoryPostgres from'./repository/ThreadRepositoryPostgres';
import DetailThreadUseCase from'../Applications/use_case/DetailThreadUseCase';
import CommentRepository from'../Domains/comments/CommentRepository';
import CommentRepositoryPostgres from'./repository/CommentRepositoryPostgres';
import AddCommentUseCase from'../Applications/use_case/AddCommentUseCase';
import DeleteCommentUseCase from'../Applications/use_case/DeleteCommentUseCase';
import DeleteReplyCommentUseCase from'../Applications/use_case/DeleteReplyCommentUseCase';

import AddReplyCommentUseCase from'../Applications/use_case/AddReplyCommentUseCase';
import ReplyCommentRepository from'../Domains/reply_comments/ReplyCommentRepository';
import ReplyRepositoryPostgres from'../Infrastructures/repository/ReplyRepositoryPostgres';
// auth
import AuthenticationRepository from'../Domains/authentications/AuthenticationRepository';
import AuthenticationRepositoryPostgres from'../Infrastructures/repository/AuthenticationRepositoryPostgres';
import LoginUserUseCase from'../Applications/use_case/LoginUserUseCase';
import LogoutUserUseCase from'../Applications/use_case/LogoutUserUseCase';
import RefreshAuthenticationUseCase from'../Applications/use_case/RefreshAuthenticationUseCase';
import AuthenticationTokenManager from'../Applications/security/AuthenticationTokenManager';
import JwtTokenManager from'../Infrastructures/security/JwtTokenManager';
// creating container
export const container = createContainer();

// registering services and repository
container.register([
  {
    key: UserRepository.name,
    Class: UserRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
        {
          concrete: nanoid,
        },
      ],
    },
  },
  {
    key: AuthenticationRepository.name,
    Class: AuthenticationRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
      ],
    },
  },
  {
    key: PasswordHash.name,
    Class: BcryptPasswordHash,
    parameter: {
      dependencies: [
        {
          concrete: bcrypt,
        },
      ],
    },
  },
  {
    key: ThreadRepository.name,
    Class: ThreadRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
        {
          concrete: nanoid,
        },
      ],
    },
  },
  {
    key: CommentRepository.name,
    Class: CommentRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
        {
          concrete: nanoid,
        },
      ],
    },
  },
  {
    key: ReplyCommentRepository.name,
    Class: ReplyRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
        {
          concrete: nanoid,
        },
      ],
    },
  },
  {
    key: AuthenticationTokenManager.name,
    Class: JwtTokenManager,
    parameter: {
      dependencies: [
        {
          concrete: Jwt.token,
        },
      ],
    },
  },
]);

// registering use cases
container.register([
  {
    key: AddThreadUseCase.name,
    Class: AddThreadUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'threadRepository',
          internal: ThreadRepository.name,
        },
      ],
    },
  },
  {
    key: AddCommentUseCase.name,
    Class: AddCommentUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'commentRepository',
          internal: CommentRepository.name,
        },
        {
          name: 'threadRepository',
          internal: ThreadRepository.name,
        },
      ],
    },
  },
  {
    key: DetailThreadUseCase.name,
    Class: DetailThreadUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'threadRepository',
          internal: ThreadRepository.name,
        },
        {
          name: 'commentRepository',
          internal: CommentRepository.name,
        },
        {
          name: 'replyCommentRepository',
          internal: ReplyCommentRepository.name,
        },
      ],
    },
  },
  {
    key: AddReplyCommentUseCase.name,
    Class: AddReplyCommentUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'replyCommentRepository',
          internal: ReplyCommentRepository.name,
        },
        {
          name: 'commentRepository',
          internal: CommentRepository.name,
        },
      ],
    },
  },
  {
    key: AddUserUseCase.name,
    Class: AddUserUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'userRepository',
          internal: UserRepository.name,
        },
        {
          name: 'passwordHash',
          internal: PasswordHash.name,
        },
      ],
    },
  },
  {
    key: LoginUserUseCase.name,
    Class: LoginUserUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'userRepository',
          internal: UserRepository.name,
        },
        {
          name: 'authenticationRepository',
          internal: AuthenticationRepository.name,
        },
        {
          name: 'authenticationTokenManager',
          internal: AuthenticationTokenManager.name,
        },
        {
          name: 'passwordHash',
          internal: PasswordHash.name,
        },
      ],
    },
  },
  {
    key: LogoutUserUseCase.name,
    Class: LogoutUserUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'authenticationRepository',
          internal: AuthenticationRepository.name,
        },
      ],
    },
  },
  {
    key: DeleteCommentUseCase.name,
    Class: DeleteCommentUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'commentRepository',
          internal: CommentRepository.name,
        },
        {
          name: 'threadRepository',
          internal: ThreadRepository.name,
        },
      ],
    },
  },
  {
    key: DeleteReplyCommentUseCase.name,
    Class: DeleteReplyCommentUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'replyCommentRepository',
          internal: ReplyCommentRepository.name,
        },
        {
          name: 'commentRepository',
          internal: CommentRepository.name,
        },
      ],
    },
  },
  {
    key: RefreshAuthenticationUseCase.name,
    Class: RefreshAuthenticationUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'authenticationRepository',
          internal: AuthenticationRepository.name,
        },
        {
          name: 'authenticationTokenManager',
          internal: AuthenticationTokenManager.name,
        },
      ],
    },
  },
]);
