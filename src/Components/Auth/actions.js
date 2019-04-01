import { CHANGE_PASSWORD_FIELD, CHANGE_LOGIN_FIELD } from "./constants";
export const setPasswordField = text => ({
  type: CHANGE_PASSWORD_FIELD,
  payload: text
});
export const setLoginField = text => ({
  type: CHANGE_LOGIN_FIELD,
  payload: text
});
