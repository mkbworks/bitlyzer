import { useState } from "react";
import PageHeading from "./PageHeading/PageHeading.jsx";
import { Text, Submit, Decimal, Select } from "./FormElements";
import Modal from "./Modal/Modal.jsx";
import { Request } from "../utilities.js";
import { useAuth } from "../store/AuthContext.jsx";

function ShortenUrl() {
    const { Email: CtxEmail, AccessKey:CtxAccessKey } = useAuth();
    const Actions = [
        { key: "", value: "Select one" },
        { key: "redirect", value: "Redirect" },
        { key: "mask", value: "Mask" }
    ];
    const defaultUrlState = {
        Target: {
            Value: "",
            Validity: false,
        },
        Alias: {
            Value: "",
            Validity: false,
        },
        Action: {
            Value: "",
            Validity: false,
        },
        Expiry: {
            Value: 0,
            Validity: false,
        }
    };
    const initialAlertState = {
        isOpen: false,
        type: "success",
        message: "A modal with specific content will appear here!",
        data: ""
    };

    const [url, setUrl] = useState(defaultUrlState);
    const [resetForm, setResetForm] = useState(false);
    const [alertModal, setAlertModal] = useState(initialAlertState);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(!url.Action.Validity || !url.Target.Validity || !url.Alias.Validity || !url.Expiry.Validity) {
            setAlertModal({
                isOpen: true,
                type: "error",
                message: "One or more fields in the form are not valid",
                data: ""
            });
            return;
        }

        let urlData = {
            action: url.Action.Value,
            target: url.Target.Value,
            shortUrl: url.Alias.Value,
            expiry: url.Expiry.Value
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
                setUrl(defaultUrlState);
                setResetForm(true);
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

    const handleChange = (name, value, validity) => {
        setUrl(prev => ({
            ...prev,
            [name]: {
                Value: value,
                Validity: validity
            }
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
                <Text Name="Target" Label="Paste your long URL here!" Value={url.Target} Placeholder="Long URL to be masked or redirected to" OnChange={(value, validity) => handleChange("Target", value, validity)} Pattern="^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$" resetForm={resetForm} Required />
                <Text Name="Alias" Label="Define a custom short URL!" Value={url.Alias} Placeholder="Enter a short URL of your own" OnChange={(value, validity) => handleChange("Alias", value, validity)} resetForm={resetForm} />
                <Select Name="Action" Label="What action is to be taken when URL is requested?" Value={url.Action} Options={Actions} OnChange={(value, validity) => handleChange("Action", value, validity)} resetForm={resetForm} Required />
                <Decimal Name="Expiry" Label="How long should the URL be valid?" Placeholder="Number of days till expiry" Value={url.Expiry} OnChange={(value, validity) => handleChange("Expiry", value, validity)} Min={0} resetForm={resetForm} />
                <Submit Disabled={!url.Action.Validity || !url.Target.Validity || !url.Alias.Validity || !url.Expiry.Validity}>Generate</Submit>
            </form>
            <Modal IsOpen={alertModal.isOpen} inClose={() => setAlertModal(initialAlertState)}>
                {modalContent}
            </Modal>
        </>
    );
}

export default ShortenUrl;
