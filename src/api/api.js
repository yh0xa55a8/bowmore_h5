import { checkAwarded } from "./checkAwarded";
import { submitAnswer } from "@/api/submitAnswer";
import { takeAward } from "@/api/takeAward";
import { getOpenId } from "@/api/getOpenId";

export const api = {
  checkAwarded,
  submitAnswer,
  takeAward,
  getOpenId
};
