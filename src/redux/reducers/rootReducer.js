// redux/reducers/rootReducer.js
"use client";
import { combineReducers } from "redux";
import { reducer as userReducer } from "./userReducer"; // Uygun import ifadesi ekleyin

const rootReducer = combineReducers({
  user: userReducer, // Buradaki "example" yerine uygun bir isim kullanın
  // Diğer reducer'ları buraya ekleyin
});

export default rootReducer;
