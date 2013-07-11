using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MvcGeoMap.Controllers
{

    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Message = "This is viewBag message from home controller";
            return View();
        }


        public ActionResult About()
        {
            ViewBag.Message = "This ....";
            return View();
        }
    }
}
