using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;
using System.Web;

namespace MVCProject.Extensions
{
    public static class ClaimsExtensions
    {
        public static Claim FindClaim(this IPrincipal user, string claimType)
        {
            if (user == null) throw new ArgumentNullException(nameof(user));
            if (string.IsNullOrEmpty(claimType)) throw new ArgumentNullException(nameof(claimType));

            var claimsPrincipal = user as ClaimsPrincipal;
            return claimsPrincipal?.FindFirst(claimType);
        }

        public static string GetEmail(this IPrincipal user)
        {
            if (user == null) throw new ArgumentNullException(nameof(user));
            return FindClaim(user, ClaimTypes.Email)?.Value;
        }

        public static string GetSurname(this IPrincipal user)
        {
            if (user == null) throw new ArgumentNullException(nameof(user));
            return FindClaim(user, ClaimTypes.Surname)?.Value;
        }

        public static int? GetUserId(this IPrincipal user)
        {
            if (user == null) throw new ArgumentNullException(nameof(user));

            string value = FindClaim(user, ClaimTypes.Sid)?.Value;
            if (string.IsNullOrEmpty(value)) return default(int?);

            int result;
            return int.TryParse(value, out result) ? result : default(int?);
        }

        static string GetUserEmail(this ClaimsIdentity identity)
        {
            return identity.Claims?.FirstOrDefault(c => c.Type == "WebApplication.Models.RegisterViewModel.Email")?.Value;
        }

        public static string GetUserEmail(this IIdentity identity)
        {
            var claimsIdentity = identity as ClaimsIdentity;
            return claimsIdentity != null ? GetUserEmail(claimsIdentity) : "";
        }

        static string GetUserNameIdentifier(this ClaimsIdentity identity)
        {
            return identity.Claims?.FirstOrDefault(c => c.Type == "WebApplication.Models.RegisterViewModel.NameIdentifier")?.Value;
        }

        public static string GetUserNameIdentifier(this IIdentity identity)
        {
            var claimsIdentity = identity as ClaimsIdentity;
            return claimsIdentity != null ? GetUserNameIdentifier(claimsIdentity) : "";
        }
    }
}