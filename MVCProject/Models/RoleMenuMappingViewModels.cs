using MVCProject.DataModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MVCProject.Models
{
    public class RoleMenuMappingViewModels
    {
        public int RMId { get; set; }
        public Nullable<int> RoleId { get; set; }
        public string MenuId { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public string RoleName { get; set; }

        public List<SelectListItem> Menu { get; set; }
        public int[] MenuIds { get; set; }

        public virtual List<RoleMenuMappingViewModels> RoleMenuMappingViewModels1 { get; set; }

        public RoleMenuMappingViewModels()
        {
            this.RoleMenuMappingViewModels1 = new List<RoleMenuMappingViewModels>();
        }

        public RoleMenuMappingViewModels(RoleMenuMapping urole)
        {
            if (urole.MenuId != "")
            {
                var numbers = urole.MenuId.Split(',').Select(Int32.Parse).ToList();
                MVCProjectEntities db = new MVCProjectEntities();
                var selected = db.MenuMasters.Where(x => numbers.Contains(x.MenuId)).Select(x => new { x.MenuName }).ToList();
                string mstr = "";
                foreach (var u in selected)
                {
                    mstr = mstr + "," + u.MenuName;
                }
                MenuId = mstr.Trim(',');
            }

            //var menulist = db.MenuMasters.Where(x=>x.MenuId in(urole.MenuId)).
            RMId = urole.RMId;
            RoleId = urole.RoleId;
            //MenuId = urole.MenuId;
            RoleName = urole.UserRole.RoleName;
        }

        public RoleMenuMappingViewModels ConvertFromRole(RoleMenuMapping urole)
        {
            RMId = urole.RMId;
            RoleId = urole.RoleId;
            MenuId = urole.MenuId;
            if (urole.MenuId != "")
            {
                MenuIds = null;
                MenuIds = urole.MenuId.Split(',').Select(Int32.Parse).ToArray();
            }

            return this;
        }
    }
}