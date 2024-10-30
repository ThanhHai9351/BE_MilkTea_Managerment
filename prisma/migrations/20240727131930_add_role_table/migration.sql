BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Role] (
    [name] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Role_pkey] PRIMARY KEY CLUSTERED ([name])
);

-- CreateTable
CREATE TABLE [dbo].[Endpoint] (
    [id] INT NOT NULL IDENTITY(1,1),
    [url] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Endpoint_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[UserRole] (
    [userId] INT NOT NULL,
    [roleName] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [UserRole_pkey] PRIMARY KEY CLUSTERED ([userId],[roleName])
);

-- CreateTable
CREATE TABLE [dbo].[GrantPermission] (
    [roleName] NVARCHAR(1000) NOT NULL,
    [endpointId] INT NOT NULL,
    CONSTRAINT [GrantPermission_pkey] PRIMARY KEY CLUSTERED ([roleName],[endpointId])
);

-- AddForeignKey
ALTER TABLE [dbo].[UserRole] ADD CONSTRAINT [UserRole_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[UserRole] ADD CONSTRAINT [UserRole_roleName_fkey] FOREIGN KEY ([roleName]) REFERENCES [dbo].[Role]([name]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[GrantPermission] ADD CONSTRAINT [GrantPermission_roleName_fkey] FOREIGN KEY ([roleName]) REFERENCES [dbo].[Role]([name]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[GrantPermission] ADD CONSTRAINT [GrantPermission_endpointId_fkey] FOREIGN KEY ([endpointId]) REFERENCES [dbo].[Endpoint]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
