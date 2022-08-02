import { LevelContextType } from "../Provider/LevelProvider";

export const levelReducer = (state: LevelContextType, action: any): LevelContextType => {
   let {running, instanceAddress, hasCompleted, hasClaimed, factories, tokens} = state;

    // POOLS COMPONENT
    switch(action.type) {

        case "SET_LEVEL_STATE":
          running = action.payload.running
          instanceAddress = action.payload.instanceAddress
          hasCompleted = action.payload.hasClompleted
          hasClaimed = action.payload.hasClaimed
          factories = action.payload.factories
          tokens = action.payload.tokens
          return {
            ...state, 
            running: running,
            instanceAddress: instanceAddress,
            hasCompleted: hasCompleted,
            hasClaimed: hasClaimed,
            factories: factories,
            tokens: tokens
          }

        case "RESET":
            return state

      default:
        throw new Error(`Unsupported action type ${action.type} in userReducer`)
    }
  }