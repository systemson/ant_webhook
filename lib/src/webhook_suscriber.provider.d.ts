import { ServiceProvider } from "@ant/framework";
import { WebhookRequest } from "./commons/webhook_request";
export declare abstract class BaseWebhookSubscriberProvider extends ServiceProvider {
    abstract subscriptions: WebhookRequest[];
    boot(): Promise<void>;
}
//# sourceMappingURL=webhook_suscriber.provider.d.ts.map