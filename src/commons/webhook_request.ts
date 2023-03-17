import { Method } from "@ant/framework";

export type WebhookRequest = {
    subscribeTo: string,
    request: {
        url: string,
        method?: Method,
    }
}
