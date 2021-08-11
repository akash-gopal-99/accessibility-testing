function urlToFilename(url) {
    let domain = (new URL(url));
    let hostname = domain.hostname;
    let pathname = domain.pathname;

    let filename = hostname.replace('www.','').replace('.com', '').replace('.co.uk', '').replace('.de', '');

    // if there is a path
    if(pathname !== '/') {
        filename += pathname.split('/').join('-');
    }

    return filename;
}

module.exports = {
    urlToFilename
}