using mushu.Models;
using System.Collections.Generic;

namespace mushu.Repositories
{
    public interface IAccountRepository
    {
        List<Account> GetAllAccountsByUserProfileId(int userProfileId);
        List<AccountType> GetAccountTypes();
        Account GetAccountById(int id);
        void AddAccount(Account account);
        void EditAccount(Account account);
        void DeleteAccount(int id);
    }
}