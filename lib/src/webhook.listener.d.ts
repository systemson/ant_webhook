import { BaseListener } from "@ant/framework";
import { WebhookMessage } from "./commons/webhook_message";
export declare class WebhookListener extends BaseListener {
    eventName: string;
    handler(message: WebhookMessage): Promise<void>;
}
//# sourceMappingURL=webhook.listener.d.ts.map