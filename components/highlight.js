import Link from "next/link"
import Image from "./image"

export default function Highlight(props) {
    const { highlight } = props
    const hasCta = highlight.callToAction != undefined
    const hasImage = highlight?.image?.asset != undefined

    return (
        <div className={`md:wrapper lg:max-w-none ${props.className}`}>
            <div className="wrapper py-12 bg-primary3  md:rounded-md">
                <div className="flex gap-7 items-center">
                    <div className="flex-1">

                        <p className="text-4xl font-bold text-white mb-6 md:text-5xl">
                            {highlight?.title}
                        </p>
                        <p className={`text-white  ${hasImage ? '' : 'md:columns-2'}`}>
                            {highlight?.text}
                        </p>

                        {hasCta && (
                            <div className="pt-8">
                                <Link href='#'>
                                    <a className="button bg-primary5 text-xs">
                                        {highlight?.callToAction.text}
                                    </a>
                                </Link>
                            </div>
                        )
                        }
                    </div>

                    {hasImage && (
                        <div className="relative hidden md:block w-44 h-44 rounded-full overflow-hidden bg-red-300">
                            <Image
                                className='relative h-full w-full md:rounded-md overflow-hidden'
                                asset={highlight.image.asset}
                                objectFit='object-cover'
                                placeholder={highlight.image.metadata.lqip}
                                sizes={[600]}
                            />
                        </div>
                    )}

                </div>



            </div>
        </div>
    )
}