using MVCProject.DataModels;
using MVCProject.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MVCProject.Controllers
{
    public class ReignAllController : Controller
    {
        MVCProjectEntities db = new MVCProjectEntities();
        // GET: ReignAll
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult List()
        {
            var rol = db.Reigns.ToList();
            var model = rol.Select(x => new ReignsViewModels(x)).ToList();
            return Json(model, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Add(ReignsViewModels model)
        {
            var rol = new Reign();
            rol.Name = model.Name;
            db.Reigns.Add(rol);
            db.SaveChanges();
            return Json(true, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetbyID(int ID)
        {
            var rol = db.Reigns.Where(x => x.ReignsId == ID).SingleOrDefault();
            ReignsViewModels model = new ReignsViewModels();
            model = new ReignsViewModels().ConvertFromReign(rol);
            return Json(model, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(ReignsViewModels model)
        {
            var rol = db.Reigns.Where(x => x.ReignsId == model.ReignsId).SingleOrDefault();
            rol.Name = model.Name;
            db.SaveChanges();
            return Json(true, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(int ID)
        {
            Reign userReign = db.Reigns.Find(ID);
            db.Reigns.Remove(userReign);
            db.SaveChanges();
            return Json(true, JsonRequestBehavior.AllowGet);
        }
    }
}