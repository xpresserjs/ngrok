import {pluginConfig, $} from "./plugin-config";

export = {
    run() {
        // Run if not console.
        $.ifNotConsole(() => {
            // Check if plugin is enabled
            if (pluginConfig.get("enabled")) {

                const modifyServerSettings = pluginConfig.get('modifyServerSettings', true);

                // Get ngrok.json from framework folder
                const logPath = $.path.frameworkStorageFolder('ngrok.json');
                let url!: string;

                /**
                 * If log Path exists, update it.
                 * Also set `ngrok` to $.store
                 */
                if ($.file.exists(logPath)) {
                    const data = require(logPath);
                    url = data.url;

                    // Save to store
                    $.store.set('ngrok', data);

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
                $.on.boot(next => {
                    // Run if enabled
                    if (pluginConfig.has("ifEnabled")) {
                        return (pluginConfig.all() as { ifEnabled: (next: any) => void })
                            .ifEnabled(next);
                    }

                    return next();
                });


                if (url) {
                    if (modifyServerSettings) {
                        $.on.bootServer(next => {
                            // Log url
                            $.logInfo(`Using Ngrok domain.`);
                            return next();
                        })
                    } else {
                        $.on.serverBooted(next => {
                            // Log url
                            $.logInfo(`Ngrok Url: ${url}`);
                            return next();
                        })
                    }

                }

            }
        });
    }
};
