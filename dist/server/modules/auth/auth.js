"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var service_1 = require("../User/service");
var authSucces_1 = require("../../api/responses/authSucces");
var UserService = new service_1.default();
var TokenRoutes = /** @class */ (function () {
    function TokenRoutes() {
    }
    TokenRoutes.prototype.auth = function (req, res) {
        var credentials = {
            email: req.body.email,
            password: req.body.email
        };
        if (credentials.hasOwnProperty('email') && credentials.hasOwnProperty('password')) {
            UserService
                .getByEmail(credentials.email)
                .then(_.partial(authSucces_1.default, res, credentials))
                .catch(_.partial(authSucces_1.default, res, credentials));
        }
    };
    return TokenRoutes;
}());
exports.default = TokenRoutes;
