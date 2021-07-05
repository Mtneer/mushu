using mushu.Models;
using System.Collections.Generic;

namespace mushu.Repositories
{
    public interface IBudgetRepository
    {
        void AddBudget(Budget budget);
        void Delete(int id);
        void Edit(Budget budget);
        List<Budget> GetAllBudgetsByUserProfileId(int userProfileId);
        Budget GetBudgetById(int id);
    }
}