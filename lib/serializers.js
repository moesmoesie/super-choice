import { Headline1,Headline2,Headline3 } from "../components/headlines"
import { CustomList, ItalicText,BoldText, PrimaryColor, AscColor, MscColor, LinkText, CustomNumberedList } from "../components/RichTextEditorElements"

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
            strong: (props) => {
                return <BoldText>{props.children}</BoldText>
            },
            em: (props) => {
                return <ItalicText>{props.children}</ItalicText>
            },
            primaryColor: (props) => {
                return <PrimaryColor>{props.children}</PrimaryColor>
            },
            asc: (props) => {
                return <AscColor>{props.children}</AscColor>
            },
            msc: (props) => {
                return <MscColor>{props.children}</MscColor>
            }
        }
    }
}