import { ethers } from "ethers";
import { interfaces } from "../../../Constants/interfaces";

export const fetchChest = async (signer: any, address: string): Promise<boolean> => {
  const {library, account} = signer
  const Chest = new ethers.Contract(address, interfaces.IChest, library?.getSigner(account) ?? library);

  try {
    const metadata = await Chest.chest()
    return metadata.type_ === "gw3s" ? true : false
  } catch (error) {
    return false;
  }
}