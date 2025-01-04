-- SQL stored procedure to generate a random API Key.
CREATE PROCEDURE [bitlyzer].[spGenApiKey](
    @ApiKey NVARCHAR(50) OUTPUT
)
AS
BEGIN
    DECLARE @CharacterSet NVARCHAR(36) = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    DECLARE @RandomNum INT;

    SET @ApiKey = '';
    WHILE LEN(@Apikey) < 50
    BEGIN
        SET @RandomNum = (ABS(CHECKSUM(NEWID())) % 36) + 1;
        SET @ApiKey = @ApiKey + SUBSTRING(@CharacterSet, @RandomNum, 1);
    END
    SET @ApiKey = LEFT(@ApiKey, 50);
END