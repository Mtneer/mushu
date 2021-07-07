using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace mushu.Models
{
    public class Account
    {
        public int Id { get; set; }
        public string AccountName { get; set; }
        public int AccountTypeId { get; set; }
        public AccountType AccountType { get; set; }
        public int UserProfileId { get; set; }
    }
}
