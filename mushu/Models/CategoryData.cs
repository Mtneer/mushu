using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace mushu.Models
{
    public class CategoryData
    {
        public string Label { get; set; }
        public int CategoryID { get; set; }
        public List<DataPoint> Data { get; set; }
    }
}
