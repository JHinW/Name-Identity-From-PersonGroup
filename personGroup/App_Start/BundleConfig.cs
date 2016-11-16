using System.Web;
using System.Web.Optimization;

namespace personGroup
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {


            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/node_modules/core-js/client/shim.min.js",
                        "~/node_modules/zone.js/dist/zone.js",
                        "~/node_modules/reflect-metadata/Reflect.js",
                        "~/node_modules/systemjs/dist/system.src.js",
                        "~/Scripts/systemjs.config.js",
                        "~/Scripts/app.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/wwwroot/css/styles.css"));
        }
    }
}
