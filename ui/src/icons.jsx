import CompressIcon from "./assets/icons/compress-icon.svg?react";
import LinkIcon from "./assets/icons/link-icon.svg?react";
import NewUserIcon from "./assets/icons/new-user.svg?react";

const GetIconByKey = (key) => {
    if(key === "Compress") {
        return CompressIcon;
    } else if (key === "Link") {
        return LinkIcon;
    } else if (key === "NewUser") {
        return NewUserIcon;
    }
};

export { GetIconByKey };
