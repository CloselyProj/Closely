using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Closely.Pages
{
    public class RoomModel : PageModel
    {
        public string Message = string.Empty;
        public void OnPost(string movie_link)
        {
            if(movie_link.Contains("watch?v="))
            {
                Message = movie_link.Replace("watch?v=", "embed/");
                Message += "?controls=0";
            }
        }
    }
}
