import { useState } from "react";
import PageHeading from "./PageHeading/PageHeading.jsx";
import { Text, Submit, Decimal, Select } from "./FormElements";
import Modal from "./Modal/Modal.jsx";
import { Request } from "../utilities.js";
import { useAuth } from "../store/AuthContext.jsx";

function ShortenUrl() {
    const { Email: CtxEmail, AccessKey:CtxAccessKey } = useAuth();
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
    const initialUrlState = {
        Target: "",
        Alias: "",
        Action: "",
        Expiry: 0
    };
    const initialValidityState = {
        Target: false,
        Alias: false,
        Action: false,
        Expiry: false
    };
    const initialAlertState = {
        isOpen: false,
        type: "success",
        message: "A modal with specific content will appear here!",
        data: ""
    };

    const [url, setUrl] = useState(initialUrlState);
    const [urlValidity, setUrlValidity] = useState(initialValidityState);
    const [alertModal, setAlertModal] = useState(initialAlertState);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(!urlValidity.Action || !urlValidity.Target || !urlValidity.Alias || !urlValidity.Expiry) {
            setAlertModal({
                isOpen: true,
                type: "error",
                message: "One or more fields in the form are not valid",
                data: ""
            });
            return;
        }

        let urlData = {
            action: url.Action,
            target: url.Target,
            shortUrl: url.Alias,
            expiry: url.Expiry
        };
        let headers = {
            "Content-Type": "application/json",
            "x-apikey": CtxAccessKey,
            "x-email": CtxEmail
        };

        try {
            let response = await Request("/link/generate", "POST", urlData, null, headers);
            if(response.status === "success") {
                setAlertModal({
                    isOpen: true,
                    type: "success",
                    message: `Short link has been generated and given below. The link will be valid for ${response.data.Expiry} day(s) from today.`,
                    data: response.data.ShortUrl
                });
                setUrl(initialUrlState);
                setUrlValidity(initialValidityState);
            } else {
                setAlertModal({
                    isOpen: true,
                    type: "error",
                    message: "Error occurred during link generation:",
                    data: response.data.message
                });
            }
        } catch (err) {
            setAlertModal({
                isOpen: true,
                type: "error",
                message: "Error during link generation:",
                data: Response.data.message
            });
        }
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

    let modalContent = (
        <>
            {alertModal.type === "success" && <h1>&#9989; Success!</h1>}
            {alertModal.type === "error" && <h1>&#10060; Error!</h1>}
            <p>{alertModal.message}</p>
            {alertModal.data !== "" && <code>{alertModal.data}</code>}
        </>
    );

    return (
        <>
            <PageHeading Title="Shorten Url" ImagePath="/images/ShortenUrl.png">
                Easily convert long, cluttered URLs into clean, shareable short links with our simple URL shortener tool. Just paste your long URL into the form, customize the alias if you'd like, and click generate.
            </PageHeading>
            <hr />
            <form className="form" onSubmit={handleSubmit}>
                <Text Name="Target" Label="Paste your long URL here!" Value={url.Target} Placeholder="Long URL to be masked or redirected to" OnChange={(value) => handleChange("Target", value)} UpdateValidity={(value) => updateValidity("Target", value)} Pattern="^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$" Required />
                <Text Name="Alias" Label="Define a custom short URL!" Value={url.Alias} Placeholder="Enter a short URL of your own" OnChange={(value) => handleChange("Alias", value)} UpdateValidity={(value) => updateValidity("Alias", value)} />
                <Select Name="Action" Label="What action is to be taken when URL is requested?" Value={url.Action} Options={Actions} OnChange={(value) => handleChange("Action", value)} UpdateValidity={(value) => updateValidity("Action", value)} Required />
                <Decimal Name="Expiry" Label="How long should the URL be valid?" Placeholder="Number of days till expiry" Value={url.Expiry} OnChange={(value) => handleChange("Expiry", value)} UpdateValidity={(value) => updateValidity("Expiry", value)} Min={0} />
                <Submit Disabled={!urlValidity.Action || !urlValidity.Target || !urlValidity.Alias || !urlValidity.Expiry}>Generate</Submit>
            </form>
            <Modal IsOpen={alertModal.isOpen} inClose={() => setAlertModal(initialAlertState)}>
                {modalContent}
            </Modal>
        </>
    );
}

export default ShortenUrl;
