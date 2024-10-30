BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Staff] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [idcard] NVARCHAR(1000) NOT NULL,
    [phone] NVARCHAR(1000) NOT NULL,
    [password] NVARCHAR(1000) NOT NULL,
    [role] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Staff_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[OrderItem] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [productId] BIGINT NOT NULL,
    [quantity] BIGINT NOT NULL,
    [price] FLOAT(53) NOT NULL,
    [orderId] BIGINT NOT NULL,
    CONSTRAINT [OrderItem_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[SupplyItem] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [ingredientId] BIGINT NOT NULL,
    [supplyId] BIGINT NOT NULL,
    [quantity] INT NOT NULL,
    [totalPrice] FLOAT(53) NOT NULL,
    CONSTRAINT [SupplyItem_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Recipe] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [productId] BIGINT NOT NULL,
    [ingredientId] BIGINT NOT NULL,
    [quantity] BIGINT NOT NULL,
    CONSTRAINT [Recipe_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Supply] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [staffId] BIGINT NOT NULL,
    [supplyDate] DATETIME2 NOT NULL,
    [totalPrice] FLOAT(53) NOT NULL,
    CONSTRAINT [Supply_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Product] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [price] FLOAT(53) NOT NULL,
    CONSTRAINT [Product_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[ShoppingCart] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [userId] BIGINT NOT NULL,
    CONSTRAINT [ShoppingCart_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Inventory] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    CONSTRAINT [Inventory_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Ingredient] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [unit] NVARCHAR(1000) NOT NULL,
    [price] FLOAT(53) NOT NULL,
    [toppingPrice] FLOAT(53) NOT NULL,
    [inventoryId] BIGINT NOT NULL,
    CONSTRAINT [Ingredient_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Order] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [shippingAddress] NVARCHAR(1000) NOT NULL,
    [userId] BIGINT NOT NULL,
    [totalPrice] FLOAT(53) NOT NULL,
    [orderDate] DATETIME2 NOT NULL,
    [orderType] NVARCHAR(1000) NOT NULL,
    [staffId] BIGINT,
    CONSTRAINT [Order_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[InventoryTransaction] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [ingredientId] BIGINT NOT NULL,
    [stockType] NVARCHAR(1000) NOT NULL,
    [quantity] INT NOT NULL,
    [transactionDate] DATETIME2 NOT NULL,
    CONSTRAINT [InventoryTransaction_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Topping] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [ingredientId] BIGINT NOT NULL,
    [quantity] INT NOT NULL,
    [price] FLOAT(53) NOT NULL,
    [orderId] BIGINT NOT NULL,
    CONSTRAINT [Topping_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[ShoppingCartItem] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [shoppingCartId] BIGINT NOT NULL,
    [productId] BIGINT NOT NULL,
    CONSTRAINT [ShoppingCartItem_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[User] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [idcard] NVARCHAR(1000) NOT NULL,
    [phone] NVARCHAR(1000) NOT NULL,
    [password] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [User_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[ShippingAddress] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [userId] BIGINT NOT NULL,
    [street] NVARCHAR(1000) NOT NULL,
    [district] NVARCHAR(1000) NOT NULL,
    [city] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [ShippingAddress_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[OrderItem] ADD CONSTRAINT [OrderItem_productId_fkey] FOREIGN KEY ([productId]) REFERENCES [dbo].[Product]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[OrderItem] ADD CONSTRAINT [OrderItem_orderId_fkey] FOREIGN KEY ([orderId]) REFERENCES [dbo].[Order]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[SupplyItem] ADD CONSTRAINT [SupplyItem_ingredientId_fkey] FOREIGN KEY ([ingredientId]) REFERENCES [dbo].[Ingredient]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[SupplyItem] ADD CONSTRAINT [SupplyItem_supplyId_fkey] FOREIGN KEY ([supplyId]) REFERENCES [dbo].[Supply]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Recipe] ADD CONSTRAINT [Recipe_productId_fkey] FOREIGN KEY ([productId]) REFERENCES [dbo].[Product]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Recipe] ADD CONSTRAINT [Recipe_ingredientId_fkey] FOREIGN KEY ([ingredientId]) REFERENCES [dbo].[Ingredient]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Supply] ADD CONSTRAINT [Supply_staffId_fkey] FOREIGN KEY ([staffId]) REFERENCES [dbo].[Staff]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ShoppingCart] ADD CONSTRAINT [ShoppingCart_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Ingredient] ADD CONSTRAINT [Ingredient_inventoryId_fkey] FOREIGN KEY ([inventoryId]) REFERENCES [dbo].[Inventory]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Order] ADD CONSTRAINT [Order_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Order] ADD CONSTRAINT [Order_staffId_fkey] FOREIGN KEY ([staffId]) REFERENCES [dbo].[Staff]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[InventoryTransaction] ADD CONSTRAINT [InventoryTransaction_ingredientId_fkey] FOREIGN KEY ([ingredientId]) REFERENCES [dbo].[Ingredient]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Topping] ADD CONSTRAINT [Topping_ingredientId_fkey] FOREIGN KEY ([ingredientId]) REFERENCES [dbo].[Ingredient]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Topping] ADD CONSTRAINT [Topping_orderId_fkey] FOREIGN KEY ([orderId]) REFERENCES [dbo].[Order]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ShoppingCartItem] ADD CONSTRAINT [ShoppingCartItem_shoppingCartId_fkey] FOREIGN KEY ([shoppingCartId]) REFERENCES [dbo].[ShoppingCart]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ShoppingCartItem] ADD CONSTRAINT [ShoppingCartItem_productId_fkey] FOREIGN KEY ([productId]) REFERENCES [dbo].[Product]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ShippingAddress] ADD CONSTRAINT [ShippingAddress_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
