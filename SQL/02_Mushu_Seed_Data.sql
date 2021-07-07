USE [Mushu];
GO

set identity_insert [UserType] on
insert into [UserType] ([ID], [Name]) VALUES (1, 'Admin'), (2, 'User');
set identity_insert [UserType] off

set identity_insert [Category] on
insert into [Category] ([Id], [Name]) 
values (1, 'Restaurants'), (2, 'Gasoline'), (3, 'Entertainment'), (4, 'Charity'), (5, 'Merchandise'),
   (6, 'Fees'), (7, 'Travel'), (8, 'Home Improvement'), (9, 'Automotive'), (10, 'Groceries'), 
   (11,'Health and Beauty'), (12, 'Water Bill'), (13, 'Internet'), (14, 'Electric Bill'), 
   (15, 'Gas Bill'), (16, 'Investments'), (17, 'Payments'), (18, 'Shipping')   
set identity_insert [Category] off

set identity_insert [UserProfile] on
insert into UserProfile (Id, Email, CreateDateTime, UserTypeId, FirebaseUserId) values (1, 'admin@admin.com', '2020-04-23', 1, '9uDAqHUJvDZzVKccDpassb3yKdo2');
insert into UserProfile (Id, Email, CreateDateTime, UserTypeId, FirebaseUserId) values (2, 'test@test.com', '2020-04-23', 2, 'cKsmIkhu52X4HmdSgpQnBROmejw1');
set identity_insert [UserProfile] off

set identity_insert [AccountType] on
insert into [AccountType] ([ID], [Label]) 
VALUES (1, 'Checking'), (2, 'Savings'), (3, 'Credit'), (4, 'Loan'), (5, 'Mortgage'), (6, 'Investment');
set identity_insert [AccountType] off

set identity_insert [Account] on
insert into [Account] ([ID], [AccountName], [AccountTypeId], [UserProfileId]) 
VALUES (1, 'BB&T', 1, 1), (2, 'BB&T', 2, 1), (3, 'Visa', 3, 1), (4, 'Robinhood', 6, 1)
set identity_insert [Account] off
