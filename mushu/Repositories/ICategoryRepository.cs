using mushu.Models;
using System.Collections.Generic;

namespace mushu.Repositories
{
    public interface ICategoryRepository
    {
        List<Category> GetAllCategories();
        Category GetCategoryById(int id);
        void Edit(Category category);
        void Delete(int id);
        void AddCategory(Category category);
    }
}