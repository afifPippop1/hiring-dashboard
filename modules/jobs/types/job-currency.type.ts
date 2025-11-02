import { CURRENCY } from "../constants";

export type CurrencyType = (typeof CURRENCY)[keyof typeof CURRENCY];
