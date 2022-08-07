import { namespace } from "./use.json";
import importableConfig from "./exports/config";
import {loadPluginConfig} from "@xpresser/plugin-tools/src/Config";

export default loadPluginConfig({
    namespace,
    type: "function",
    configFile: "ngrok",
    default: importableConfig
});

