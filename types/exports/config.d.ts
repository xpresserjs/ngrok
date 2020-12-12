import type { DollarSign } from "xpresser/types";
import type { INgrokOptions } from "ngrok";
interface thisConfig {
    enabled: boolean;
    config: Record<string, INgrokOptions>;
    ifEnabled: (next: () => any) => any;
}
declare const _default: ($: DollarSign) => thisConfig;
export = _default;
