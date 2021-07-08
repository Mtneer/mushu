﻿using mushu.Models;
using System.Collections.Generic;

namespace mushu.Repositories
{
    public interface ITransactionRepository
    {
        List<Transaction> GetAllTransactions(int loggedInUserId);
        Transaction GetTransactionById(int id);
        void AddTransactions(List<Transaction> transactions);
        void UpdateTransaction(Transaction transaction);
    }
}