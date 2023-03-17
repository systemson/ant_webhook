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
exports.WebhookListener = void 0;
const framework_1 = require("@ant/framework");
const axios_1 = __importDefault(require("axios"));
class WebhookListener extends framework_1.BaseListener {
    constructor() {
        super(...arguments);
        this.eventName = "webhook";
    }
    handler(message) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                axios_1.default.request({
                    url: message.url,
                    method: message.method,
                    data: message.body,
                }).then(response => {
                    framework_1.Logger.trace(response.data);
                    resolve();
                }).catch(error => {
                    (0, framework_1.logCatchedError)(error);
                    if (message.retries <= 3) {
                        message.retries++;
                        framework_1.EventEmitter.emit(this.eventName, message);
                    }
                    else {
                        framework_1.Logger.warn("Max webhook retries.");
                    }
                    reject();
                });
            });
        });
    }
}
exports.WebhookListener = WebhookListener;
//# sourceMappingURL=webhook.listener.js.map