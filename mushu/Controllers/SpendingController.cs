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
    public class SpendingController : ControllerBase
    {
        private readonly ITransactionRepository _transactionRepository; 
        private readonly ICategoryRepository _categoryRepository;

        public SpendingController(ITransactionRepository transactionRepository, ICategoryRepository categoryRepository)
        {
            _transactionRepository = transactionRepository;
            _categoryRepository = categoryRepository;
        }

        // GET: api/<SpendingController>
        [HttpGet]
        public List<Summary> Get(int loggedInUserId)
        {
            var summaries = new List<Summary>();
            List<Transaction> transactions = _transactionRepository.GetAllTransactions(loggedInUserId);
            List<Category> categories = _categoryRepository.GetAllCategories();
            categories.ForEach(c =>
            {
                List<Transaction> categoryTransactions = transactions.Where(t => t.CategoryId == c.Id).OrderBy(t => t.TransactionDateTime).ToList();
                summaries.Add(new Summary
                {
                    Category = c,
                    MonthlyAverages = NewMonthlyAverages(categoryTransactions)
                });
            });
            return summaries;
        }

        private List<MonthlyAverage> NewMonthlyAverages(List<Transaction> catTransactions)
        {
            var result = new List<MonthlyAverage>();
            decimal sum = 0;

            for (int i = 0; i< catTransactions.Count; i++)
            {
                int prevMonth = 0;
                int prevYear = 0000;
                if (i != 0)
                {
                    prevMonth = catTransactions[i-1].TransactionDateTime.Month;
                    prevYear = catTransactions[i-1].TransactionDateTime.Year;
                }
                int currMonth = catTransactions[i].TransactionDateTime.Month;
                int currYear = catTransactions[i].TransactionDateTime.Year;

                if (prevYear == currYear)
                {
                    if (prevMonth == currMonth)
                    {
                        // Add to the existing sum
                        sum = sum + catTransactions[i].Amount;

                    } 
                } else
                {
                    // the existing sum can be saved to a new MonthlyAverage object
                    // a new sum can be initiated
                    result.Add(new MonthlyAverage
                    {
                        Month = prevMonth,
                        Year = prevYear,
                        Amount = sum
                    });
                    sum = catTransactions[i].Amount;
                }
            }

            return result;
        }
    }
}
