-- Stored procedure to insert a new record in the users table.
CREATE PROCEDURE [bitlyzer].[spNewUser] (
    @Email NVARCHAR(255),
    @Name NVARCHAR(255)
)
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @Iterate INT = 1;
    DECLARE @Key NVARCHAR(50);
    DECLARE @CharacterSet NVARCHAR(255) = '0123456789abcdefghijklmnopqrstuvwxyz+-_#$@^!';
    DECLARE @RowCount INT;

    SET @Email = TRIM(@Email);
    SET @Name = TRIM(@Name);
    SELECT @RowCount = COUNT(*) FROM [bitlyzer].[users] WHERE email = @Email;
    IF @RowCount > 0
    BEGIN
        RAISERROR('ERR_USR_EXISTS', 16, 1);
    END
    ELSE
    BEGIN
        WHILE @Iterate = 1
        BEGIN
            EXEC [bitlyzer].[spGenRan] @CharacterSet = @CharacterSet, @KeyLength = 50, @RandomStr = @Key OUTPUT;
            SELECT @RowCount = COUNT(*) FROM [bitlyzer].[users] WHERE api_key = @Key;
            IF @RowCount = 0
            BEGIN
                INSERT INTO [bitlyzer].[users](name, email, api_key) VALUES(@Name, @Email, @Key);
                SET @Iterate = 0;
            END
        END
        SELECT @Key AS 'ApiKey', @Email as 'Email', @Name as 'Name';
    END
END