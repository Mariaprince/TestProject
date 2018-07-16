using MVCProject.DataModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MVCProject.Models
{
    public class RoleViewModels
    {
        public int RoleId { get; set; }
        public string RoleName { get; set; }
        public bool IsActive { get; set; }

        public virtual List<RoleViewModels> RoleViewModels1 { get; set; }

        public RoleViewModels()
        {
            this.RoleViewModels1 = new List<RoleViewModels>();
        }

        public RoleViewModels(UserRole urole)
        {
            RoleId = urole.RoleId;
            RoleName = urole.RoleName;
            IsActive = urole.IsActive;
        }

        public RoleViewModels ConvertFromRole(UserRole rol)
        {
            RoleId = rol.RoleId;
            RoleName = rol.RoleName;
            IsActive = rol.IsActive;
            return this;
        }
    }
}