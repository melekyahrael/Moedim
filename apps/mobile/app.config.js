module.exports = {
  expo: {
    name: "Moedim",
    slug: "Moedim",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    scheme: "moedim",
    plugins: ["expo-router"],
    splash: {
      image: "./assets/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    ios: {
      bundleIdentifier: "com.melekyahrael.Moedim",
      supportsTablet: true
    },
    android: {
      package: "com.melekyahrael.Moedim",
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      edgeToEdgeEnabled: true
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    extra: {
      eas: {
        projectId: "12a2772a-1ab6-428d-bbdc-0ed59b216752"
      },
      supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL,
      supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
    },
    owner: "melekyahrael"
  }
};
