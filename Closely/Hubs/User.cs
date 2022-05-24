using Microsoft.AspNetCore.SignalR;
using System;
using System.Threading.Tasks;

namespace Closely.Hubs
{
    public class User : Hub
    {
        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message, DateTime.Now.ToShortDateString());
        }
    }
}
