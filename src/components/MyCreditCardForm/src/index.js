import connectToState from "./connectToState";
import CCF from "./CreditCardInput";
import LiteCCF from "./LiteCreditCardInput";
import MyCCF from "./MyCreditCardInput";
import CV from "./CardView";

export const CreditCardInput = connectToState(CCF);
export const LiteCreditCardInput = connectToState(LiteCCF);
export const MyCreditCardInput = connectToState(MyCCF);

export const CardView = CV;
