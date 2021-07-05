using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using mushu.Repositories;
using mushu.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace mushu.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BudgetController : ControllerBase
    {

        private readonly IBudgetRepository _budgetRepository;
        public BudgetController(IBudgetRepository budgetRepository)
        {
            _budgetRepository = budgetRepository;
        }

        // GET: api/<BudgetController>
        [HttpGet("{userProfileId}")]
        public List<Budget> Get(int userProfileId)
        {
            return _budgetRepository.GetAllBudgetsByUserProfileId(userProfileId);
        }

        // GET api/<BudgetController>/Detail/5
        [HttpGet("Detail/{id}")]
        public Budget GetById(int id)
        {
            return _budgetRepository.GetBudgetById(id);
        }

        // POST api/<BudgetController>
        [HttpPost]
        public void Post(Budget budget)
        {
            _budgetRepository.AddBudget(budget);
        }

        // PUT api/<BudgetController>/5
        [HttpPut]
        public void Put(Budget budget)
        {
            _budgetRepository.Edit(budget);
        }

        // DELETE api/<BudgetController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _budgetRepository.Delete(id);
        }
    }
}
