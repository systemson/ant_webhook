import { BaseListener, EventEmitter, ListenerContract } from "@ant/framework";
import { WebhookMessage } from "./commons/webhook_message";
import { WebhookRequest } from "./commons/webhook_request";

export class WebhookEmitterFactory {
    public static make(data: WebhookRequest): ListenerContract {
        return new class FactoryWebhookListener extends BaseListener {
            eventName = data.subscribeTo;

            handler(...args: any[]) {
                const message: WebhookMessage = {
                    retries: 0,
                    method: data.request.method ?? "post",
                    url: data.request.url,
                    name: data.subscribeTo,
                    body: args
                };

                EventEmitter.emit(data.subscribeTo, message);
            }
        };
    }
}
