import { getHue } from "@/utils";

export default function InvestmentTag({ tag, onClick }: { tag: string, onClick?: () => void }) {
    return (
        <div className="tag" style={{ display: "inline-block", padding: "0.25rem 0.5rem" , backgroundColor: getHue(tag) }} onClick={onClick}>{tag}</div>
    )
}