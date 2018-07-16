using MVCProject.DataModels;
using MVCProject.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MVCProject.Controllers
{
    public class MenuMasterAllController : Controller
    {
        MVCProjectEntities db = new MVCProjectEntities();
        // GET: MenuMasterAll
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult List()
        {
            var mmast = db.MenuMasters.Where(x => x.IsActive == true).ToList();
            var model = mmast.Select(x => new MenuMasterViewModels(x)).ToList();
            return Json(model, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Add(MenuMasterViewModels model)
        {
            var mmast = new MenuMaster();
            mmast.MenuName = model.MenuName;
            mmast.MenuUrl = model.MenuUrl;
            mmast.MenuParentId = model.MenuParentId;
            mmast.IsActive = true;
            db.MenuMasters.Add(mmast);
            db.SaveChanges();
            return Json(true, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetbyID(int ID)
        {
            var mmast = db.MenuMasters.Where(x => x.MenuId == ID).SingleOrDefault();
            MenuMasterViewModels model = new MenuMasterViewModels();
            model = new MenuMasterViewModels().ConvertFromManu(mmast);
            return Json(model, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(MenuMasterViewModels model)
        {
            var mmast = db.MenuMasters.Where(x => x.MenuId == model.MenuId).SingleOrDefault();
            mmast.MenuName = model.MenuName;
            mmast.MenuUrl = model.MenuUrl;
            mmast.MenuParentId = model.MenuParentId;
            db.SaveChanges();
            return Json(true, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(int ID)
        {
            var mmast = db.MenuMasters.Where(x => x.MenuId == ID).SingleOrDefault();
            mmast.IsActive = false;
            db.SaveChanges();
            return Json(true, JsonRequestBehavior.AllowGet);
        }

    }
}