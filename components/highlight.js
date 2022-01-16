import Link from "next/link"

export default function Highlight(props) {
    const {highlight} = props
    return (
        <div className="bg-primary2 wrapper py-12 place-items-start">
            <p className="text-4xl text-white mb-6">
                {highlight?.title}
            </p>
            <p className="text-white mb-8">
                {highlight?.text}
            </p>
            <Link href='#'>
                <a className="button bg-primary4 text-xs">
                    {highlight?.callToAction.text}
                </a>
            </Link>
        </div>
    )
}