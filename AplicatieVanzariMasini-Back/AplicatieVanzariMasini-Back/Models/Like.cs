using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AplicatieVanzariMasini_Back.Models
{
    public class Like
    {
        public int LikerId { get; set; }
        public int LikeeId { get; set; }
        //public int AnnounceLikerId { get; set; }
        //public int AnnounceLikeeId { get; set; }
        public virtual User Liker { get; set; }
        public virtual User Likee { get; set; }
        //public virtual Announce AnnounceLiker { get; set; }
        //public virtual Announce AnnounceLikee { get; set; }

    }
}
