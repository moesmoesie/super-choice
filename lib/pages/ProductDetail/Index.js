import Page from "../../../components/Page"
import Landing from "./Landing" 

export default function ProductDetail({detailData, global, preview}) {
    return (
        <Page preview={preview} data={global}>
            <Landing detailData={detailData} className='mb-12' />
        </Page>
    )
}