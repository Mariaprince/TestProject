using MVCProject.DataModels;
using MVCProject.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MVCProject.Controllers
{
    public class RoleMasterController : Controller
    {
        MVCProjectEntities db = new MVCProjectEntities();

        // GET: RoleMaster
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult List()
        {
            var rol = db.UserRoles.ToList();
            var model = rol.Select(x => new RoleViewModels(x)).ToList();
            return Json(model, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Add(RoleViewModels model)
        {
            var rol = new UserRole();
            rol.RoleName = model.RoleName;
            rol.IsActive = model.IsActive;
            db.UserRoles.Add(rol);
            db.SaveChanges();
            return Json(true, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetbyID(int ID)
        {
            var rol = db.UserRoles.Where(x => x.RoleId == ID).SingleOrDefault();
            RoleViewModels model = new RoleViewModels();
            model = new RoleViewModels().ConvertFromRole(rol);
            return Json(model, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(RoleViewModels model)
        {
            var rol = db.UserRoles.Where(x => x.RoleId == model.RoleId).SingleOrDefault();
            rol.RoleName = model.RoleName;
            rol.IsActive = model.IsActive;
            db.SaveChanges();
            return Json(true, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(int ID)
        {
            UserRole userRole = db.UserRoles.Find(ID);
            db.UserRoles.Remove(userRole);
            db.SaveChanges();
            return Json(true, JsonRequestBehavior.AllowGet);
        }
    }
}