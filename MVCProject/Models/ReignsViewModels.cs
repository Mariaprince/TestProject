using MVCProject.DataModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MVCProject.Models
{
    public class ReignsViewModels
    {
        public int ReignsId { get; set; }
        public string Name { get; set; }

        public virtual List<ReignsViewModels> ReignsViewModels1 { get; set; }

        public ReignsViewModels()
        {
            this.ReignsViewModels1 = new List<ReignsViewModels>();
        }

        public ReignsViewModels(Reign reg)
        {
            ReignsId = reg.ReignsId;
            Name = reg.Name;
        }

        public ReignsViewModels ConvertFromReign(Reign reg)
        {
            ReignsId = reg.ReignsId;
            Name = reg.Name;
            return this;
        }
    }
}