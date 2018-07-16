using MVCProject.DataModels;
using MVCProject.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MVCProject.Controllers
{
    public class RoleMenuMappingController : Controller
    {
        MVCProjectEntities db = new MVCProjectEntities();
        // GET: RoleMenuMapping
        public ActionResult Index()
        {
            RoleMenuMappingViewModels models = new RoleMenuMappingViewModels();
            models.Menu = PopulateMenu();
            ViewBag.Uroles = db.UserRoles.ToList();
            return View(models);
        }
        public List<SelectListItem> PopulateMenu()
        {
            List<SelectListItem> items = new List<SelectListItem>();

            var mlist = db.MenuMasters.Select(x => new { x.MenuId, x.MenuName }).ToList();

            foreach (var mi in mlist)
            {
                items.Add(new SelectListItem
                {
                    Text = mi.MenuName,
                    Value = mi.MenuId.ToString()
                });
            }
            return items;
        }

        public List<SelectListItem> EditPopulateMenu(string MenuId)
        {
            List<SelectListItem> items = new List<SelectListItem>();

            var mlist = db.MenuMasters.Select(x => new { x.MenuId, x.MenuName }).ToList();
            var result = MenuId.Split(',');
            foreach (var mi in mlist)
            {
                items.Add(new SelectListItem
                {
                    Text = mi.MenuName,
                    Value = mi.MenuId.ToString() //, Selected(result)
                });
            }


            //for (var i = 0; i < result.Length; i++)
            //{
            //    var selected = items.Where(x => x.Value == result[i]).First();
            //    selected.Selected = true;

            //}


            return items;
        }

        public JsonResult List()
        {
            var rmm = db.RoleMenuMappings.Where(x => x.IsActive == true).ToList();
            var model = rmm.Select(x => new RoleMenuMappingViewModels(x)).ToList();

            return Json(model, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Add(RoleMenuMappingViewModels model)
        {
            var rmm = new RoleMenuMapping();
            rmm.RoleId = model.RoleId;
            rmm.MenuId = model.MenuId;
            rmm.IsActive = true;
            db.RoleMenuMappings.Add(rmm);
            db.SaveChanges();
            return Json(true, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetbyID(int ID)
        {
            var rmm = db.RoleMenuMappings.Where(x => x.RMId == ID).SingleOrDefault();
            RoleMenuMappingViewModels model = new RoleMenuMappingViewModels();
            model = new RoleMenuMappingViewModels().ConvertFromRole(rmm);
            //model.Menu = EditPopulateMenu(model.MenuId);
            return Json(model, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(RoleMenuMappingViewModels model)
        {
            var rmm = db.RoleMenuMappings.Where(x => x.RMId == model.RMId).SingleOrDefault();
            rmm.RoleId = model.RoleId;
            rmm.MenuId = model.MenuId;
            db.SaveChanges();
            return Json(true, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(int ID)
        {
            var rmm = db.RoleMenuMappings.Where(x => x.RMId == ID).SingleOrDefault();
            rmm.IsActive = false;
            db.SaveChanges();
            return Json(true, JsonRequestBehavior.AllowGet);
        }
    }
}