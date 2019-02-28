using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace KnowledgeApp.Controllers
{
    public class LogInController : Controller
    {
        [Route("LogIn/Auth")]
        [HttpPost]
        [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult Auth([FromForm] string username, [FromForm] string password) {
            if (username == "Alma" && password == "Torta")
            {
                return Ok("Successfully found user!");
            }
            return NotFound();
        }
    }
}