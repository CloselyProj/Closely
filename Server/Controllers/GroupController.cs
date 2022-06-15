using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GroupController : ControllerBase
    {
        private readonly ILogger<GroupController> _logger;

        public GroupController(ILogger<GroupController> logger)
        {
            _logger = logger;
        }

        [HttpGet("SetLink")]
        public string LinkSet(string videolink)
        {
            Group.Link = videolink;
            return Group.Link;
        }

        [HttpGet("GetLink")]
        public string LinkGet()
        {
            return Group.Link;
        }
    }
}
