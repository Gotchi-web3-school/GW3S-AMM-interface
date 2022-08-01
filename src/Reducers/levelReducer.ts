import { LevelContextType } from "../Provider/LevelProvider";

export const levelReducer = (state: LevelContextType, action: any): LevelContextType => {
    const {running, hasCompleted, hasClaimed, factories, tokens} = state;

    // POOLS COMPONENT
    switch(action.type) {
        case "RESET":
            return state

      default:
        throw new Error(`Unsupported action type ${action.type} in userReducer`)
    }
  }