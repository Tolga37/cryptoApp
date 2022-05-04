const INITIAL_STATE = {
    number:"",
    adress:"",
    instagram:""

  
  
  }
  
  const settingReducers = (state = INITIAL_STATE, action) => {
  
  console.log("ACTİON",action.payload)
    switch (action.type) {
      case 'HOME_SETTİNG':
        return {...state, ...action.payload}
      
     
          
          default:
            return state;
    }
  
    
  };
  
  export default settingReducers;