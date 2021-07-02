using Microsoft.AspNetCore.Mvc;
using mushu.Models;
using mushu.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace mushu.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryRepository _categoryRepository;
        public CategoryController(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }

        // GET: api/<CategoryController>
        [HttpGet]
        public List<Category> Get()
        {
            return _categoryRepository.GetAllCategories();
        }

        // GET api/<CategoryController>/5
        [HttpGet("{id}")]
        public Category Get(int id)
        {
            return _categoryRepository.GetCategoryById(id);
        }

        // POST api/<CategoryController>
        [HttpPost]
        public void Post(Category category)
        {
            _categoryRepository.AddCategory(category);
        }

        // PUT api/<CategoryController>/5
        [HttpPut]
        public void Put(Category category)
        {
            _categoryRepository.Edit(category);
        }

        // DELETE api/<CategoryController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _categoryRepository.Delete(id);
        }
    }
}
