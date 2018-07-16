using MVCProject.DataModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MVCProject.Models
{
    public class UserManagementViewModels
    {
        public int UId { get; set; }
        public string UserName { get; set; }
        public string UserPassword { get; set; }
        public string UserEmail { get; set; }
        public string RoleName { get; set; }
        public string ReignName { get; set; }
        public int UserRoleId { get; set; }
        //public IEnumerable<SelectListItem> UserRole { get; set; }
        public int UserReignsId { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public Nullable<bool> IsDelete { get; set; }
        public string CBY { get; set; }
        public Nullable<System.DateTime> CDate { get; set; }
        public string MBY { get; set; }
        public Nullable<System.DateTime> MDate { get; set; }

        public virtual ReignsViewModels Reign { get; set; }
        public virtual RoleViewModels UserRole { get; set; }

        public virtual List<UserManagementViewModels> UserManagementViewModels1 { get; set; }

        public UserManagementViewModels()
        {
            this.UserManagementViewModels1 = new List<UserManagementViewModels>();
        }

        public UserManagementViewModels(UserManagement uman)
        {
            UId = uman.UId;
            UserName = uman.UserName;
            UserPassword = uman.UserPassword;
            UserEmail = uman.UserEmail;
            RoleName = uman.UserRole.RoleName;
            UserRoleId = uman.UserRoleId;
            ReignName = uman.Reign.Name;
            UserReignsId = uman.UserReignsId;

        }

        public UserManagementViewModels ConvertFromUserManagement(UserManagement uman)
        {
            UId = uman.UId;
            UserName = uman.UserName;
            UserPassword = uman.UserPassword;
            UserEmail = uman.UserEmail;
            RoleName = uman.UserRole.RoleName;
            UserRoleId = uman.UserRoleId;
            ReignName = uman.Reign.Name;
            UserReignsId = uman.UserReignsId;
            return this;
        }

    }
}