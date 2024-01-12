using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace WebApplication1.Controllers
{
    public class ValuesController : ApiController
    {
      
        public HttpResponseMessage Get()
        {
            var val = new {key = "value1", key2 = "value2"};
            return Request.CreateResponse(HttpStatusCode.OK, val);
        }

       
        public string Get(int id)
        {
            return "value";
        }

        public void Post([FromBody] string value)
        {
        }

       
        public void Put(int id, [FromBody] string value)
        {
        }

        public void Delete(int id)
        {
        }
    }
}
