var builder = DistributedApplication.CreateBuilder(args);

var offersService = builder.AddProject<Projects.offer_service>("offersapi")
    .WithExternalHttpEndpoints();

builder.AddNpmApp("salestools", "../lion-rescue-sales-tools")
    .WithReference(offersService)
    .WaitFor(offersService)
    .WithHttpEndpoint(env: "PORT")
    .WithExternalHttpEndpoints()
    .PublishAsDockerFile();

builder.Build().Run();
