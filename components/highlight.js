import Link from "next/link"

export default function Highlight(props) {
    const {highlight} = props
    return (
        <div className={`${props.className} bg-primary3 wrapper py-12 rounded-md place-items-start`}>
            <p className="text-4xl text-white mb-6 md:text-5xl">
                {highlight?.title}
            </p>
            <p className="text-white mb-8 md:columns-2">
                {highlight?.text}
            </p>
            <Link href='#'>
                <a className="button bg-primary5 text-xs">
                    {highlight?.callToAction.text}
                </a>
            </Link>
        </div>
    )
}