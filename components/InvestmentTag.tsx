import { getHue } from "@/utils";

export default function InvestmentTag({ tag, onClick }: { tag: string, onClick?: () => void }) {
    return (
        <div className="tag" style={{ backgroundColor: getHue(tag) }} onClick={onClick}>{tag}</div>
    )
}