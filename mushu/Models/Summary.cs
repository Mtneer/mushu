using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace mushu.Models
{
    public class Summary
    {
        public Category Category { get; set; }
        public List<MonthlyAverage> MonthlyAverages { get; set; }
    }
}
