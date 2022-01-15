export default function handler(req, res) {

    if (req.query.secret !== 'SECRET' || !req.query.slug) {
        return res.status(401).json({ message: 'Invalid token' })
    }

    const slug = req.query.slug

    //Sets some cookies on the browser which turns on the preview mode.
    res.setPreviewData({})

    res.redirect(slug)
}