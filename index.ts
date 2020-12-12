import {pluginConfig, $} from "./plugin-config";

export = {
    run() {
        // Run if not console.
        $.ifNotConsole(() => {
            // Check if plugin is enabled
            if (pluginConfig.get("enabled")) {
                // Set on boot event.
                $.on.boot(next => {
                    if (pluginConfig.has("ifEnabled")) {
                        return (pluginConfig.all() as { ifEnabled: (next: any) => void })
                            .ifEnabled(next);
                    }
                    return next();
                });

                $.on.serverBooted(next => {
                    const logPath = $.path.frameworkStorageFolder('ngrok.json');
                    if ($.file.exists(logPath)) {
                        const data = require(logPath);
                        if (data.url) {
                            $.logInfo(`Ngrok Url: ${data.url}`);
                        }
                    }
                    return next();
                })
            }
        });
    }
};
