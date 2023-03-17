import { BaseListener, EventEmitter, logCatchedError, Logger } from "@ant/framework";
import axios from "axios";
import { WebhookMessage } from "./commons/webhook_message";

export class WebhookListener extends BaseListener {
    eventName = "webhook";

    async handler(message: WebhookMessage): Promise<void> {
        return new Promise((resolve, reject) => {
            axios.request({
                url: message.url,
                method: message.method as any,
                data: message.body,
            }).then(response => {
                Logger.trace(response.data);
                resolve();
            }).catch(error => {
                logCatchedError(error);
                if (message.retries <= 3) {
                    message.retries++;

                    EventEmitter.emit("webhook", message);
                } else {
                    Logger.warn("Max webhook retries.");
                }
                reject();
            });
        });
    }
}
