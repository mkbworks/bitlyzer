import PageHeading from "../components/PageHeading/PageHeading.jsx";
import { Text, Submit, Decimal, Select } from "../components/FormElements/index.js";
import Modal from "../components/Modal/Modal.jsx";
import Request from "../utils/request.js";
import { useAuth, useForm, useModal } from "../hooks";
import { PageContent } from "./features.styles.js";
import { HzLine } from "../styles/global.styles.js";

function ShortenUrl() {
    const { Email: CtxEmail, AccessKey:CtxAccessKey } = useAuth();
    const Actions = [
        { key: "", value: "Select one" },
        { key: "redirect", value: "Redirect" },
        { key: "mask", value: "Mask" }
    ];
    const urlStructure = {
        Target: "string",
        Alias: "string",
        Action: "string",
        Expiry: "number"
    };

    const { Alert, ShowErrorAlert, ShowSuccessAlert, HideAlert } = useModal();
    const url = useForm(urlStructure);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(!url.getFormValidity()) {
            ShowErrorAlert("One or more fields in the form are not valid.", "");
            return;
        }

        let urlData = {
            action: url.formState.Action.Value,
            target: url.formState.Target.Value,
            shortUrl: url.formState.Alias.Value,
            expiry: url.formState.Expiry.Value
        };
        let headers = {
            "Content-Type": "application/json",
            "x-apikey": CtxAccessKey,
            "x-email": CtxEmail
        };

        try {
            let response = await Request("/link/generate", "POST", urlData, null, headers);
            if(response.status === "success") {
                ShowSuccessAlert(`Short link has been generated and given below. The link will be valid for ${response.data.Expiry} day(s) from today.`, response.data.ShortUrl);
                url.handleFormReset();
            } else {
                ShowErrorAlert("Error occurred during link generation:", response.data.message);
            }
        } catch (err) {
            ShowErrorAlert("Error during link generation:", `${err}`);
        }
    };

    let modalData = {
        Type: Alert.type,
        Message: Alert.message,
        Code: Alert.data
    };

    return (
        <PageContent>
            <PageHeading Title="Shorten Url" ImagePath="/images/ShortenUrl.png">
                Easily convert long, cluttered URLs into clean, shareable short links with our simple URL shortener tool. Just paste your long URL into the form, customize the alias if you'd like, and click generate.
            </PageHeading>
            <HzLine />
            <form className="form" onSubmit={handleSubmit}>
                <Text Name="Target" Label="Paste your long URL here!" Value={url.formState.Target.Value} Placeholder="Long URL to be masked or redirected to" OnChange={(value, validity) => url.handleFormChange("Target", value, validity)} Pattern="^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$" resetForm={url.formReset} Required />
                <Text Name="Alias" Label="Define a custom short URL!" Value={url.formState.Alias.Value} Placeholder="Enter a short URL of your own" OnChange={(value, validity) => url.handleFormChange("Alias", value, validity)} resetForm={url.formReset} />
                <Select Name="Action" Label="What action is to be taken when URL is requested?" Value={url.formState.Action.Value} Options={Actions} OnChange={(value, validity) => url.handleFormChange("Action", value, validity)} resetForm={url.formReset} Required />
                <Decimal Name="Expiry" Label="How long should the URL be valid?" Placeholder="Number of days till expiry" Value={url.formState.Expiry.Value} OnChange={(value, validity) => url.handleFormChange("Expiry", value, validity)} Min={0} resetForm={url.formReset} />
                <Submit Disabled={!url.getFormValidity()}>Generate</Submit>
            </form>
            <Modal IsOpen={Alert.isOpen} onClose={HideAlert} Data={modalData}></Modal>
        </PageContent>
    );
}

export default ShortenUrl;
