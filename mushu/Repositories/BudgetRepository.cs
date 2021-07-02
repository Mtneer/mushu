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
    public class BudgetRepository : BaseRepository, IBudgetRepository
    {
        public BudgetRepository(IConfiguration configuration) : base(configuration) { }

        public List<Budget> GetAllBudgetsByUserProfileId(int userProfileId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT b.Id, b.CategoryId, b.Amount, b.UserProfileId,
                               c.Name
                          FROM Budget b
                     LEFT JOIN Category c ON b.CategoryId = c.Id
                         WHERE b.UserProfileId = @upId";

                    cmd.Parameters.AddWithValue("@upId", userProfileId);

                    var reader = cmd.ExecuteReader();

                    List<Budget> budgets = new List<Budget>();

                    while (reader.Read())
                    {
                        budgets.Add(NewBudgetFromReader(reader));
                    }
                    reader.Close();

                    return budgets;
                }
            }
        }

        public Budget GetBudgetById(int id, int userProfileId)
        {
            // Define a variable to identify the database connection
            // ("Connection" comes from the BaseRepository.cs)
            using (var conn = Connection)
            {
                conn.Open();
                // Open the connection to the database.
                using (var cmd = conn.CreateCommand())
                {
                    // Instantiate a variable called cmd to use as short-hand for defining the SQL query.
                    cmd.CommandText = @"
                       SELECT b.Id, b.CategoryId, b.Amount, b.UserProfileId,
                               c.Name
                          FROM Budget b
                     LEFT JOIN Category c ON b.CategoryId = c.Id
                         WHERE b.UserProfileId = @upId AND b.Id = @id";
                    // Attach the UserId parameter to the SQL Query using SQLConnection provided methods
                    cmd.Parameters.AddWithValue("@id", id);
                    cmd.Parameters.AddWithValue("@upId", userProfileId);
                    // Execute the Query
                    var reader = cmd.ExecuteReader();

                    Budget budget = null;

                    if (reader.Read())
                    {
                        budget = NewBudgetFromReader(reader);
                    }

                    reader.Close();

                    return budget;
                }
            }
        }

        public void AddBudget(Budget budget)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Budget (
                            Amount, CategoryId, UserProfileId )
                        OUTPUT INSERTED.ID
                        VALUES (
                            @Amount, @CategoryId, @UserProfileId
                                )";
                    cmd.Parameters.AddWithValue("@Amount", budget.Amount);
                    cmd.Parameters.AddWithValue("@CategoryId", budget.CategoryId);
                    cmd.Parameters.AddWithValue("@UserProfileId", budget.UserProfileId);

                    budget.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Edit(Budget budget)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Budget
                                        SET Amount = @Amount,
                                            CategoryId = @CategoryId
                                        WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@id", budget.Id);
                    cmd.Parameters.AddWithValue("@Amount", budget.Amount);
                    cmd.Parameters.AddWithValue("@CategoryId", budget.CategoryId);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Delete(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            DELETE FROM Budget
                            WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        private Budget NewBudgetFromReader(SqlDataReader reader)
        {
            return new Budget()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                Amount = DbUtils.GetDecimalValue(reader, "Amount"),
                CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                Category = new Category
                {
                    Id = DbUtils.GetInt(reader, "CategoryId"),
                    Name = DbUtils.GetString(reader, "Name")
                }
            };
        }
    }
}
