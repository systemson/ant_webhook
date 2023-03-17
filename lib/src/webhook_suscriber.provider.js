"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseWebhookSubscriberProvider = void 0;
const framework_1 = require("@ant/framework");
const axios_1 = __importDefault(require("axios"));
class BaseWebhookSubscriberProvider extends framework_1.ServiceProvider {
    boot() {
        return __awaiter(this, void 0, void 0, function* () {
            const senderUrl = (0, framework_1.getEnv)("WEBHOOK_SENDER_URL");
            if (!senderUrl) {
                throw new Error(framework_1.Lang.__("No webhook sender url provided in .env"));
            }
            for (const subscription of this.subscriptions) {
                try {
                    framework_1.Logger.debug(framework_1.Lang.__("Suscribing to weebhook [{{name}}] on [{{url}}].", {
                        name: subscription.subscribeTo,
                        url: senderUrl,
                    }));
                    framework_1.Logger.trace(subscription);
                    const response = yield axios_1.default.request({
                        method: "post",
                        url: (0, framework_1.getEnv)("WEBHOOK_SENDER_URL"),
                        data: subscription,
                    });
                    framework_1.Logger.debug(framework_1.Lang.__("Succesfully subscribed to webhook [{{name}}] on [{{url}}].", {
                        name: subscription.subscribeTo,
                        url: senderUrl,
                    }));
                    framework_1.Logger.trace(response.data);
                }
                catch (error) {
                    framework_1.Logger.error(framework_1.Lang.__("Error subscribing to webhook [{{name}}] on [{{url}}].", {
                        name: subscription.subscribeTo,
                        url: senderUrl,
                    }));
                    (0, framework_1.logCatchedException)(error);
                }
            }
        });
    }
}
exports.BaseWebhookSubscriberProvider = BaseWebhookSubscriberProvider;
//# sourceMappingURL=webhook_suscriber.provider.js.map