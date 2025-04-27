import { PageTitle, PageLogo, StyledPageHeading, PageTitleSection, PageDescription } from "./PageHeading.styles.js";

function PageHeading({ Title, ImagePath, children }) {
    return (
        <StyledPageHeading>
            <PageTitleSection>
                <PageLogo src={ImagePath} alt={`Logo for ${Title}`} />
                <PageTitle>{Title}</PageTitle>
            </PageTitleSection>
            <PageDescription>
                {children}
            </PageDescription>
        </StyledPageHeading>
    );
}

export default PageHeading;
