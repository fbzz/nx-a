/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const users_module_1 = __webpack_require__(5);
const tickets_module_1 = __webpack_require__(9);
let AppModule = class AppModule {
};
AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [users_module_1.UsersModule, tickets_module_1.TicketsModule],
    })
], AppModule);
exports.AppModule = AppModule;


/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const users_service_1 = __webpack_require__(6);
const users_controller_1 = __webpack_require__(7);
let UsersModule = class UsersModule {
};
UsersModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [users_controller_1.UsersController],
        providers: [users_service_1.UsersService],
        exports: [users_service_1.UsersService],
    })
], UsersModule);
exports.UsersModule = UsersModule;


/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
let UsersService = class UsersService {
    constructor() {
        /*
         * In-memory storage so data is lost on server restart.
         */
        this.storedUsers = [
            { id: 1, name: 'Alice' },
            { id: 2, name: 'Bob' },
            { id: 3, name: 'Chris' },
            { id: 4, name: 'Daisy' },
            { id: 5, name: 'Ed' },
        ];
    }
    async users() {
        return this.storedUsers;
    }
    async user(id) {
        return this.storedUsers.find((user) => user.id === +id) ?? null;
    }
};
UsersService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], UsersService);
exports.UsersService = UsersService;


/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersController = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const random_delay_1 = __webpack_require__(8);
const users_service_1 = __webpack_require__(6);
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async getUsers() {
        return this.usersService.users();
    }
    async getUser(id) {
        await (0, random_delay_1.randomDelay)();
        const user = await this.usersService.user(Number(id));
        if (user)
            return user;
        throw new common_1.NotFoundException();
    }
};
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], UsersController.prototype, "getUsers", null);
tslib_1.__decorate([
    (0, common_1.Get)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], UsersController.prototype, "getUser", null);
UsersController = tslib_1.__decorate([
    (0, common_1.Controller)('users'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _a : Object])
], UsersController);
exports.UsersController = UsersController;


/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.randomDelay = void 0;
function randomDelay(maxDelay = 1000) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, Math.random() * maxDelay);
    });
}
exports.randomDelay = randomDelay;


/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TicketsModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const tickets_service_1 = __webpack_require__(10);
const users_module_1 = __webpack_require__(5);
const tickets_controller_1 = __webpack_require__(11);
let TicketsModule = class TicketsModule {
};
TicketsModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [users_module_1.UsersModule],
        controllers: [tickets_controller_1.TicketsController],
        providers: [tickets_service_1.TicketsService],
    })
], TicketsModule);
exports.TicketsModule = TicketsModule;


/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TicketsService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const users_service_1 = __webpack_require__(6);
let TicketsService = class TicketsService {
    constructor(usersService) {
        this.usersService = usersService;
        /*
         * In-memory storage so data is lost on server restart.
         */
        this.storedTickets = [
            {
                id: 1,
                description: "Install a monitor arm",
                assigneeId: 1,
                completed: false,
            },
            {
                id: 2,
                description: "Move the desk to the new location",
                assigneeId: 1,
                completed: false,
            },
        ];
        this.nextId = 3;
    }
    async tickets() {
        return this.storedTickets;
    }
    async ticket(id) {
        return this.storedTickets.find((t) => t.id === id) ?? null;
    }
    async newTicket(payload) {
        const newTicket = {
            id: this.nextId++,
            description: payload.description,
            assigneeId: null,
            completed: false,
        };
        this.storedTickets.push(newTicket);
        return newTicket;
    }
    async assign(ticketId, userId) {
        const ticket = await this.ticket(ticketId);
        const user = await this.usersService.user(userId);
        if (ticket && user) {
            ticket.assigneeId = +userId;
            return true;
        }
        else {
            return false;
        }
    }
    async unassign(ticketId) {
        const ticket = await this.ticket(ticketId);
        if (ticket) {
            ticket.assigneeId = null;
            return true;
        }
        else {
            return false;
        }
    }
    async complete(ticketId, completed) {
        const ticket = await this.ticket(ticketId);
        if (ticket) {
            ticket.completed = completed;
            return true;
        }
        else {
            return false;
        }
    }
};
TicketsService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _a : Object])
], TicketsService);
exports.TicketsService = TicketsService;


