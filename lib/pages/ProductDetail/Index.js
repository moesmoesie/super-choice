import Page from "../../../components/Page"
import Landing from "./Landing"
import BackButton from "../../../components/BackButton"
export default function ProductDetail({ detailData, global, preview }) {
    return (
        <Page preview={preview} data={global}>
            <>
                <BackButton />
                <Landing detailData={detailData} className='mb-12' />
            </>
        </Page>
    )
}