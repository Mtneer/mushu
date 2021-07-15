using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using mushu.Models;
using mushu.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace mushu.Repositories
{
    public class TransactionRepository : BaseRepository, ITransactionRepository
    {
        public TransactionRepository(IConfiguration configuration) : base(configuration) { }

        public List<Transaction> GetAllTransactions(int loggedInUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT t.Id, t.TransactionDateTime, t.Title, t.Amount, t.CategoryId, t.AccountId,
                               c.Name AS CategoryName,
                               a.AccountName, a.AccountTypeId,
                               at.Label
                          FROM [Transaction] t
                     LEFT JOIN Category c ON t.CategoryId = c.Id
                     LEFT JOIN Account a ON t.AccountId = a.Id
                     LEFT JOIN AccountType at ON a.AccountTypeId = at.Id
                         WHERE a.UserProfileId = @id
                      ORDER BY t.TransactionDateTime DESC";

                    cmd.Parameters.AddWithValue("@id", loggedInUserId);
                    var reader = cmd.ExecuteReader();

                    List<Transaction> transactions = new List<Transaction>();

                    while (reader.Read())
                    {
                        transactions.Add(NewTransactionFromReader(reader));
                    }
                    reader.Close();

                    return transactions;
                }
            }
        }

        public List<Transaction> GetTransactionsByDate(int loggedInUserId, DateTime startDate, DateTime endDate)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT t.Id, t.TransactionDateTime, t.Title, t.Amount, t.CategoryId, t.AccountId,
                               c.Name AS CategoryName,
                               a.AccountName, a.AccountTypeId,
                               at.Label
                          FROM [Transaction] t
                     LEFT JOIN Category c ON t.CategoryId = c.Id
                     LEFT JOIN Account a ON t.AccountId = a.Id
                     LEFT JOIN AccountType at ON a.AccountTypeId = at.Id
                         WHERE a.UserProfileId = @id AND t.TransactionDateTime > @startDate AND t.TransactionDateTime < @endDate
                      ORDER BY t.TransactionDateTime DESC";

                    cmd.Parameters.AddWithValue("@id", loggedInUserId);
                    cmd.Parameters.AddWithValue("@startDate", startDate);
                    cmd.Parameters.AddWithValue("@endDate", endDate);
                    var reader = cmd.ExecuteReader();

                    List<Transaction> transactions = new List<Transaction>();

                    while (reader.Read())
                    {
                        transactions.Add(NewTransactionFromReader(reader));
                    }
                    reader.Close();

                    return transactions;
                }
            }
        }

        public Transaction GetTransactionById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT t.Id, t.TransactionDateTime, t.Title, t.Amount, t.CategoryId, t.AccountId,
                               c.Name AS CategoryName,
                               a.AccountName, a.AccountTypeId,
                               at.Label
                          FROM [Transaction] t
                     LEFT JOIN Category c ON t.CategoryId = c.Id
                     LEFT JOIN Account a ON t.AccountId = a.Id
                     LEFT JOIN AccountType at ON a.AccountTypeId = at.Id
                         WHERE t.Id = @id";

                    cmd.Parameters.AddWithValue("@id", id);

                    var reader = cmd.ExecuteReader();

                    Transaction transaction = null;

                    if (reader.Read())
                    {
                        transaction = NewTransactionFromReader(reader);
                    }
                    reader.Close();

                    return transaction;
                }
            }
        }

        public void AddTransactions(List<Transaction> transactions)
        {
            string sqlString = "";
            transactions.ForEach(t =>
            {
                RemoveCharactersFromTitle(t);
                sqlString += $"INSERT INTO [Transaction] (TransactionDateTime, Title, Amount, AccountId, CategoryId) VALUES ('{t.TransactionDateTime}', '{t.Title}', {t.Amount}, {t.AccountId}, {t.CategoryId}); ";
            });
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = sqlString;

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void UpdateTransaction(Transaction transaction)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE [Transaction]
                                           SET CategoryId = @categoryId
                                         WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@id", transaction.Id);
                    cmd.Parameters.AddWithValue("@categoryId", transaction.CategoryId);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        private Transaction NewTransactionFromReader(SqlDataReader reader)
        {
            return new Transaction
            {
                Id = DbUtils.GetInt(reader, "Id"),
                Title = DbUtils.GetString(reader, "Title"),
                Amount = DbUtils.GetDecimalValue(reader, "Amount"),
                TransactionDateTime = DbUtils.GetDateTime(reader, "TransactionDateTime"),
                CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                Category = new Category
                {
                    Id = DbUtils.GetInt(reader, "CategoryId"),
                    Name = DbUtils.GetString(reader, "CategoryName")
                },
                AccountId = DbUtils.GetInt(reader, "AccountId"),
                Account = new Account
                {
                    Id = DbUtils.GetInt(reader, "AccountId"),
                    AccountName = DbUtils.GetString(reader, "AccountName"),
                    AccountType = new AccountType
                    {
                        Id = DbUtils.GetInt(reader, "AccountTypeId"),
                        Label = DbUtils.GetString(reader, "Label")
                    }
                }
            };
        }

        private void RemoveCharactersFromTitle(Transaction transaction)
        {
            var charsToRemove = new string[] { "@", ",", ".", ";", "'" };
            foreach (var c in charsToRemove)
            {
                transaction.Title = transaction.Title.Replace(c, string.Empty);
            }
        }
    }
}
