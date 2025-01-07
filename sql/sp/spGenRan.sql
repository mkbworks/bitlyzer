-- SQL stored procedure to generate a random value of given length.
CREATE PROCEDURE [bitlyzer].[spGenRan](
    @CharacterSet NVARCHAR(255),
    @KeyLength INT,
    @RandomStr NVARCHAR(255) OUTPUT
)
AS
BEGIN
    DECLARE @RandomNum INT;
    DECLARE @CharsetLen INT = LEN(@CharacterSet);

    SET @RandomStr = '';
    WHILE LEN(@RandomStr) < @KeyLength
    BEGIN
        SET @RandomNum = (ABS(CHECKSUM(NEWID())) % @CharsetLen) + 1;
        SET @RandomStr = @RandomStr + SUBSTRING(@CharacterSet, @RandomNum, 1);
    END
    SET @RandomStr = LEFT(@RandomStr, @KeyLength);
END