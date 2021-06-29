using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.Runtime.CompilerServices;
using System.Runtime.InteropServices;

namespace mushu.Models
{
    public class UserProfile
    {
        public int Id { get; set; }

        [StringLength(28, MinimumLength = 28)]
        public string FirebaseUserId { get; set; }

        [Required]
        [DataType(DataType.EmailAddress)]
        [MaxLength(255)]
        public string Email { get; set; }

        public DateTime CreateDateTime { get; set; }

        [Required]
        public int UserTypeId { get; set; }
    }
}