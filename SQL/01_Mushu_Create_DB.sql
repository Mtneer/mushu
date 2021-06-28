USE [Mushu];
GO

set identity_insert [UserType] on
insert into [UserType] ([ID], [Name]) VALUES (1, 'Admin'), (2, 'User');
set identity_insert [UserType] off

set identity_insert [Category] on
insert into [Category] ([Id], [Name]) 
values (1, 'Restaurants'), (2, 'Gasoline'), (3, 'Entertainment'), (4, 'Charity'), (5, 'Merchandise'),
01_Mushu_Create_DB.sql    (6, 'Fees'), (7, 'Travel'), (8, 'Home Improvement'), (9, 'Automotive'), (10, 'Groceries'), 
01_Mushu_Create_DB.sql    (11,'Health and Beauty'), (12, 'Water Bill'), (13, 'Internet'), (14, 'Electric Bill'), 
01_Mushu_Create_DB.sql    (15, 'Gas Bill'), (16, 'Investments')   
set identity_insert [Category] off

set identity_insert [UserProfile] on
insert into UserProfile (Id, Email, CreateDateTime, UserTypeId, FirebaseUserId) values (1, 'admin@admin.com', '2020-04-23', 1, '9uDAqHUJvDZzVKccDpassb3yKdo2');
insert into UserProfile (Id, Email, CreateDateTime, UserTypeId, FirebaseUserId) values (2, 'test@test.com', '2020-04-23', 2, 'cKsmIkhu52X4HmdSgpQnBROmejw1');
set identity_insert [UserProfile] off


USE [master]

IF db_id('Mushu') IS NULl
  CREATE DATABASE [Mushu]
GO

USE [Mushu]
GO

DROP TABLE IF EXISTS [Account];
DROP TABLE IF EXISTS [AccountType];
DROP TABLE IF EXISTS [Budget];
DROP TABLE IF EXISTS [Category];
DROP TABLE IF EXISTS [Transaction];
DROP TABLE IF EXISTS [UserProfile];
DROP TABLE IF EXISTS [UserType];
GO

CREATE TABLE [UserType] (
  [Id] integer PRIMARY KEY IDENTITY,
  [Name] nvarchar(20) NOT NULL
)

CREATE TABLE [AccountType] (
0[Id] integer PRIMARY KEY IDENTITY,
0[Label] varchar(50)
)

CREATE TABLE [UserProfile] (
  [Id] integer PRIMARY KEY IDENTITY,
  [FirebaseUserId] NVARCHAR(28) NOT NULL,
  [Email] nvarchar(555) NOT NULL,
  [CreateDateTime] datetime NOT NULL,
  [UserTypeId] integer NOT NULL,

  CONSTRAINT [FK_User_UserType] FOREIGN KEY ([UserTypeId]) REFERENCES [UserType] ([Id]),
  CONSTRAINT UQ_FirebaseUserId UNIQUE(FirebaseUserId)
)

CREATE TABLE [Account] (
0[Id] integer PRIMARY KEY IDENTITY,
0[AccountName] varchar(50) NOT NULL,
0[AccountTypeId] integer NOT NULL,
0[UserProfileId] integer NOT NULL,

0CONSTRAINT [FK_Account_AccountType] FOREIGN KEY ([AccountTypeId]) REFERENCES [AccountType] ([Id]),
0CONSTRAINT [FK_Account_UserProfile] FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
)

CREATE TABLE [Category] (
  [Id] integer PRIMARY KEY IDENTITY,
  [Name] nvarchar(50) NOT NULL
)

CREATE TABLE [Budget] (
  [Id] integer PRIMARY KEY IDENTITY,
  [CategoryId] integer NOT NULL,
  [UserProfileId] integer NOT NULL,
  [Amount] decimal(9, 2) NOT NULL,

  CONSTRAINT [FK_Budget_Category] FOREIGN KEY ([CategoryId]) REFERENCES [Category] ([Id]),
  CONSTRAINT [FK_Budget_UserProfile] FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
)

CREATE TABLE [Transaction] (
  [Id] integer PRIMARY KEY IDENTITY,
  [Title] nvarchar(255) NOT NULL,
  [Description] text NOT NULL,
  [TransactionDateTime] datetime NOT NULL,
  [CategoryId] integer NOT NULL,
  [AccountId] integer NOT NULL,
  [Amount] decimal(9, 2) NOT NULL,

  CONSTRAINT [FK_Transaction_Category] FOREIGN KEY ([CategoryId]) REFERENCES [Category] ([Id]),
  CONSTRAINT [FK_Transaction_Account] FOREIGN KEY ([AccountId]) REFERENCES [Account] ([Id])
)

GO
