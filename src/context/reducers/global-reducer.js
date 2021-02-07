export default (state, action) => {
  switch (action.type) {
    case "SET_WINDOW_DIMENSION":
      return {
        ...state,
        windowWidth: action.width,
        windowHeight: action.height,
      };
    case "SET_IS_LOGGED_IN":
      return {
        ...state,
        isLoggedIn: action.value,
      };
    case "SET_META_INFO":
      console.log(action.chainId);
      console.log(action.accountId);
      return {
        ...state,
        chainId: action.chainId,
        accountId: action.accountId,
      };
    case "SET_BALANCE":
      return {
        ...state,
        balance: action.balance,
      };
    default:
      return state;
  }
};
