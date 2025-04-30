import { useState, useEffect } from "react";
import PageHeading from "../components/PageHeading/PageHeading.jsx";
import Modal from "../components/Modal/Modal.jsx";
import LinkCard from "../components/LinkCard/LinkCard.jsx";
import Request from "../utils/request.js";
import { useAuth, useModal, useForm } from "../hooks";
import { PageContent, MyLinksContainer, SorryError } from "./features.styles.js";
import { HzLine } from "../styles/global.styles.js";
import { Decimal, Submit } from "../components/FormElements";

function MyLinks() {
    const { Email: CtxEmail, AccessKey:CtxAccessKey } = useAuth();
    const [cardData, setCardData] = useState([]);
    const { ModalState, ShowModal, HideModal } = useModal();
    const updateExpiry = useForm({ expiry: "number" });

    const SetLinksFromServer = async () => {
        let headers = {
            "x-apikey": CtxAccessKey,
            "x-email": CtxEmail
        };

        try {
            let response = await Request("/link/list", "GET", null, null, headers);
            if(response.status === "success") {
                setCardData(response.data);
            } else {
                ShowModal("ErrorAlert", {
                    Message: `Error occurred while fetching all active links:`,
                    Code: response.data
                });
            }
        } catch(err) {
            ShowModal("ErrorAlert", {
                Message: `Error occurred while fetching all active links:`,
                Code: `${err}`
            });
        }
    };

    useEffect(() => {
        SetLinksFromServer();
    }, []);

    const handleDelete = async (alias) => {
        let headers = {
            "x-apikey": CtxAccessKey,
            "x-email": CtxEmail
        };

        try {
            let response = await Request(`/link/${alias}`, "DELETE", null, null, headers);
            if(response.status === "success") {
                setCardData(prev => prev.filter(item => item.Alias !== alias));
                ShowModal("SuccessAlert", {
                    Message: `Deletion of below link was successful`,
                    Code: alias
                });
            } else {
                ShowModal("ErrorAlert", {
                    Message: `Error occurred while deleting link - ${alias}:`,
                    Code: response.data
                });
            }
        } catch (err) {
            ShowModal("ErrorAlert", {
                Message: `Error occurred while deleting link - ${alias}:`,
                Code: `${err}`
            });
        }
    };

    const showUpdateWindow = (alias) => {
        ShowModal("Custom", { alias });
    };

    const persistUpdate = async (event) => {
        event.preventDefault();
        if(!updateExpiry.getFormValidity()) {
            ShowModal("ErrorAlert", {
                Message: "The expiry value entered is not valid.",
                Code: ""
            });
            return;
        }

        try {
            let headers = {
                "x-apikey": CtxAccessKey,
                "x-email": CtxEmail
            };
            let data = {
                expiry: updateExpiry.formState.expiry.Value
            };
            const alias = ModalState.data.alias;
            let response = await Request(`/link/${alias}`, "PATCH", data, null, headers)
            if(response.status === "success") {
                await SetLinksFromServer();
                updateExpiry.handleFormReset();
                HideModal();
            } else {
                ShowModal("ErrorAlert", {
                    Message: `Error occurred while updating link expiry for '${alias}':`,
                    Code: response.data
                });
            }
        } catch (err) {
            ShowModal("ErrorAlert", {
                Message: `Error occurred while updating link expiry for '${alias}':`,
                Code: `${err}`
            });
        }
    };

    return (
        <PageContent>
            <PageHeading Title="My Links" ImagePath="/images/MyLinks.png">
                Manage all your active links in one place. Modify link action or alias quickly and easily.
            </PageHeading>
            <HzLine />
            {cardData.length === 0 && <SorryError>Sorry, there are no active links available at the moment!</SorryError>}
            {cardData.length !== 0 &&
            (<MyLinksContainer>
                {cardData.map((cardElem, index) => (
                    <LinkCard data={cardElem} key={index} OnDelete={handleDelete} OnUpdate={showUpdateWindow} />
                ))}
            </MyLinksContainer>)}
            <Modal IsOpen={ModalState.isOpen} onClose={HideModal} Data={ModalState.data} Type={ModalState.type}>
                <h1>Edit "{ModalState.data.alias || ""}"</h1>
                <form className="form" onSubmit={persistUpdate}>
                    <Decimal Name="expiry" Label="How long should the URL be valid now?" Placeholder="Number of days till expiry" Value={updateExpiry.formState.expiry.Value} OnChange={(value, validity) => updateExpiry.handleFormChange("expiry", value, validity)} Min={0} resetForm={updateExpiry.formReset} />
                    <Submit Disabled={!updateExpiry.getFormValidity()}>Update</Submit>
                </form>
            </Modal>
        </PageContent>
    );
}

export default MyLinks;
