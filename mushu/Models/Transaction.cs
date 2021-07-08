using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace mushu.Models
{
    public class Transaction
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public decimal Amount { get; set; }
        public DateTime TransactionDateTime { get; set; }
        public int CategoryId { get; set; }
        public Category Category { get; set; }
        public int AccountId { get; set; }
    }
}
