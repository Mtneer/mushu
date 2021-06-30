using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;

namespace mushu.Models
{
    public class Category
    {
        public int Id { get; set; }

        [DisplayName("Category Name")]
        public string Name { get; set; }
    }
}
