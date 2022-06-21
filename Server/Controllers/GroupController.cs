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
        public string LinkSet(string group, string videolink)
        {
            Group.groups.Add(group, videolink);
            return videolink;
        }

        [HttpGet("GetLink")]
        public string LinkGet(string group)
        {
            return Group.groups.Where(x => x.Key == group).First().Value;
        }
        [HttpGet("SetUserGroupName")]
        public void SetUserGroupName(string group, string name)
        {
            string names = string.Empty;
            if (Group.UserGroupName.ContainsKey(group))
            {
                if(names == string.Empty)
                {
                    names = Group.UserGroupName[group];
                }
                else
                {
                    names += $"\n{Group.UserGroupName[group]}";
                }
                Group.UserGroupName.Add(group, names);
            }
            else { Group.UserGroupName.Add(group, name); }
        }

        [HttpGet("GetUserGroupName")]
        public List<string> GetUserGroupNames(string group)
        {
            List<string> names = new List<string>();
            foreach (var item in Group.UserGroupName.Where(x=>x.Key==group).ToString().Split("\n"))
            {
                names.Add(item);
            }
            return names;
        }
    }
}
