-- Stored procedure to insert a new user record in the users table.
CREATE PROCEDURE [bitlyzer].[spNewUser] (
    @Email NVARCHAR(255),
    @Name NVARCHAR(255)
)
AS
BEGIN
    SET NOCOUNT ON;
    SET @Email = TRIM(@Email);
    SET @Name = TRIM(@Name);
    DECLARE @Iterate INT = 1;
    DECLARE @Key NVARCHAR(50);
    WHILE @Iterate = 1
    BEGIN
        DECLARE @RowCount INT;
        EXEC [bitlyzer].[spGenApiKey] @ApiKey = @Key OUTPUT;
        SELECT @RowCount = COUNT(*) FROM [bitlyzer].[users] WHERE api_key = @Key;
        IF @RowCount = 0
        BEGIN
            INSERT INTO [bitlyzer].[users](name, email, api_key) VALUES(@Name, @Email, @Key);
            SET @Iterate = 0;
        END
    END
    SELECT @Key AS 'ApiKey', @Email as 'Email', @Name as 'Name';
END