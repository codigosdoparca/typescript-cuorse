"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var routes_1 = require("../../modules/User/routes");
var Routes = /** @class */ (function () {
    function Routes(app) {
        this.router = new routes_1.default();
        this.getRoutes(app);
    }
    Routes.prototype.getRoutes = function (app) {
        app.route('/api/users/all').get(this.router.index);
        app.route('/api/users/create').get(this.router.create);
        app.route('/api/users/:id').get(this.router.findOne);
        app.route('/api/users/:id/update').put(this.router.update);
        app.route('/api/users/:id/destroy').delete(this.router.destroy);
    };
    return Routes;
}());
exports.default = Routes;
