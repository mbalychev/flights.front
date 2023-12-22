import { Domain, createDomain } from "effector";
import { attachLogger } from "effector-logger";

export const domain = createDomain('flightsDomain');

attachLogger();


