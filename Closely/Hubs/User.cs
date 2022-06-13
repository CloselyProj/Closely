﻿using Microsoft.AspNetCore.SignalR;
using System;
using System.Threading.Tasks;

namespace Closely.Hubs
{
    public class User : Hub
    {
        public async Task Enter(string group)
        {
            if (String.IsNullOrEmpty(group))
            {
                await Clients.Caller.SendAsync("Notify", "Для входа в чат введите логин");
            }
            else
            {
                await Groups.AddToGroupAsync(Context.ConnectionId, group);
            }
        }
        public async Task Send(string message, string group)
        {
            await Clients.Group(group).SendAsync("Receive", message, group);
        }
    }
}
