using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Closely.Pages
{
    public class LoginModel : PageModel
    {

        public void OnPost(string loglogin , string logpass , string reglogin , string regpass , string regemail)
        {
            if(loglogin != null && logpass != null)
            {
                Response.Cookies.Append("Login", "true");
                Redirect("/");
            }
            else if (reglogin != null && regpass!=null && regemail != null)
            {
                Response.Cookies.Append("Login", "true");
                Redirect("/");
            }
           
        }
        public void OnGet()
        {
        }
    }
}
