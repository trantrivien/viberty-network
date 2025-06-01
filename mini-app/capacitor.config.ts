import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "viberty.network.app",
  backgroundColor: "#000",
  appName: "Viberty",
  webDir: 'mobile_www',
  plugins: {
    SplashScreen: {
      launchAutoHide: true,
    },
  }
};

export default config;
