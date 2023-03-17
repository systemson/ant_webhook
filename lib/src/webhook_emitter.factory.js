"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhookEmitterFactory = void 0;
const framework_1 = require("@ant/framework");
class WebhookEmitterFactory {
    static make(data) {
        return new class FactoryWebhookListener extends framework_1.BaseListener {
            constructor() {
                super(...arguments);
                this.eventName = data.subscribeTo;
            }
            handler(...args) {
                var _a;
                const message = {
                    retries: 0,
                    method: (_a = data.request.method) !== null && _a !== void 0 ? _a : "post",
                    url: data.request.url,
                    name: data.subscribeTo,
                    body: args
                };
                framework_1.EventEmitter.emit(data.subscribeTo, message);
            }
        };
    }
}
exports.WebhookEmitterFactory = WebhookEmitterFactory;
//# sourceMappingURL=webhook_emitter.factory.js.map