/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TicketsController = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const random_delay_1 = __webpack_require__(8);
const tickets_service_1 = __webpack_require__(10);
let TicketsController = class TicketsController {
    constructor(ticketsService) {
        this.ticketsService = ticketsService;
    }
    async getTickets() {
        await (0, random_delay_1.randomDelay)();
        return this.ticketsService.tickets();
    }
    async getTicket(id) {
        await (0, random_delay_1.randomDelay)();
        const ticket = await this.ticketsService.ticket(Number(id));
        if (ticket)
            return ticket;
        throw new common_1.NotFoundException();
    }
    async createTicket(createDto) {
        await (0, random_delay_1.randomDelay)();
        return this.ticketsService.newTicket(createDto);
    }
    async assignTicket(ticketId, userId) {
        await (0, random_delay_1.randomDelay)();
        const success = await this.ticketsService.assign(Number(ticketId), Number(userId));
        if (!success)
            throw new common_1.UnprocessableEntityException();
    }
    async unassignTicket(ticketId) {
        await (0, random_delay_1.randomDelay)();
        const success = await this.ticketsService.unassign(Number(ticketId));
        if (!success)
            throw new common_1.UnprocessableEntityException();
    }
    async markAsComplete(ticketId) {
        await (0, random_delay_1.randomDelay)();
        const success = await this.ticketsService.complete(Number(ticketId), true);
        if (!success)
            throw new common_1.UnprocessableEntityException();
    }
    async markAsIncomplete(ticketId) {
        await (0, random_delay_1.randomDelay)();
        const success = await this.ticketsService.complete(Number(ticketId), false);
        if (!success)
            throw new common_1.UnprocessableEntityException();
    }
};
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], TicketsController.prototype, "getTickets", null);
tslib_1.__decorate([
    (0, common_1.Get)(":id"),
    tslib_1.__param(0, (0, common_1.Param)("id")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], TicketsController.prototype, "getTicket", null);
tslib_1.__decorate([
    (0, common_1.Post)(),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], TicketsController.prototype, "createTicket", null);
tslib_1.__decorate([
    (0, common_1.Put)(":ticketId/assign/:userId"),
    (0, common_1.HttpCode)(204),
    tslib_1.__param(0, (0, common_1.Param)("ticketId")),
    tslib_1.__param(1, (0, common_1.Param)("userId")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], TicketsController.prototype, "assignTicket", null);
tslib_1.__decorate([
    (0, common_1.Put)(":ticketId/unassign"),
    (0, common_1.HttpCode)(204),
    tslib_1.__param(0, (0, common_1.Param)("ticketId")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], TicketsController.prototype, "unassignTicket", null);
tslib_1.__decorate([
    (0, common_1.Put)(":id/complete"),
    (0, common_1.HttpCode)(204),
    tslib_1.__param(0, (0, common_1.Param)("id")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], TicketsController.prototype, "markAsComplete", null);
tslib_1.__decorate([
    (0, common_1.Delete)(":id/complete"),
    (0, common_1.HttpCode)(204),
    tslib_1.__param(0, (0, common_1.Param)("id")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], TicketsController.prototype, "markAsIncomplete", null);
TicketsController = tslib_1.__decorate([
    (0, common_1.Controller)("tickets"),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof tickets_service_1.TicketsService !== "undefined" && tickets_service_1.TicketsService) === "function" ? _a : Object])
], TicketsController);
exports.TicketsController = TicketsController;


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(1);
const core_1 = __webpack_require__(2);
const app_module_1 = __webpack_require__(3);
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const globalPrefix = 'api';
    app.setGlobalPrefix(globalPrefix);
    const port = process.env.PORT || 3333;
    await app.listen(port);
    common_1.Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}
bootstrap();

})();

/******/ })()
;
//# sourceMappingURL=main.js.map