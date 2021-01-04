export default async function exit(_, res) {
    res.clearPreviewData();
    res.redirect('/');
    res.end();
}
