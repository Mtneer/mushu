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
        public Summary Get(int loggedInUserId)
        {
            var summary = new Summary
            {
                Axes = new List<string>(),
                Data = new List<List<decimal>>(),
                Series = new List<string>()
            };
            List<Transaction> transactions = _transactionRepository.GetAllTransactions(loggedInUserId);
            List<Category> categories = _categoryRepository.GetAllCategories();

            var numTransactions = transactions.Count;
            var startDate = transactions[numTransactions - 1].TransactionDateTime; 
            var endDate = transactions[0].TransactionDateTime;

            int startMonth = startDate.Month;
            int startYear = startDate.Year;
            int endMonth = endDate.Month;
            int endYear = endDate.Year;

            int m = startMonth;
            int y = startYear;

            int i = 0;

            while (y <= endYear)
            {
                while (m != endMonth || y != endYear)
                {
                    summary.Axes.Add($"{y}-{m}");
                    categories.ForEach(c =>
                    {
                        if (i == 0)
                        {
                            summary.Data.Add(new List<Decimal>());
                            summary.Series.Add(c.Name);
                        }
                        int j = 0;
                        List<Transaction> ts = transactions.Where(t => t.CategoryId == c.Id && t.TransactionDateTime.Month == m && t.TransactionDateTime.Year == y).ToList();

                        if (ts.Count > 0)
                        {
                            ts.ForEach(t =>
                            {
                                if (j == 0)
                                {
                                    summary.Data[c.Id-1].Add( 0 );
                                }

                                summary.Data[c.Id-1][i] += Math.Abs(t.Amount);
                                j += 1;
                            });
                        }
                        else
                        {
                            summary.Data[c.Id-1].Add( 0 );
                        }
                    });
                    
                    m += 1;
                    if (m > 12)
                    {
                        m = 1;
                        break;
                    }
                    i += 1;
                }
                y += 1;
            }

            return summary;
        }
    }
}
