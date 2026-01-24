# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`npx create-expo-app@latest`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```
   
3. Reset Project
   ```bash
   npm run reset-project 
   ```
   
4. Install NativeWind
   ```
   npm install nativewind react-native-reanimated@~3.17.4 react-native-safe-area-context@5.4.0
   npm install --dev tailwindcss@^3.4.17 prettier-plugin-tailwindcss@^0.5.11
   ```

5. Create tailwind.config.js
   ```
   /** @type {import('tailwindcss').Config} */
   module.exports = {
   // NOTE: Update this to include the paths to all of your component files.
   content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
   presets: [require("nativewind/preset")],
   theme: {
   extend: {},
   },
   plugins: [],
   }
   ```

6. Create global.css
   ```
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

7. Create babel.config.js
   ```
   module.exports = function (api) {
    api.cache(true);
    return {
        presets: [
            ["babel-preset-expo", { jsxImportSource: "nativewind" }],
            "nativewind/babel",
        ],
        plugins: [
            // ВАЖЛИВО: цей плагін має бути останнім
            "react-native-reanimated/plugin",
        ],
    };
   };
   ```

8. Create metro.config.js
   ```
   const { getDefaultConfig } = require("expo/metro-config");
   const { withNativeWind } = require('nativewind/metro');  
   const config = getDefaultConfig(__dirname)   
   module.exports = withNativeWind(config, { input: './global.css' })    
   ```
   
9. Import your CSS file
   ```
   into _layout.tsx
   import "../global.css"
   ```
   
10. ```npm i -D react-native-worklets```


11. ```npm start -- --reset-cache```


12. ```npx expo start --clear```
   

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.
- [React Native documentation](https://reactnative.dev/)
- [Nativewind](https://www.nativewind.dev/)
