import { StyledLinkCard, ActionButton, LinkCardHeader, LinkCardBody } from "./LinkCard.styles.js";

function LinkCard({ data, OnDelete }) {
    return (
        <StyledLinkCard>
            <LinkCardHeader>
                <ActionButton>Edit</ActionButton>
                <ActionButton onClick={() => OnDelete(data.Alias)}>Delete</ActionButton>
            </LinkCardHeader>
            <LinkCardBody>
                <a href={data.ShortUrl} target="_blank" className="link-card-alias">{data.Alias}</a>
                <p className="link-card-expiry">Expires in {data.DaysToExpiry} day(s).</p>
                <p className="link-card-action">{data.Action}</p>
            </LinkCardBody>
        </StyledLinkCard>
    );
}

export default LinkCard;
