import { Method } from "@ant/framework";

export type WebhookMessage = {
    name: string;
    url: string;
    method: Omit<Method, "delete">;
    retries: number;
    body?: any,
}
