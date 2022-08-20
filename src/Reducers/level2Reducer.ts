export const level2Reducer = (state: any, action: any) => {

    switch(action.type) {

        case "APPROVED":
            switch (action.payload) {
                case "KEK":
                    return {...state, KEK: {...state.KEK, approved: true}}    
                case "ALPHA":
                    return {...state, ALPHA: {...state.ALPHA, approved: true}}    
                case "FOMO":
                    return {...state, FOMO: {...state.FOMO, approved: true}}    
                case "FUD":
                    return {...state, FUD: {...state.FUD, approved: true}}    
                default:
                    return {...state}    
        }
            
        case "LOADING":
            console.log(action.payload)
            switch (action.payload.token) {
                case "KEK":
                    return {...state, KEK: {...state.KEK, loading: action.payload.isLoading}}    
                case "ALPHA":
                    return {...state, ALPHA: {...state.ALPHA, loading: action.payload.isLoading}}    
                case "FOMO":
                    return {...state, FOMO: {...state.FOMO, loading: action.payload.isLoading}}    
                case "FUD":
                    return {...state, FUD: {...state.FUD, loading: action.payload.isLoading}}    
                case "SHIP":
                    return {...state, SHIP: {...state.SHIP, loading: action.payload.isLoading}}    
                default:
                    return {...state}    
            }
        
        case "INIT_APPROVED":
            return {
                KEK: {...state.KEK, approved: action.payload.KEK},
                ALPHA: {...state.ALPHA, approved: action.payload.ALPHA},
                FOMO: {...state.FOMO, approved: action.payload.FOMO},
                FUD: {...state.FUD, approved: action.payload.FUD},
                SHIP: {...state.SHIP},
            }  

        case "LOADING_ALL":
            console.log(state)
            return {
                KEK: {...state.KEK, loading: !state.KEK.loading},
                ALPHA: {...state.ALPHA, loading: !state.ALPHA.loading},
                FOMO: {...state.FOMO, loading: !state.FOMO.loading},
                FUD: {...state.FUD, loading: !state.FUD.loading},
                SHIP: {...state.SHIP, loading: !state.SHIP.loading},
            }    

        default:
            throw new Error(`Unsupported action type ${action.type} in userReducer`)
    }
  }