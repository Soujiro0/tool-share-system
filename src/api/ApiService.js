import * as ActivityLogService from './ActivityLogService';
import * as BorrowRequestService from './BorrowRequestService';
import * as CategoryService from './CategoryService';
import * as ItemService from './ItemService';
import * as LoginService from './LoginService';
import * as TransactionService from './TransactionService';
import * as UserService from './UserService';

export const ApiService = {
    LoginService,
    BorrowRequestService,
    ItemService,
    CategoryService,
    ActivityLogService,
    UserService,
    TransactionService,
};

export default ApiService;
