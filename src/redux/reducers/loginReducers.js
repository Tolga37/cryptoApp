const INITIAL_STATE = {
  
    isLogin:null,
    name:"",
    number:"",
    uid:"",
    type:"",
    information:false,
    day:null,
    time:null,
  product:""
   

  
   

}

const loginReducers = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case 'LOG_IN':
        return {...state, ...action.payload}

        case 'LOG_OUT':
          return {...state, ...action.payload}

          case 'APP_INFO':
            return {...state, ...action.payload}
          
        
      default:
        return state;
    }
  };
  
  export default loginReducers;