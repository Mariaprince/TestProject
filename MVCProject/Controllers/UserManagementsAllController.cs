using MVCProject.DataModels;
using MVCProject.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MVCProject.Controllers
{
    public class UserManagementsAllController : Controller
    {
        MVCProjectEntities db = new MVCProjectEntities();
        // GET: UserManagementsAll
        public ActionResult Index()
        {
            ViewBag.Uroles = db.UserRoles.ToList();
            ViewBag.UReigns = db.Reigns.ToList();
            return View();
        }

        public JsonResult List()
        {
            var uman = db.UserManagements.Where(x => x.IsActive == true && x.IsDelete == false).ToList();
            var model = uman.Select(x => new UserManagementViewModels(x)).ToList();
            return Json(model, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Add(UserManagementViewModels model)
        {
            var uman = new UserManagement();
            uman.UserName = model.UserName;
            uman.UserPassword = model.UserPassword;
            uman.UserEmail = model.UserEmail;
            uman.UserRoleId = model.UserRoleId;
            uman.UserReignsId = model.UserReignsId;
            uman.IsActive = true;
            uman.IsDelete = false;
            uman.CBY = @User.Identity.Name;
            uman.CDate = DateTime.Now;
            uman.MBY = @User.Identity.Name;
            uman.MDate = DateTime.Now;
            db.UserManagements.Add(uman);
            db.SaveChanges();
            return Json(true, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetbyID(int ID)
        {
            var uman = db.UserManagements.Where(x => x.UId == ID).SingleOrDefault();
            UserManagementViewModels model = new UserManagementViewModels();
            model = new UserManagementViewModels().ConvertFromUserManagement(uman);
            return Json(model, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(UserManagementViewModels model)
        {
            var uman = db.UserManagements.Where(x => x.UId == model.UId).SingleOrDefault();
            uman.UserName = model.UserName;
            uman.UserPassword = model.UserPassword;
            uman.UserEmail = model.UserEmail;
            uman.UserRoleId = model.UserRoleId;
            uman.UserReignsId = model.UserReignsId;
            uman.MBY = @User.Identity.Name;
            uman.MDate = DateTime.Now;
            db.SaveChanges();
            return Json(true, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(int ID)
        {
            var uman = db.UserManagements.Where(x => x.UId == ID).SingleOrDefault();
            uman.IsActive = false;
            uman.IsDelete = true;
            db.SaveChanges();
            return Json(true, JsonRequestBehavior.AllowGet);
        }
    }
}