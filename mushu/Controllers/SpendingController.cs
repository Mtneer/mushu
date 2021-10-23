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

        // GET: api/<SpendingController>/1
        [HttpGet("{loggedInUserId}")]
        public Summary Get(int loggedInUserId)
        {
            var summary = new Summary
            {
                Data = new List<CategoryData>()
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
                    //summary.Axes.Add($"{y}-{m}");
                    int catIndex = 0;
                    categories.ForEach(c =>
                    {
                        if (i == 0)
                        {
                            summary.Data.Add(new CategoryData
                            {
                                Label = c.Name,
                                CategoryID = c.Id,
                                Data = new List<DataPoint>()
                            });
                        }
                        int j = 0;
                        List<Transaction> ts = transactions.Where(t => t.CategoryId == c.Id && t.TransactionDateTime.Month == m && t.TransactionDateTime.Year == y).ToList();

                        if (ts.Count > 0)
                        {
                            ts.ForEach(t =>
                            {
                                if (j == 0)
                                {
                                    summary.Data[catIndex].Data.Add(new DataPoint
                                    {
                                        X = $"{m}-{y}",
                                        Y = 0
                                    });
                                }

                                summary.Data[catIndex].Data[i].Y += Math.Abs(t.Amount);
                                j += 1;
                            });
                        }
                        else
                        {
                            summary.Data[catIndex].Data.Add(new DataPoint
                            {
                                X = $"{m}-{y}",
                                Y = 0
                            });
                        }
                        catIndex += 1;
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

        // GET: api/<SpendingController>/1?startDate=MM/YY&endDate=MM/YY
        [HttpGet("{loggedInUserId}/search")]
        public Summary GetByDates(int loggedInUserId, DateTime startDate, DateTime endDate)
        {
            var summary = new Summary
            {
                Data = new List<CategoryData>()
            };
            List<Transaction> transactions = _transactionRepository.GetTransactionsByDate(loggedInUserId, startDate, endDate);
            List<Category> categories = _categoryRepository.GetAllCategories();

            var numTransactions = transactions.Count;

            int startMonth = startDate.Month;
            int startYear = startDate.Year;
            int endMonth = endDate.Month;
            int endYear = endDate.Year;

            int m = startMonth;
            int y = startYear;

            int i = 0;

            while (y <= endYear)
            {
                while (m <= endMonth || y != endYear)
                {
                    //summary.Axes.Add($"{y}-{m}");
                    categories.ForEach(c =>
                    {
                        if (i == 0)
                        {
                            summary.Data.Add(new CategoryData
                            {
                                Label = c.Name,
                                Data = new List<DataPoint>()
                            });
                        }
                        int j = 0;
                        List<Transaction> ts = transactions.Where(t => t.CategoryId == c.Id && t.TransactionDateTime.Month == m && t.TransactionDateTime.Year == y).ToList();

                        if (ts.Count > 0)
                        {
                            ts.ForEach(t =>
                            {
                                if (j == 0)
                                {
                                    summary.Data[c.Id - 1].Data.Add(new DataPoint
                                    {
                                        X = $"{m}-{y}",
                                        Y = 0
                                    });
                                }

                                summary.Data[c.Id - 1].Data[i].Y += Math.Abs(t.Amount);
                                j += 1;
                            });
                        }
                        else
                        {
                            summary.Data[c.Id - 1].Data.Add(new DataPoint
                            {
                                X = $"{m}-{y}",
                                Y = 0
                            });
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
