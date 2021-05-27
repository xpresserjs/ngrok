import Plugin from "./plugin-config";
import type { DollarSign } from "xpresser/types";
import net = require("net");

export = {
    async run(aboutPlugin: any, $: DollarSign) {
        const { pluginConfig } = Plugin;

        // Run if not console.
        if (!$.options.isConsole) {
            // Check if plugin is enabled
            if (pluginConfig.get("enabled")) {
                const modifyServerSettings = pluginConfig.get(
                    "modifyServerSettings",
                    true
                );

                // Get ngrok.json from framework folder
                const logPath = $.path.frameworkStorageFolder("ngrok.json");
                let url!: string;
                let pingIsOnline: boolean = false;

                /**
                 * If log Path exists, update it.
                 * Also set `ngrok` to $.store
                 */
                if ($.file.exists(logPath)) {
                    const data = require(logPath);
                    url = data.url;

                    // if pingServer is enabled then ping server.
                    if (pluginConfig.get("pingServer.enabled", true)) {
                        pingIsOnline = await pingNgrokProcess(
                            $,
                            pluginConfig.get("pingServer.port", 9991)
                        );

                        // Stop Run if ping server is offline
                        if (!pingIsOnline) {
                            // Delete log Path
                            $.file.delete(logPath);
                            // Return
                            return;
                        }
                    }

                    // Save to store
                    $.store.set("ngrok", data);

                    // Check modifyServerSettings is enabled
                    if (modifyServerSettings) {
                        // Modify server settings
                        $.config.path("server").set({
                            protocol: "https", // project to https
                            includePortInUrl: false, // remove port form url
                            domain: $.store.get("ngrok.domain") // set domain
                        });
                    }
                }

                // Set on boot event.
                $.on.boot((next) => {
                    // Run if enabled
                    if (pluginConfig.has("ifEnabled")) {
                        return (
                            pluginConfig.all() as {
                                ifEnabled: (next: any) => void;
                            }
                        ).ifEnabled(next);
                    }

                    return next();
                });

                if (url) {
                    if (modifyServerSettings) {
                        $.on.bootServer((next) => {
                            // Log url
                            $.logInfo(`Using Ngrok domain.`);
                            return next();
                        });
                    } else {
                        $.on.serverBooted((next) => {
                            // Log url
                            $.logInfo(`Ngrok Url: ${url}`);
                            return next();
                        });
                    }
                }
            }
        }
    }
};

function pingNgrokProcess($: DollarSign, port: number = 9898): Promise<boolean> {
    // Connect to a server @ port 9898
    return new Promise((resolve) => {
        const client = net.createConnection({ port }, () => {
            resolve(true);
            client.destroy();
        });

        client.on("error", (e) => {
            resolve(false);
            client.destroy();
        });
    });
}
