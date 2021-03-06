using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using mushu.Models;
using mushu.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace mushu.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountRepository _accountRepository;
        public AccountController(IAccountRepository accountRepository)
        {
            _accountRepository = accountRepository;
        }

        // GET: api/<AccountController>
        [HttpGet("{userId}")]
        public List<Account> Get(int userId)
        {
            return _accountRepository.GetAllAccountsByUserProfileId(userId);
        }

        // GET: api/<AccountController>
        [HttpGet("AccountTypes")]
        public List<AccountType> GetAccountTypes()
        {
            return _accountRepository.GetAccountTypes();
        }

        //// GET api/<AccountController>/5
        [HttpGet("Detail/{id}")]
        public Account GetById(int id)
        {
            return _accountRepository.GetAccountById(id);
        }

        // POST api/<AccountController>
        [HttpPost]
        public void Post(Account account)
        {
            _accountRepository.AddAccount(account);
        }

        // PUT api/<AccountController>/5
        [HttpPut]
        public void Put(Account account)
        {
            _accountRepository.EditAccount(account);
        }

        // DELETE api/<AccountController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _accountRepository.DeleteAccount(id);
        }
    }
}
