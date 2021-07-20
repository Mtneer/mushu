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
  [TransactionDateTime] DATETIME NOT NULL,
  [Title] VARCHAR(255) NOT NULL,
  [Amount] NUMERIC(6, 2) NOT NULL,
  [CategoryId] integer NOT NULL,
  [AccountId] integer NOT NULL

  CONSTRAINT [FK_Transaction_Category] FOREIGN KEY ([CategoryId]) REFERENCES [Category] ([Id]),
  CONSTRAINT [FK_Transaction_Account] FOREIGN KEY ([AccountId]) REFERENCES [Account] ([Id])
)
GO

