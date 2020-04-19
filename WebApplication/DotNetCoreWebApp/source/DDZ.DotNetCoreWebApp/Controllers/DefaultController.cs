using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DDZ.DotNetCoreWebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DefaultController : ControllerBase
    {
        /// <summary>
        /// 获取服务器时间
        /// 匹配：api/Default/GetDateTime
        /// </summary>
        /// <returns></returns>
        [HttpGet("GetDateTime")]
        public DateTime GetDateTime()
        {
            return DateTime.Now;
        }

        /// <summary>
        /// POST JSON 格式数据测试
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost("PostJsonTest1")]
        public string PostJsonTest1([FromBody]EmptyStringModel model)
        {
            return $"POST JSON测试：{JsonSerializer.Serialize(model)}";
        }

        /// <summary>
        /// POST Form 格式数据测试
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost("PostFormDataTest1")]
        public string PostFormDataTest1([FromForm]EmptyStringModel model)
        {
            return $"POST FormData测试：{JsonSerializer.Serialize(model)}";
        }
    }

    public class EmptyStringModel
    {
        //[DisplayFormat(ConvertEmptyStringToNull = false)]
        public string Name { get; set; }

        public int Age { get; set; }
    }
}