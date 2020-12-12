import {pluginConfig, $} from "./plugin-config";

export = {
    run() {
        // Run if not console.
        $.ifNotConsole(() => {
            // Check if plugin is enabled
            if (pluginConfig.get("enabled")) {
                const logPath = $.path.frameworkStorageFolder('ngrok.json');
                let url!: string;

                if ($.file.exists(logPath)) {
                    const data = require(logPath);
                    url = data.url;

                    // Save to store
                    $.store.set('ngrok', data);
                }

                // Set on boot event.
                $.on.boot(next => {
                    if (pluginConfig.has("ifEnabled")) {
                        return (pluginConfig.all() as { ifEnabled: (next: any) => void })
                            .ifEnabled(next);
                    }
                    return next();
                });

                if (url) {
                    $.on.serverBooted(next => {
                        // Log url
                        $.logInfo(`Ngrok Url: ${url}`);
                        return next();
                    })
                }

            }
        });
    }
};
