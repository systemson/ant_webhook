"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhookSuscriptionRoute = void 0;
const framework_1 = require("@ant/framework");
const webhook_emitter_factory_1 = require("./webhook_emitter.factory");
class WebhookSuscriptionRoute extends framework_1.BaseRoute {
    constructor() {
        super(...arguments);
        this.url = "/api/webhook/register";
        this.method = "post";
    }
    handle(req) {
        const params = req.body;
        const { subscribeTo, request } = params;
        if (!subscribeTo || !request.url) {
            return (0, framework_1.response)({
                status: "Invalid",
            }, 409);
        }
        try {
            const listener = webhook_emitter_factory_1.WebhookEmitterFactory.make(params);
            framework_1.EventEmitter.listen(subscribeTo, listener);
            return (0, framework_1.response)({
                status: "Subscribed"
            });
        }
        catch (error) {
            (0, framework_1.logCatchedError)(error);
            return (0, framework_1.response)().error(error);
        }
    }
}
exports.WebhookSuscriptionRoute = WebhookSuscriptionRoute;
//# sourceMappingURL=webhook_suscription.route.js.map