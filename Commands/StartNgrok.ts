// Import Configurations
import net from "net";
import {Ngrok, connect} from  "ngrok";
import Plugin from "../plugin-config";


/**
 * Start Ngrok.
 * This function runs when ever you run `xjs ngrok`
 */
export = async ([config = "default"]) => {
    const { pluginConfig, $ } = Plugin;

    // Check if enabled
    if (!pluginConfig.get("enabled"))
        return $.logAndExit("Ngrok plugin is not enabled!");

    // Get required config
    const ngrokConfig: Ngrok.Options = pluginConfig.get(`config.${config}`);
    if (!ngrokConfig) return $.logErrorAndExit(`No config with name: ${config}`);

    // Require Ngrok
    let url;
    try {
        url = await connect(ngrokConfig);
    } catch (e: any) {
        return $.logErrorAndExit(e);
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
