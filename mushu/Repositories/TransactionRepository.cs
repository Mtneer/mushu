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

        public List<Transaction> GetAllTransactions()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT t.Id, t.TransactionDateTime, t.Title, t.Amount, t.CategoryId,
                               c.Name AS CategoryName
                          FROM [Transaction] t
                     LEFT JOIN Category c ON t.CategoryId = c.Id
                      ORDER BY t.TransactionDateTime DESC";

                    var reader = cmd.ExecuteReader();

                    List<Transaction> transactions = new List<Transaction>();

                    while (reader.Read())
                    {
                        transactions.Add(new Transaction
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Title = DbUtils.GetString(reader, "Title"),
                            Amount = DbUtils.GetDecimalValue(reader, "Amount"),
                            TransactionDateTime = DbUtils.GetDateTime(reader, "TransactionDateTime"),
                            CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                            Category = new Category
                            {
                                Id = DbUtils.GetInt(reader,"CategoryId"),
                                Name = DbUtils.GetString(reader, "CategoryName")
                            }
                        });
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
                        SELECT t.Id, t.TransactionDateTime, t.Title, t.Amount, t.CategoryId,
                               c.Name AS CategoryName
                          FROM [Transaction] t
                     LEFT JOIN Category c ON t.CategoryId = c.Id
                         WHERE t.Id = @id";

                    cmd.Parameters.AddWithValue("@id", id);

                    var reader = cmd.ExecuteReader();

                    Transaction transaction = null;

                    if (reader.Read())
                    {
                        transaction = new Transaction
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
                            }
                        };
                    }
                    reader.Close();

                    return transaction;
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
    }
}
