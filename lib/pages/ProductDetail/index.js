import Page from "../../../components/Page"
import Landing from "./Landing"
import BackButton from "../../../components/BackButton"
import CollectionReferences from "../../../components/CollectionReferences"

export default function ProductDetail({ pageData, detailData, global, preview }) {
    return (
        <Page preview={preview} data={global}>
            <>
                <BackButton />
                <div className="mb-24">
                    <Landing detailData={detailData} className='mb-12' />
                    {(detailData.relatedRecipes != undefined) && (
                        <CollectionReferences title={pageData.relatedRecipesTitle} items={detailData.relatedRecipes} />
                    )}
                </div>
            </>
        </Page>
    )
}