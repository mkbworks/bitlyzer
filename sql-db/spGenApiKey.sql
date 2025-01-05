-- SQL stored procedure to generate a random API Key.
CREATE PROCEDURE [bitlyzer].[spGenApiKey](
    @ApiKey NVARCHAR(50) OUTPUT
)
AS
BEGIN
    DECLARE @CharacterSet NVARCHAR(50) = '0123456789abcdefghijklmnopqrstuvwxyz+-_#$@^!';
    DECLARE @RandomNum INT;
    DECLARE @CharsetLen INT = LEN(@CharacterSet);

    SET @ApiKey = '';
    WHILE LEN(@Apikey) < 50
    BEGIN
        SET @RandomNum = (ABS(CHECKSUM(NEWID())) % @CharsetLen) + 1;
        SET @ApiKey = @ApiKey + SUBSTRING(@CharacterSet, @RandomNum, 1);
    END
    SET @ApiKey = LEFT(@ApiKey, 50);
END