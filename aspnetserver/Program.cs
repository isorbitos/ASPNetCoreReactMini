using aspnetserver.Data;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors();

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(swagerGemOptions =>
{
    swagerGemOptions.SwaggerDoc("v1", new OpenApiInfo {Title = "ASPNet - React simple API", Version = "v1"});
});

var app = builder.Build();

// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
app.UseSwagger();
app.UseSwaggerUI(swaggerUIOptions =>
{
    swaggerUIOptions.DocumentTitle = "ASP.NET React app";
    swaggerUIOptions.SwaggerEndpoint("/swagger/v1/swagger.json", "Wep api serving simple post model.");
    swaggerUIOptions.RoutePrefix = string.Empty;
});
//}

app.UseHttpsRedirection();
app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000", "https://polite-hill-074d7d303.1.azurestaticapps.net"));

app.MapGet("/get-all-posts",async ()=> await PostRepository.GetPostAsync())
    .WithTags("Post Endpoints");

app.MapGet("/get-post-by-id/{postId}", async (int postId) =>
{
    Post post = await PostRepository.GetPostByIdAsync(postId);
    if(post != null)
    {
        return Results.Ok(post);
    }
    else
    {
        return Results.BadRequest();
    }
}).WithTags("Post Endpoints");

app.MapPost("/create-post", async (Post post) =>
{
    bool createSuccessful = await PostRepository.CreatePostAsync(post);
    if (createSuccessful)
    {
        return Results.Ok("Create successful.");
    }
    else
    {
        return Results.BadRequest();
    }
}).WithTags("Post Endpoints");

app.MapPut("/update-post", async (Post post) =>
{
    bool updateSuccessful = await PostRepository.UpdatePostAsync(post);
    if (updateSuccessful)
    {
        return Results.Ok("Update successful.");
    }
    else
    {
        return Results.BadRequest();
    }
}).WithTags("Post Endpoints");

app.MapDelete("/delete-post-by-id/{postId}", async (int postId) =>
{
    bool deleteSuccessful = await PostRepository.DeletePostAsync(postId);
    if (deleteSuccessful)
    {
        return Results.Ok("Delete successful.");
    }
    else
    {
        return Results.BadRequest();
    }
}).WithTags("Post Endpoints");

app.Run();

