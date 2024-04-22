import { featuresConfig } from "../config";

export const isFeatureEnable = (name: String) =>
  !!featuresConfig.find((feature) => feature.name === name)?.enabled;
