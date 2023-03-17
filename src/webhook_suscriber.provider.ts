import { getEnv, Lang, logCatchedException, Logger, ServiceProvider } from "@ant/framework";
import axios from "axios";
import { WebhookRequest } from "./commons/webhook_request";

export abstract class BaseWebhookSubscriberProvider extends ServiceProvider {
    abstract subscriptions: WebhookRequest[];

    async boot(): Promise<void> {
        const senderUrl = getEnv("WEBHOOK_SENDER_URL");
        if (!senderUrl) {
            throw new Error(Lang.__("No webhook sender url provided in .env"));
        }

        for (const subscription of this.subscriptions) {
            try {
                Logger.debug(Lang.__("Suscribing to weebhook [{{name}}] on [{{url}}].", {
                    name: subscription.subscribeTo,
                    url: senderUrl,
                }));
                Logger.trace(subscription);

                const response = await axios.request({
                    method: "post",
                    url: getEnv("WEBHOOK_SENDER_URL"),
                    data: subscription,
                });

                Logger.debug(Lang.__("Succesfully subscribed to webhook [{{name}}] on [{{url}}].", {
                    name: subscription.subscribeTo,
                    url: senderUrl,
                }));
                Logger.trace(response.data);

            } catch (error) {
                Logger.error(Lang.__("Error subscribing to webhook [{{name}}] on [{{url}}].", {
                    name: subscription.subscribeTo,
                    url: senderUrl,
                }));

                logCatchedException(error as any);
            }
        }
    }
}
