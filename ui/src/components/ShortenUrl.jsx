import PageHeading from "./PageHeading/PageHeading.jsx";

function ShortenUrl() {
    return (
        <>
            <PageHeading Title="Shorten Url" IconKey="Compress">
                Easily convert long, cluttered URLs into clean, shareable short links with our simple URL shortener tool. Just paste your long URL into the form, customize the alias if you'd like, and click generate.
            </PageHeading>
            <hr />
            <form className="form">
                <div className="form-control">
                    <label className="form-label form-label-resp" htmlFor="Target" >Paste your long  URL here!</label>
                    <input type="text" id="Target" className="form-input" placeholder="Long URL to be masked or redirected to" />
                </div>
                <div className="form-control">
                    <label className="form-label form-label-resp" htmlFor="Alias">Define a custom short URL!</label>
                    <input type="text" id="Alias" className="form-input" placeholder="Enter a short URL of your own" />
                </div>
                <div className="form-control">
                    <label className="form-label form-label-resp" htmlFor="Action">What action is to be taken when URL is requested?</label>
                    <select className="form-select" id="Action">
                        <option>Select one</option>
                        <option value="redirect">Redirect</option>
                        <option value="mask">Mask</option>
                    </select>
                </div>
                <div className="form-control">
                    <label className="form-label form-label-resp" htmlFor="Expiry">How long should the URL be valid?</label>
                    <input type="number" id="Expiry" className="form-number" placeholder="Number of days till expiry" />
                </div>
                <div className="form-control">
                    <button type="button" className="btn-submit">Generate</button>
                </div>
            </form>
        </>
    );
}

export default ShortenUrl;
