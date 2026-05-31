import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import userSlice from "./userSlice";
import filterslice from "./filterslice";
import appslice from "./appslice";

const userPersistConfig = {
  key: "user",
  storage,

  // blacklist: ['fieldToExclude'],
  // whitelist: ['fieldToInclude'],
};

const persistedUserReducer = persistReducer(userPersistConfig, userSlice);

const store = configureStore({
  reducer: {
    // user: userSlice,
    user: persistedUserReducer,

    filters: filterslice,
    app: appslice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export default store;
