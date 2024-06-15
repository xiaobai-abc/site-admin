import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./modules/authSlice";

// configureStore创建一个redux数据
const store = configureStore({
  // 合并多个Slice
  reducer: {
    auth: authSlice,
  },
});

export default store;
