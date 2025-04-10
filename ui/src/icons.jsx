import CompressIcon from "./assets/icons/compress-icon.svg?react";
import LinkIcon from "./assets/icons/link-icon.svg?react";
import NewUserIcon from "./assets/icons/new-user.svg?react";
import LoginUserIcon from "./assets/icons/login-icon.svg?react";

const GetIconByKey = (key) => {
    key = key.trim().toLowerCase();
    if(key === "compress") {
        return CompressIcon;
    } else if (key === "link") {
        return LinkIcon;
    } else if (key === "newuser") {
        return NewUserIcon;
    } else if (key === "login") {
        return LoginUserIcon;
    }
};

export { GetIconByKey };
