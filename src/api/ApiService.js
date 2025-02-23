import * as ActivityLogService from './ActivityLogService';
import * as BorrowRequestService from './BorrowRequestService';
import * as CategoryService from './CategoryService';
import * as ItemService from './ItemService';
import * as LoginService from './LoginService';

export const ApiService = {
    LoginService,
    BorrowRequestService,
    ItemService,
    CategoryService,
    ActivityLogService,
};

export default ApiService;
