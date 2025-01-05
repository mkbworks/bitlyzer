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

    SET @Link = TRIM(@Link);
    SELECT @user_id = user_id FROM [bitlyzer].[users] WHERE api_key = @ApiKey;

    WHILE @Iterate = 1
    BEGIN
        DECLARE @RowCount INT;
        EXEC [bitlyzer].[spGenHash] @hash_value = @hash_value OUTPUT;
        SELECT @RowCount = COUNT(*) FROM [bitlyzer].[links] WHERE hash_value = @hash_value;
        IF @RowCount = 0
        BEGIN
            INSERT INTO [bitlyzer].[links] (user_id, hash_value, link) VALUES(@user_id, @hash_value, @Link);
            SET @Iterate = 0;
        END
    END
    
    SELECT @Link as 'Link', @hash_value AS 'Hash';
END