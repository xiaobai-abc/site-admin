import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";

const THEME_NAME = "theme";

// 主题颜色列表
const colorList = [
  "zinc",
  "slate",
  "stone",
  "gray",
  "neutral",
  "red",
  "rose",
  "orange",
  "green",
  "blue",
  "yellow",
  "violet"
];

// 生成主题颜色列表对象
const themeColorList = [
  {
    name: "defalut",
    color: ""
  }
].concat(
  (() =>
    colorList.map((color) => ({
      name: color,
      color: `theme-${color}`
    })))()
);

const initialState = {
  themeColor: {
    color: "",
    name: "defalut"
  },
  themeMode: "light", // light => dark or null
  themeColorList
};

export const themeSlice = createSlice({
  name: THEME_NAME,
  initialState: initialState,

  reducers: {
    // 重置整个数据
    resetState(state) {
      console.log(state, ">>>>>", initialState);
    },
    // 明亮暗色切换
    setThemeMode(state, { payload }) {
      const mode = payload; // lighgt dark or null
      if (mode == "dark") {
        state.themeMode = "dark";
        document.documentElement.classList.add("dark");
      } else {
        state.themeMode = "light";
        document.documentElement.classList.remove("dark");
      }
    },
    // 主题颜色切换
    setThemeColor(state, { payload }) {
      console.log(state, payload);
    },
    getThemeColor(state, { payload }) {}
  },
  // 异步请求数据
  extraReducers(builder) {}
});

export const { setThemeMode, setThemeColor, resetState } = themeSlice.actions;

export const selectorThemeSlice = (state) => state[THEME_NAME];

// 获取主题颜色对象列表
export const getThemeColorList = (state) => {
  const selectThemeSlice = state[THEME_NAME];
  return selectThemeSlice.themeColorList;
};

export default themeSlice.reducer;
