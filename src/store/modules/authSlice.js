import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { postVerifyzxc } from "@/api/userApi.js";

const AUTH_NAME = "auth";

// thunk函数允许执行异步逻辑, 通常用于发出异步请求。
// createAsyncThunk 创建一个异步action，方法触发的时候会有三种状态：
// pending（进行中）、fulfilled（成功）、rejected（失败）

export const authVerify = createAsyncThunk("auth/verify", async () => {
  return postVerifyzxc();
});

const initialState = {
  status: "idel", //请求状态
  lastUpdateTime: 0,
  dynamicAddedRoutes: false, //是否生成路由
  builderMenuList: [],
  // perCode: 1, //用户权限
  userInfo: {
    rule: -1
  }
};

export const authSlice = createSlice({
  name: AUTH_NAME,
  initialState: initialState,

  reducers: {
    // 重置整个数据
    resetState(state) {
      console.log(initialState);
    },
    setLastUpdateTime(state, { payload }) {
      state.lastUpdateTime = payload;
    },
    setDynamicAddedRoutes(state, { payload }) {
      state.dynamicAddedRoutes = payload;
    },
    // 设置菜单列表
    setBuilderMenuList(state, { payload }) {
      state.builderMenuList = payload;
    }
  },
  // 异步请求数据
  extraReducers(builder) {
    builder
      .addCase(authVerify.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(authVerify.fulfilled, (state, action) => {
        if (!action.payload) return;
        const { code, data, message } = action.payload;
        state.status = "successed";
        state.lastUpdateTime = new Date().getTime();
        // 用户信息
        if (code == 200) {
          // console.log("获取用户信息", data);
          state.userInfo = data.userInfo;
          // state.adminTitle = data.admin_title;
        }
      })
      .addCase(authVerify.rejected, (state) => {
        state.status = "rejected";
        console.log("reject");
      });
  }
});

export const {
  resetState,
  setLastUpdateTime,
  setDynamicAddedRoutes,
  setBuilderMenuList
} = authSlice.actions;
export const selectAuthSlice = (state) => state[AUTH_NAME];

// 默认导出
export default authSlice.reducer;
