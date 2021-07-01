using mushu.Models;
using System.Collections.Generic;

namespace mushu.Repositories
{
    public interface ITransactionRepository
    {
        List<Transaction> GetAllTransactions();
    }
}