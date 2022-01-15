export default function handler(req, res) {
    // Clears the preview mode cookies.
    res.clearPreviewData()
    res.redirect("/")
}