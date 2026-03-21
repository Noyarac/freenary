import InvestmentSubType from "@/types/InvestmentSubType";
import { getHue } from "@/utils";

export default function InvestmentTag({ tag, onClick }: { tag: string, onClick?: () => void }) {
    return (
        <mark style={{ backgroundColor: getHue(tag as InvestmentSubType) }} onClick={onClick}>{tag}</mark>
    )
}