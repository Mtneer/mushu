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
    public class AccountRepository : BaseRepository, IAccountRepository
    {
        public AccountRepository(IConfiguration configuration) : base(configuration) { }

        public List<Account> GetAllAccountsByUserProfileId(int userProfileId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT a.Id, a.AccountName, a.AccountTypeId, a.UserProfileId,
                               at.Label
                          FROM Account a
                     LEFT JOIN AccountType at ON a.AccountTypeId = at.Id
                         WHERE a.UserProfileId = @upId";

                    cmd.Parameters.AddWithValue("@upId", userProfileId);

                    var reader = cmd.ExecuteReader();

                    List<Account> accounts = new List<Account>();

                    while (reader.Read())
                    {
                        accounts.Add(NewAccountFromReader(reader));
                    }
                    reader.Close();

                    return accounts;
                }
            }
        }

        public List<AccountType> GetAccountTypes()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT at.Id AS AccountTypeId, at.Label
                          FROM AccountType at";

                    var reader = cmd.ExecuteReader();

                    List<AccountType> accountTypes = new List<AccountType>();

                    while (reader.Read())
                    {
                        accountTypes.Add(NewAccountTypeFromReader(reader));
                    }
                    reader.Close();

                    return accountTypes;
                }
            }
        }

        public Account GetAccountById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT a.Id, a.AccountName, a.AccountTypeId, a.UserProfileId,
                               at.Label
                          FROM Account a
                     LEFT JOIN AccountType at ON a.AccountTypeId = at.Id
                         WHERE a.Id = @Id";

                    cmd.Parameters.AddWithValue("@Id", id);

                    var reader = cmd.ExecuteReader();

                    Account account = null;

                    if (reader.Read())
                    {
                        account = NewAccountFromReader(reader);
                    }
                    reader.Close();

                    return account;
                }
            }
        }

        public void AddAccount(Account account)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Account (
                            AccountName, AccountTypeId, UserProfileId )
                        OUTPUT INSERTED.ID
                        VALUES (
                            @AccountName, @AccountTypeId, @UserProfileId
                                )";
                    cmd.Parameters.AddWithValue("@AccountName", account.AccountName);
                    cmd.Parameters.AddWithValue("@AccountTypeId", account.AccountTypeId);
                    cmd.Parameters.AddWithValue("@UserProfileId", account.UserProfileId);

                    account.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void EditAccount(Account account)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Account 
                           SET AccountName = @AccountName,
                               AccountTypeId = @AccountTypeId
                         WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@AccountName", account.AccountName);
                    cmd.Parameters.AddWithValue("@AccountTypeId", account.AccountTypeId);
                    cmd.Parameters.AddWithValue("@id", account.Id);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeleteAccount(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        DELETE FROM Account
                         WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        private Account NewAccountFromReader(SqlDataReader reader)
        {
            return new Account()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                AccountName = DbUtils.GetString(reader, "AccountName"),
                AccountTypeId = DbUtils.GetInt(reader, "AccountTypeId"),
                UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                AccountType = NewAccountTypeFromReader(reader)
            };
        }

        private AccountType NewAccountTypeFromReader(SqlDataReader reader)
        {
            return new AccountType()
            {
                Id = DbUtils.GetInt(reader, "AccountTypeId"),
                Label = DbUtils.GetString(reader, "Label")
            };
        }
    }
}
