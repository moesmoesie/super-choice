import Link from "next/link"
import { Headline1 } from "../components/headlines"

export function getSerializer(bodyColor=null){
    return {
        types: {
            block: (props) => {
                if (props.node.style == 'h1') {
                    return <Headline1 className={bodyColor} >{props.children}</Headline1>
                }else if(props.node.style == 'h2'){
                    return <Headline1 className={bodyColor} >{props.children}</Headline1>
                }else if(props.node.style == 'h3'){
                    return <h3 className="text-2xl font-semibold">{props.children}</h3>
                }

                return <p className={bodyColor}>{props.children}</p>
            }
        },
        list: (props) => {
            return <ul className="list-disc pl-6 grid gap-2">{props.children}</ul>
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
                return <span style={{color: "#1AA4A0"}}>{props.children}</span>
            },
            msc: (props) => {
                console.log(props)
                return <span style={{color: '#0A529B'}}>{props.children}</span>
            }
        }
    }
}