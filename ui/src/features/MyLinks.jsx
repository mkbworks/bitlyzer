import { useState, useEffect } from "react";
import PageHeading from "../components/PageHeading/PageHeading.jsx";
import Modal from "../components/Modal/Modal.jsx";
import LinkCard from "../components/LinkCard/LinkCard.jsx";
import Request from "../utils/request.js";
import { useAuth, useModal } from "../hooks";
import { PageContent, MyLinksContainer, SorryError } from "./features.styles.js";
import { HzLine } from "../styles/global.styles.js";

function MyLinks() {
    const { Email: CtxEmail, AccessKey:CtxAccessKey } = useAuth();
    const [cardData, setCardData] = useState([]);
    const { ModalState, ShowModal, HideModal } = useModal();

    useEffect(() => {
        let headers = {
            "x-apikey": CtxAccessKey,
            "x-email": CtxEmail
        };

        Request("/link/list", "GET", null, null, headers).then(response => {
            if(response.status === "success") {
                setCardData(response.data);
            } else {
                ShowModal("ErrorAlert", {
                    Message: `Error occurred while fetching all active links:`,
                    Code: response.data
                });
            }
        }).catch(err => {
            ShowModal("ErrorAlert", {
                Message: `Error occurred while fetching all active links:`,
                Code: `${err}`
            });
        })
    }, []);

    const handleDelete = async (alias) => {
        let headers = {
            "x-apikey": CtxAccessKey,
            "x-email": CtxEmail
        };

        try {
            let response = await Request(`/link/${alias}`, "DELETE", null, null, headers);
            if(response.status === "success") {
                setCardData(prev => {
                    let remainingItems = prev.filter(item => item.Alias !== "alias");
                    return remainingItems;
                });
                ShowModal("SuccessAlert", {
                    Message: `Deletion of link - "${alias}" was successful`,
                    Code: ""
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
                    <LinkCard data={cardElem} key={index} OnDelete={handleDelete} />
                ))}
            </MyLinksContainer>)}
            <Modal IsOpen={ModalState.isOpen} onClose={HideModal} Data={ModalState.data} Type={ModalState.type}></Modal>
        </PageContent>
    );
}

export default MyLinks;
