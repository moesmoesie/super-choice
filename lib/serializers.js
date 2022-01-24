import Link from "next/link"
import SanityBlockContent from "@sanity/block-content-to-react"

export default {
    types: {
        code: (props) => (
            <pre data-language={props.node.language}>
                <code>{props.node.code}</code>
            </pre>
        ),
        spacer: (props) => {
            return <div style={{ marginBottom: props.node.distance }} />
        },
        block: (props) => {
            if (props.node.style == 'h1') {
                return <Headline1>{props.children}</Headline1>
            }
            return SanityBlockContent.defaultSerializers.types.block(props)
        }
    },
    hardBreak: (props) => {
        return <br></br>
    },
    marks: {
        link: (props) => {
            return <Link href={props.mark.link}><a className="text-primary3 underline">{props.children}</a></Link>
        },
        strong: (props) => {
            return <span className="font-bold">{props.children}</span>
        },
        em: (props) => {
            return <span className="italic">{props.children}</span>
        },
        primaryColor: (props) => {
            return <span className="text-primary3">{props.children}</span>
        },
        asc: (props) => {
            return <span className="text-[#1AA4A0]">{props.children}</span>
        },
        msc: (props) => {
            return <span className="text-[#0A529B]">{props.children}</span>
        }
    }
}