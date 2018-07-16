using MVCProject.DataModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MVCProject.Models
{
    public class MenuMasterViewModels
    {
        public int MenuId { get; set; }
        public string MenuName { get; set; }
        public string MenuUrl { get; set; }
        public Nullable<int> MenuParentId { get; set; }
        public Nullable<bool> IsActive { get; set; }

        public virtual List<MenuMasterViewModels> MenuMasterViewModels1 { get; set; }

        public MenuMasterViewModels()
        {
            this.MenuMasterViewModels1 = new List<MenuMasterViewModels>();
        }

        public MenuMasterViewModels(MenuMaster MMast)
        {
            MenuId = MMast.MenuId;
            MenuName = MMast.MenuName;
            MenuUrl = MMast.MenuUrl;
            MenuParentId = MMast.MenuParentId;
        }

        public MenuMasterViewModels ConvertFromManu(MenuMaster MMast)
        {
            MenuId = MMast.MenuId;
            MenuName = MMast.MenuName;
            MenuUrl = MMast.MenuUrl;
            MenuParentId = MMast.MenuParentId;
            return this;
        }
    }
}