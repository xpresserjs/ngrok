// Import Configurations
import Plugin from "../plugin-config";
import net = require("net");
// import ngrok
import ngrok = require("ngrok");

/**
 * Start Ngrok.
 * This function runs when ever you run `xjs cli`
 */
export = async ([config = "default"]) => {
    const { pluginConfig, $ } = Plugin;

    // Check if enabled
    if (!Plugin.pluginConfig.get("enabled"))
        return $.logAndExit("Ngrok plugin is not enabled!");

    // Get required config
    const ngrokConfig = pluginConfig.get(`config.${config}`);
    if (!ngrokConfig) return $.logErrorAndExit(`No config with name: ${config}`);

    // Require Ngrok
    let url;
    try {
        url = await ngrok.connect(ngrokConfig);
    } catch (e) {
        return $.logErrorAndExit(
            e.message
                ? e.message
                : "Error starting ngrok server, something wrong occurred!"
        );
    }

    let domain = url.replace("https://", "");

    /**
     * Save url to ngrok.json in framework storage folder.
     */
    const logPath = $.path.frameworkStorageFolder("ngrok.json");
    $.file.makeDirIfNotExist(logPath, true);

    // Save to ngrok.json.
    $.file.saveToJson(
        logPath,
        { config, url, domain, date: new Date() },
        { checkIfFileExists: false }
    );

    $.logSuccess("Ngrok.io connected!");
    $.logInfo(`Url: ${url}`);
    $.log("Reload your xpresser server.");

    // if pingServer is enabled then ping server.
    if (pluginConfig.get("pingServer.enabled", true)) {
        net.createServer()
            .on("error", () => {})
            .listen(pluginConfig.get("pingServer.port", 9991));
    }
};
