const INITIAL_STATE = {

  products: [],

}

const productReducers = (state = INITIAL_STATE, action) => {

//console.log("ACTİON",action.payload)
  switch (action.type) {
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload }
    
      case 'ADD_PRODUCT':
        return { ...state, products: action.payload }
        
        default:
          return state;
  }

  
};

export default productReducers;


