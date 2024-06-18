import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";

const THEME_NAME = "theme";

const showColorList = {
  zinc: "240 5.9% 10%",
  slate: "215.4 16.3% 46.9%",
  stone: "25 5.3% 44.7%",
  gray: "220 8.9% 46.1%",
  neutral: "0 0% 45.1%",
  red: "0 72.2% 50.6%",
  rose: "346.8 77.2% 49.8%",
  orange: "24.6 95% 53.1%",
  green: "142.1 76.2% 36.3%",
  blue: "221.2 83.2% 53.3%",
  yellow: "47.9 95.8% 53.1%",
  violet: "262.1 83.3% 57.8"
};

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
    themeColor: "",
    showColor: "222.2 47.4% 11.2%"
  }
].concat(
  (() =>
    colorList.map((color) => ({
      name: color,
      themeColor: `theme-${color}`,
      showColor: showColorList[color]
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
