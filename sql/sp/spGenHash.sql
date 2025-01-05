-- SQL stored procedure to generate a random hash value.
CREATE PROCEDURE [bitlyzer].[spGenHash](
    @hash_value NVARCHAR(10) OUTPUT
)
AS
BEGIN
    DECLARE @CharacterSet NVARCHAR(50) = '0123456789abcdefghijklmnopqrstuvwxyz';
    DECLARE @RandomNum INT;
    DECLARE @CharsetLen INT = LEN(@CharacterSet);

    SET @hash_value = '';
    WHILE LEN(@hash_value) < 10
    BEGIN
        SET @RandomNum = (ABS(CHECKSUM(NEWID())) % @CharsetLen) + 1;
        SET @hash_value = @hash_value + SUBSTRING(@CharacterSet, @RandomNum, 1);
    END
    SET @hash_value = LEFT(@hash_value, 10);
END