import { configureStore } from "@reduxjs/toolkit";
import appStateSlice from "./features/appStateSlice.js";
import authModalSlice from "./features/authModelSlice.js";
import globalLoadingSlice from "./features/globalLoadingSlice.js";
import themeModeSlice from "./features/themeModeSlice.js";
import userSlice from "./features/userSlice.js";

const store = configureStore({
  reducer: {
    user: userSlice,
    themeMode: themeModeSlice,
    appState: appStateSlice,
    authModal: authModalSlice,
    globalLoading: globalLoadingSlice,
  },
});

export default store;
