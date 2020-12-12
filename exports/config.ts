import type {DollarSign} from "xpresser/types";
import type {INgrokOptions} from "ngrok";

// This Configuration Interface
interface thisConfig {
    enabled: boolean
    config: Record<string, INgrokOptions>,
    ifEnabled: (next: () => any) => any
}

export = ($: DollarSign): thisConfig => ({
    /**
     * If disabled no xjs commands will run.
     */
    enabled: true,

    /**
     * Your ngrok configurations.
     * **default** is used when no config is specified when running xjs-cli command
     *
     * See full config options
     * [ngrok](https://npmjs.org/package/ngrok)
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