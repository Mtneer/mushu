using mushu.Models;
using System.Collections.Generic;

namespace mushu.Repositories
{
    public interface ICategoryRepository
    {
        List<Category> GetAllCategories();
    }
}