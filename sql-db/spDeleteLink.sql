-- Stored Procedure to delete a link from the links table.
CREATE PROCEDURE [bitlyzer].[spDeleteLink] (
    @hash_value NVARCHAR(10),
    @ApiKey NVARCHAR(50),
    @RowsAffected INT OUTPUT
)
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @user_id INT;

    SELECT @user_id = user_id FROM [bitlyzer].[users] WHERE api_key = @ApiKey;
    DELETE FROM [bitlyzer].[links] WHERE user_id = @user_id AND hash_value = @hash_value;
    SET @RowsAffected = @@ROWCOUNT;
END