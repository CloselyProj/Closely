using Microsoft.AspNetCore.SignalR;
using System;
using System.Threading.Tasks;

namespace Closely.Hubs
{
    public class User : Hub
    {
        public async Task SendMessage(string message)
        {
            await Clients.All.SendAsync("SendSimpleMessage", message, DateTime.Now.ToShortDateString());
        }
    }
}
