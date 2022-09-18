import { ethers } from "ethers";
import { interfaces } from "../../../Constants/interfaces";
import { LootPicked } from "../../../Models";

export const defaultLootPicked = {
  items: [],
  tokenIds: [],
  amounts: [],
  type_: [],
}

export const fetchChest = async (signer: any, address: string): Promise<{found: boolean, loots: LootPicked}> => {
  const {library, account} = signer
  const Chest = new ethers.Contract(address, interfaces.IChest, library?.getSigner(account) ?? library);

  try {
    const metadata = await Chest.chest()  
    const loots: LootPicked = await Chest.look().catch(async() => {
    return await Chest.callStatic.loot()
    })
    const found = metadata.type_ === "gw3s" ? true : false
    return {found: found, loots: loots}
  } catch (error) {
    return {found: false, loots: defaultLootPicked};
  }
}