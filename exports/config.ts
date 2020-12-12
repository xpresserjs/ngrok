import type {DollarSign} from "xpresser/types";
import type {INgrokOptions} from "ngrok";

// This Configuration Interface
declare interface XpresserNgrokConfig {
    enabled: boolean
    modifyServerSettings: boolean
    config: Record<string, INgrokOptions>,
    ifEnabled: (next: () => any) => any
}

/**
 *  @param {Xpresser.DollarSign} $
 */
export = ($: DollarSign): XpresserNgrokConfig => ({
    /**
     * If disabled no xjs commands will run.
     */
    enabled: $.config.get('server.use.ngrok', false),

    /**
     * If enabled config {server.domain} will be set to ngrok domain.
     */
    modifyServerSettings: true,

    /**
     * Your ngrok configurations.
     * **default** is used when no config is specified when running xjs-cli command
     *
     * See full config options
     * https://xpresserjs.com/plugins/@xpresser/ngrok.html#using-custom-ngrok-config
     *
     * @example
     * xjs ngrok // {config.default}
     * xjs ngrok custom // {config.custom}
     */
    config: {
        default: {
            port: $.config.get("server.port"),
        }
    },

    /**
     * Do stuff if ngrok is enabled.
     * This function runs on a $.on.boot event
     */
    ifEnabled(next) {
        // Resume boot.
        return next();
    }
});
