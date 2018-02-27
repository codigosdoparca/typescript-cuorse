"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var dbErrorHandler_1 = require("./../../config/dbErrorHandler");
var successHandler_1 = require("./../../api/responses/successHandler");
var ErrorHandler_1 = require("./../../api/responses/ErrorHandler");
var service_1 = require("./service");
var UserController = /** @class */ (function () {
    function UserController() {
        this.UserService = new service_1.default();
    }
    UserController.prototype.getAll = function (req, res) {
        this.UserService.getAll()
            .then(_.partial(successHandler_1.onSuccess, res))
            .catch(_.partial(ErrorHandler_1.onError, res, 'Erro ao buscar todos os usuários'));
    };
    UserController.prototype.createUser = function (req, res) {
        this.UserService
            .create(req.body)
            .then(_.partial(successHandler_1.onSuccess, res))
            .catch(_.partial(dbErrorHandler_1.dbErrorHandler, res))
            .catch(_.partial(ErrorHandler_1.onError, res, 'Erro ao inserir novo usuario'));
    };
    UserController.prototype.getById = function (req, res) {
        var userId = parseInt(req.params.id);
        this.UserService.getById(userId)
            .then(_.partial(successHandler_1.onSuccess, res))
            .catch(_.partial(ErrorHandler_1.onError, res, 'Usuário não encontrado'));
    };
    UserController.prototype.updateUser = function (req, res) {
        var userId = parseInt(req.params.id);
        var props = req.body;
        this.UserService.update(userId, props)
            .then(_.partial(successHandler_1.onSuccess, res))
            .catch(_.partial(ErrorHandler_1.onError, res, 'Falha ao atualizar usuario'));
    };
    UserController.prototype.deleteUser = function (req, res) {
        var userId = parseInt(req.params.id);
        this.UserService.delete(userId)
            .then(_.partial(successHandler_1.onSuccess, res))
            .catch(_.partial(ErrorHandler_1.onError, res, 'Erro ao excluir usuario'));
    };
    return UserController;
}());
exports.default = UserController;
