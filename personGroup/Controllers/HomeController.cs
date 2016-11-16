using Microsoft.ProjectOxford.Face;
using Newtonsoft.Json;
using personGroup.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web;
using System.Web.Configuration;
using System.Web.Mvc;

namespace personGroup.Controllers
{
    public class HomeController : Controller
    {
        FaceServiceClient client = new FaceServiceClient(WebConfigurationManager.AppSettings["SubscriptionKey"]);

        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";

            return View();
        }

        [HttpPost]
        public async Task<JsonResult> Upload()
        {
            try
            {
                if (Request.Files.Count != 2)
                {
                    return Json(new { error = "Error: I need two photos. Not more, not less. Two." });
                }

                HttpPostedFileBase file1 = Request.Files[0];
                HttpPostedFileBase file2 = Request.Files[1];

                if (file1.ContentLength == 0 || file2.ContentLength == 0)
                {
                    return Json(new { error = "Error: It looks like the photo upload din't work..." });
                }

                var faces1 = await client.DetectAsync(file1.InputStream);
                var faces2 = await client.DetectAsync(file2.InputStream);

                if (faces1 == null || faces2 == null)
                {
                    return Json(new { error = "Error: It looks like we can't detect faces in one of these photos..." });
                }
                if (faces1.Count() == 0 || faces2.Count() == 0)
                {
                    return Json(new { error = "Error: It looks like we can't detect faces in one of these photos..." });
                }
                if (faces1.Count() > 1 || faces2.Count() > 1)
                {
                    return Json(new { error = "Error: Each photo must have only one face. Nothing more, nothing less..." });
                }
                var res = await client.VerifyAsync(faces1[0].FaceId, faces2[0].FaceId);
                double score = 0;
                if (res.IsIdentical)
                    score = 100;
                else
                {
                    score = Math.Round((res.Confidence / 0.5) * 100);
                }


                return Json(new { error = "", result = score });
            }
            catch (Exception ex)
            {
                return Json(new { error = "Hmmm... Something unexpected happened. Please come back later." });
            }
        }


        [HttpPost]
        public async Task<JsonResult> Test(string name)
        {
            try
            {


                return Json(new { error = "", result = "wangjin" });
            }
            catch (Exception ex)
            {
                return Json(new { error = "Hmmm... Something unexpected happened. Please come back later." });
            }
        }


        [HttpPost]
        public async Task<JsonResult> AddPersonFaceLinkAsync(string name, string imgUrl)
        {
            try
            {
                var result = await client.AddPersonFaceAsync("testgroup", Guid.NewGuid(), imgUrl, name);
                return Json(new { error = "", result = result });
            }
            catch (Exception ex)
            {
                return Json(new { error = "Hmmm... Something unexpected happened. Please come back later." });
            }
        }

        [HttpPost]
        public async Task<JsonResult> AddPersonFaceStreamAsync(string name, Stream imageStream)
        {
            try
            {
                var result = await client.AddPersonFaceAsync("testgroup", Guid.NewGuid(), imageStream, name);
                return Json(new { error = "", result = result });
            }
            catch (Exception ex)
            {
                return Json(new { error = "Hmmm... Something unexpected happened. Please come back later." });
            }
        }

        [HttpPost]
        public async Task<JsonResult> IdentifyLinkAsync(string imageUrl)
        {
            MemoryStream memstream = new MemoryStream();
            try
            { 
                ImageUrlBodyEntity entity;
                Request.InputStream.Position = 0;
                Request.InputStream.CopyTo(memstream);
                memstream.Position = 0;
                using (StreamReader reader = new StreamReader(memstream))
                {
                    var text = reader.ReadToEnd();
                    entity = JsonConvert.DeserializeObject<ImageUrlBodyEntity>(text);
                }

                WebRequest req = WebRequest.Create(entity.ImageUrl);
                WebResponse response = req.GetResponse();
                Stream stream = response.GetResponseStream();

                //var result1 = await client.AddPersonFaceAsync("testgroup", Guid.NewGuid(), stream, "习近平");

                var faces1 = await client.DetectAsync(stream);
                var faceIds = new Guid[1];
                faceIds[0] = faces1[0].FaceId;
                var result = await client.IdentifyAsync("testgroup", faceIds, 1);
                if (result.Count() <= 0 || result[0].Candidates.Count() == 0) {
                    return Json(new { error = "we can not identify your photo because of no memory!", result = result });
                }
                return Json(new { error = "", result = result });
            }
            catch (Exception ex)
            {
                return Json(new { error = "Hmmm... Something unexpected happened. Please come back later." });
            }
            finally
            {
                memstream.Dispose();
            }
        }

        [HttpPost]
        public async Task<JsonResult> IdentifyAsync()
        {
            try
            {
                HttpPostedFileBase file1 = Request.Files[0];
                var faces1 = await client.DetectAsync(file1.InputStream);
                var faceIds = new Guid[1];
                faceIds[0] = faces1[0].FaceId;
                var result = await client.IdentifyAsync("testgroup", faceIds, 1);
                if (result.Count() <= 0 || result[0].Candidates.Count() == 0)
                {
                    return Json(new { error = "we can not identify your photo because of you never trained your Person Group with person!", result = result });
                }
                return Json(new { error = "", result = result });
            }
            catch (Exception ex)
            {
                return Json(new { error = "Hmmm... Something unexpected happened. Please come back later." });
            }
        }

        [HttpGet]
        public async Task<JsonResult> GetPerson(string personId)
        {
            try
            {
                var result = await client.GetPersonAsync("testgroup", new Guid(personId));
                return Json(new { error = "", result = result }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { error = "Hmmm... Something unexpected happened. Please come back later." }, JsonRequestBehavior.AllowGet);
            }
        }

    }
}
