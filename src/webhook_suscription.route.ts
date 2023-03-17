import { BaseRoute, logCatchedError, Method, Request, response, Response } from "@ant/framework";
import { WebhookEmitterFactory } from "./webhook_emitter.factory";
import { WebhookRequest } from "./commons/webhook_request";


export class WebhookSuscriptionRoute extends BaseRoute {
    url = "api/webhook/register";

    method: Method = "post";

    handle(req: Request): Response {
        const params: WebhookRequest = req.body;

        const { subscribeTo, request} = params;

        if (!subscribeTo || !request) {
            return response({
                status: "Invalid",
            }, 409);
        }

        try {
            WebhookEmitterFactory.make(params);

            return response({
                status: "Subscribed"
            });   
        } catch (error) {
            logCatchedError(error as any);

            return response().error(error);
        }
    }

}
