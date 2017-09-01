using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using ToDoListWebAPI.Models;

namespace ToDoListWebAPI.Controllers
{
    /// <summary>
    /// This class is used to handle the API methods for DB operations
    /// using Entity Framework
    /// </summary>
    public class ItemAPIController : ApiController
    {
        private ToDoListDBEntities db = new ToDoListDBEntities();

        // GET: api/ItemAPI
        public IQueryable<tblTask> GettblTasks()
        {
            return db.tblTasks;
        }

        // GET: api/ItemAPI/5
        [ResponseType(typeof(tblTask))]
        public IHttpActionResult GettblTask(int id)
        {
            tblTask tblTask = db.tblTasks.Find(id);
            if (tblTask == null)
            {
                return NotFound();
            }

            return Ok(tblTask);
        }

        // PUT: api/ItemAPI/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PuttblTask(int id, tblTask tblTask)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tblTask.Id)
            {
                return BadRequest();
            }

            db.Entry(tblTask).State = EntityState.Modified;

            try
            {
                tblTask task = db.tblTasks.Find(id);
                task.sText = tblTask.sText;
                task.sPriority = tblTask.sPriority;
                task.dtDueDate = tblTask.dtDueDate;
                task.bComplete = tblTask.bComplete;
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!tblTaskExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/ItemAPI
        [ResponseType(typeof(tblTask))]
        public IHttpActionResult PosttblTask(tblTask tblTask)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.tblTasks.Add(tblTask);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = tblTask.Id }, tblTask);
        }

        // DELETE: api/ItemAPI/5
        [ResponseType(typeof(tblTask))]
        public IHttpActionResult DeletetblTask(int id)
        {
            tblTask tblTask = db.tblTasks.Find(id);
            if (tblTask == null)
            {
                return NotFound();
            }

            db.tblTasks.Remove(tblTask);
            db.SaveChanges();

            return Ok(tblTask);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool tblTaskExists(int id)
        {
            return db.tblTasks.Count(e => e.Id == id) > 0;
        }
    }
}