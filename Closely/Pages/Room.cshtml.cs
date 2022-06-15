using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

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
                SendLink();
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

                Message = GetLink().Result;
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
        async private void SendLink()
        {
            var group = sharedlink.Split("?link=").Last();
            WebRequest request = WebRequest.Create($"http://closely-001-site1.etempurl.com/Group/SetLink?group={group}&videolink={Message}");
            WebResponse response = await request.GetResponseAsync();
            using (Stream stream = response.GetResponseStream())
            {
                using (StreamReader reader = new StreamReader(stream))
                {
                    Console.WriteLine(reader.ReadToEnd());
                }
            }
            response.Close();
        }
        async private Task<string> GetLink()
        {
            var group = sharedlink.Split("?link=").Last();
            var link = string.Empty;
            WebRequest request = WebRequest.Create($"http://closely-001-site1.etempurl.com/Group/GetLink?group={group}");
            WebResponse response = await request.GetResponseAsync();
            using (Stream stream = response.GetResponseStream())
            {
                using (StreamReader reader = new StreamReader(stream))
                {
                    link = reader.ReadToEnd();
                }
            }
            response.Close();
            return link;
        }
    }
}
