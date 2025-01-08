-- Stored procedure to insert a new record in the links table.
CREATE PROCEDURE [bitlyzer].[spNewLink] (
    @Link NVARCHAR(255),
    @ApiKey NVARCHAR(255)
)
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @user_id INT;
    DECLARE @hash_value NVARCHAR(10);
    DECLARE @Iterate INT = 1;
    DECLARE @CharacterSet NVARCHAR(255) = '0123456789abcdefghijklmnopqrstuvwxyz';
    DECLARE @RowCount INT;

    SET @Link = TRIM(@Link);
    SELECT @user_id = user_id FROM [bitlyzer].[users] WHERE api_key = @ApiKey;
    SELECT @RowCount = COUNT(*) FROM [bitlyzer].[links] WHERE user_id = @user_id AND link = @Link;
    IF @RowCount > 0
    BEGIN
        RAISERROR('ERR_LINK_EXISTS', 16, 1);
    END
    ELSE
    BEGIN
        WHILE @Iterate = 1
        BEGIN
            EXEC [bitlyzer].[spGenRan] @CharacterSet = @CharacterSet, @KeyLength = 10, @RandomStr = @hash_value OUTPUT;
            SELECT @RowCount = COUNT(*) FROM [bitlyzer].[links] WHERE hash_value = @hash_value;
            IF @RowCount = 0
            BEGIN
                INSERT INTO [bitlyzer].[links] (user_id, hash_value, link) VALUES(@user_id, @hash_value, @Link);
                SET @Iterate = 0;
            END
        END
        SELECT @Link as 'Link', @hash_value AS 'Hash';
    END
END