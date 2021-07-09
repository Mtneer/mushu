using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace mushu.Models
{
    public class Summary
    {
        public List<string> Axes { get; set; }
        public List<List<decimal>> Data { get; set; }
        public List<string> Series { get; set; }
    }
}
