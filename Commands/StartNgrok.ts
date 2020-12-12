// Import Configurations
import {pluginConfig, $} from "../plugin-config";
// import ngrok
import ngrok = require("ngrok");


/**
 * Start Ngrok.
 * This function runs when ever you run `xjs cli`
 */
export = async ([config = "default"]) => {

    // Check if enabled
    if (!pluginConfig.get('enabled'))
        return $.logAndExit("Ngrok plugin is not enabled!");

    // Get required config
    const ngrokConfig = pluginConfig.get(`config.${config}`);
    if (!ngrokConfig) return $.logErrorAndExit(`No config with name: ${config}`);

    // Require Ngrok
    const url = await ngrok.connect(ngrokConfig);

    /**
     * Save url to ngrok.json in framework storage folder.
     */
    const logPath = $.path.frameworkStorageFolder('ngrok.json');
    $.file.makeDirIfNotExist(logPath, true);

    // Save to ngrok.json.
    $.file.saveToJson(logPath, {config, url, date: new Date()}, {checkIfFileExists: false});

    $.logSuccess('Ngrok.io connected successfully.')
    $.logInfo(`Url: ${url}`);
    $.logWarning('Reload your xpresser server.')
};
