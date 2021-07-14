using mushu.Models;
using System;
using System.Collections.Generic;

namespace mushu.Repositories
{
    public interface ITransactionRepository
    {
        List<Transaction> GetAllTransactions(int loggedInUserId);
        List<Transaction> GetTransactionsByDate(int loggedInuserId, DateTime startDate, DateTime endDate);
        Transaction GetTransactionById(int id);
        void AddTransactions(List<Transaction> transactions);
        void UpdateTransaction(Transaction transaction);
    }
}