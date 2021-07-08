using mushu.Models;
using System.Collections.Generic;

namespace mushu.Repositories
{
    public interface IAccountRepository
    {
        void AddAccount(Account account);
        List<Account> GetAllAccountsByUserProfileId(int userProfileId);
    }
}