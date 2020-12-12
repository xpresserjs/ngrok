import type { DollarSign } from "xpresser/types";
import type { INgrokOptions } from "ngrok";
declare interface XpresserNgrokConfig {
    enabled: boolean;
    modifyServerSettings: boolean;
    config: Record<string, INgrokOptions>;
    ifEnabled: (next: () => any) => any;
}
declare const _default: ($: DollarSign) => XpresserNgrokConfig;
/**
 *  @param {Xpresser.DollarSign} $
 */
export = _default;
