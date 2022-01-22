import Link from "next/link"

export default function Highlight(props) {
    const {highlight} = props
    return (
        <div className={`md:wrapper lg:max-w-none ${props.className}`}>
            <div className="wrapper py-12 bg-primary3  md:rounded-md">
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
        </div>
    )
}