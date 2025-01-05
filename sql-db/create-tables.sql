-- This file contains all the tables and constraints needed for setting up the SQL database structure.
CREATE TABLE [bitlyzer].[users] (
    user_id int not null identity(10000, 1),
    email nvarchar(255) not null,
    name nvarchar(255) not null,
    api_key nvarchar(255) not null
)
GO
ALTER TABLE [bitlyzer].[users] ADD CONSTRAINT PK_Users PRIMARY KEY CLUSTERED(user_id)
GO
ALTER TABLE [bitlyzer].[users] ADD CONSTRAINT Uniq_Key UNIQUE(api_key)
GO
CREATE TABLE [bitlyzer].[links] (
    user_id int not null,
    hash_value nvarchar(255) not null,
    link nvarchar(255) not null
)
GO
ALTER TABLE [bitlyzer].[links] ADD CONSTRAINT PK_links PRIMARY KEY CLUSTERED (user_id, hash_value)
GO
ALTER TABLE [bitlyzer].[links] ADD CONSTRAINT FK_links FOREIGN KEY(user_id) REFERENCES [bitlyzer].[users](user_id)
GO
ALTER TABLE [bitlyzer].[links] ADD CONSTRAINT Uniq_hash UNIQUE(hash_value)
GO