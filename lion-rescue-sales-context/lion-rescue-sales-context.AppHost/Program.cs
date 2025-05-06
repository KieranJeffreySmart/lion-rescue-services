var builder = DistributedApplication.CreateBuilder(args);

var postgres = builder.AddPostgres("postgres");
var postgresdb = postgres.AddDatabase("postgresdb");

var offersService = builder.AddProject<Projects.offer_service>("offersapi")
    .WithExternalHttpEndpoints()
    .WithReference(postgresdb);

builder.AddNpmApp("salestools", "../lion-rescue-sales-tools")
    .WithReference(offersService)
    .WaitFor(offersService)
    .WithHttpEndpoint(env: "PORT")
    .WithExternalHttpEndpoints()
    .PublishAsDockerFile();

builder.Build().Run();
