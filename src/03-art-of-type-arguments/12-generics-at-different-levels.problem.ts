import { expect, it, describe } from "vitest";
import { Equal, Expect } from "../helpers/type-utils";

// export const getHomePageFeatureFlags = <
//   T extends { rawConfig: { featureFlags: { homePage: any } } },
//   U
// >(
//   config: T,
//   override: (
//     flags: T extends { rawConfig: { featureFlags: { homePage: infer U } } }
//       ? U
//       : never
//   ) => U
// ) => {
//   return override(config.rawConfig.featureFlags.homePage);
// };

export const getHomePageFeatureFlags = <T>(
  config: { rawConfig: { featureFlags: { homePage: T } } },
  override: (flags: T) => T
) => {
  return override(config.rawConfig.featureFlags.homePage);
};

describe("getHomePageFeatureFlags", () => {
  const EXAMPLE_CONFIG = {
    apiEndpoint: "https://api.example.com",
    apiVersion: "v1",
    apiKey: "1234567890",
    rawConfig: {
      featureFlags: {
        homePage: {
          showBanner: true,
          showLogOut: false,
        },
        loginPage: {
          showCaptcha: true,
          showConfirmPassword: false,
        },
      },
    },
  };
  it("Should return the homePage flag object", () => {
    const flags = getHomePageFeatureFlags(
      EXAMPLE_CONFIG,
      (defaultFlags) => defaultFlags
    );

    expect(flags).toEqual({
      showBanner: true,
      showLogOut: false,
    });

    type tests = [
      Expect<Equal<typeof flags, { showBanner: boolean; showLogOut: boolean }>>
    ];
  });

  it("Should allow you to modify the result", () => {
    const flags = getHomePageFeatureFlags(EXAMPLE_CONFIG, (defaultFlags) => ({
      ...defaultFlags,
      showBanner: false,
    }));

    expect(flags).toEqual({
      showBanner: false,
      showLogOut: false,
    });

    type tests = [
      Expect<Equal<typeof flags, { showBanner: boolean; showLogOut: boolean }>>
    ];
  });
});
