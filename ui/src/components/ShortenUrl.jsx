import { useState } from "react";
import PageHeading from "./PageHeading/PageHeading.jsx";
import { Text, Submit, Decimal, Select } from "./FormElements";

function ShortenUrl() {
    const Actions = [{
        key: "",
        value: "Select one"
    }, {
        key: "redirect",
        value: "Redirect"
    }, {
        key: "mask",
        value: "Mask"
    }];

    const [url, setUrl] = useState({
        Target: "",
        Alias: "",
        Action: "",
        Expiry: 0
    });

    const [urlValidity, setUrlValidity] = useState({
        Target: false,
        Alias: false,
        Action: false,
        Expiry: false
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        if(!urlValidity.Action || !urlValidity.Target || !urlValidity.Alias || !urlValidity.Expiry) {
            console.log("Some fields do not contain valid values!");
            return;
        }

        console.log("URL details: ", url);
    };

    const updateValidity = (name, value) => {
        setUrlValidity(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleChange = (name, value) => {
        setUrl(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <>
            <PageHeading Title="Shorten Url" ImagePath="/images/ShortenUrl.png">
                Easily convert long, cluttered URLs into clean, shareable short links with our simple URL shortener tool. Just paste your long URL into the form, customize the alias if you'd like, and click generate.
            </PageHeading>
            <hr />
            <form className="form" onSubmit={handleSubmit}>
                <Text Name="Target" Label="Paste your long URL here!" Value={url.Target} Placeholder="Long URL to be masked or redirected to" OnChange={(value) => handleChange("Target", value)} UpdateValidity={(value) => updateValidity("Target", value)} Pattern="^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$" Required />
                <Text Name="Alias" Label="Define a custom short URL!" Value={url.Alias} Placeholder="Enter a short URL of your own" OnChange={(value) => handleChange("Alias", value)} UpdateValidity={(value) => updateValidity("Alias", value)} Required />
                <Select Name="Action" Label="What action is to be taken when URL is requested?" Value={url.Action} Options={Actions} OnChange={(value) => handleChange("Action", value)} UpdateValidity={(value) => updateValidity("Action", value)} Required />
                <Decimal Name="Expiry" Label="How long should the URL be valid?" Placeholder="Number of days till expiry" Value={url.Expiry} OnChange={(value) => handleChange("Expiry", value)} UpdateValidity={(value) => updateValidity("Expiry", value)} Min={0} />
                <Submit Disabled={!urlValidity.Action || !urlValidity.Target || !urlValidity.Alias || !urlValidity.Expiry}>Generate</Submit>
            </form>
        </>
    );
}

export default ShortenUrl;
