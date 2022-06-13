using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Linq;

namespace Closely.Pages
{
    public class RoomModel : PageModel
    {
        public string Message = string.Empty;
        public string sharedlink = "https://localhost:44354/Room?link=";
        private string symbols = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
        private Random r = new Random();
        public void OnPost(string movie_link)
        {
            if (movie_link.Contains("www.youtube.com/watch?v="))
            {
                Message = movie_link.Replace("watch?v=", "embed/");
                Message += "?controls=0&enablejsapi=1";
                GetRandomChar();
            }
            else
            {
                Message = "Incorrect link!";
            }
        }
        public void OnGet(string link)
        {
            if (link != null)
            {
                if (link.Split("?link=").Last() == string.Empty)
                    GetRandomChar();
                else
                    sharedlink += link.Split("?link=").Last();
            }
        }
        private string GetRandomChar()
        {
            int index = 0;
            for (int i = 0; i < 10; i++)
            {
                index = r.Next(symbols.Length);
                sharedlink += symbols[index];
            }
            return sharedlink;
        }
    }
}
