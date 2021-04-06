import type { DollarSign } from "xpresser/types";
import type { Ngrok } from "ngrok";
declare interface XpresserNgrokConfig {
    enabled: boolean;
    modifyServerSettings: boolean;
    config: Record<string, Ngrok.Options>;
    ifEnabled: (next: () => any) => any;
}
declare const _default: ($: DollarSign) => XpresserNgrokConfig;
/**
 *  @param {Xpresser.DollarSign} $
 */
export = _default;
