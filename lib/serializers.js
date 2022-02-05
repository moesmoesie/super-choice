import { Headline1,Headline2,Headline3 } from "../components/headlines"
import { CustomList, ItalicText, BoldText, LinkText, CustomNumberedList, CustomColor } from "../components/RichTextEditorElements"
import getYouTubeId from 'get-youtube-id'
import YouTube from "react-youtube"
import { RichTextImage } from "../components/RichTextEditorElements"

export function getSerializer(bodyColor=null){
    return {
        types: {
            block: (props) => {
                if (props.node.style == 'h1') {
                    return <Headline1 className={bodyColor} >{props.children}</Headline1>
                }else if(props.node.style == 'h2'){
                    return <Headline2 className={bodyColor} >{props.children}</Headline2>
                }else if(props.node.style == 'h3'){
                    return <Headline3 className={bodyColor} >{props.children}</Headline3>
                }
                return <p className={bodyColor}>{props.children}</p>
            },
            youtube: ({node}) => {
                const { url } = node
                const id = getYouTubeId(url)
                return (<YouTube videoId={id} />)
            },
            richImage: ({node}) => {
                return <RichTextImage image = {node}/>
            }
        },
        list: (props) => {
            if(props.type == 'number'){
                return <CustomNumberedList>{props.children}</CustomNumberedList>
            }
            return <CustomList>{props.children}</CustomList>
        },
        hardBreak: (props) => {
            return <br></br>
        },
        marks: {
            link: (props) => {
                return <LinkText link={props.mark.link} >{props.children}</LinkText>                
            },
            color: (props) => {
                return <CustomColor color={props.mark.hex}>{props.children}</CustomColor>
            },
            strong: (props) => {
                return <BoldText>{props.children}</BoldText>
            },
            em: (props) => {
                return <ItalicText>{props.children}</ItalicText>
            }
        }
    }
}