import InvestmentSubType from "@/types/InvestmentSubType";
import { getHue } from "@/utils";

export default function InvestmentTag({ tag, onClick }: { tag: InvestmentSubType, onClick?: () => void }) {
    return (
        <mark style={{ backgroundColor: getHue(tag) }} onClick={onClick}>{tag}</mark>
    )
}