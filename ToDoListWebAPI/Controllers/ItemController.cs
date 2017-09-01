using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ToDoListWebAPI.Controllers
{
    public class ItemController : Controller
    {
        // GET: Item
        public ActionResult Task()
        {
            return View();
        }
    }
}