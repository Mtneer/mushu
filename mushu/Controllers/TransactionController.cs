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
    public class TransactionController : ControllerBase
    {

        private readonly ITransactionRepository _transactionRepository;
        public TransactionController(ITransactionRepository transactionRepository)
        {
            _transactionRepository = transactionRepository;
        }

        // GET: api/<TransactionController>
        [HttpGet("{loggedInUserId}")]
        public List<Transaction> Get(int loggedInUserId)
        {
            return _transactionRepository.GetAllTransactions(loggedInUserId);
        }

        // GET api/<TransactionController>/5
        //[HttpGet("{id}")]
        //public Transaction GetById(int id)
        //{
        //    return _transactionRepository.GetTransactionById(id);
        //}

        // POST api/<TransactionController>
        [HttpPost]
        public void Post(List<Transaction> transactions)
        {
            _transactionRepository.AddTransactions(transactions);
        }

        // PUT api/<TransactionController>/5
        [HttpPut]
        public void Put(Transaction transaction)
        {
            _transactionRepository.UpdateTransaction(transaction);
        }

        // DELETE api/<TransactionController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
