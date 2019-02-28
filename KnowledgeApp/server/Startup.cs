using System.IO;
using System.Collections.Generic;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using DotNetify;
using Microsoft.AspNetCore.Mvc;

namespace KnowledgeApp
{
  public class Startup
  {
    public void ConfigureServices(IServiceCollection services)
    {
        services.AddCors();
        services.AddMemoryCache();
        services.AddSignalR();
        services.AddDotNetify();
        services.AddMvc()
            .SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
    }

    public void Configure(IApplicationBuilder app)
    {
      app.UseCors(builder => builder
        .AllowAnyMethod()
        .AllowAnyHeader()
        .WithOrigins("http://localhost:3000")
        .AllowCredentials());

      app.UseWebSockets();
      app.UseSignalR(routes => routes.MapDotNetifyHub());
      app.UseDotNetify();
      app.UseMvc();
      app.Run(async (context) =>
      {
        await context.Response.WriteAsync("Hello World!");
      });
    }
  }
}