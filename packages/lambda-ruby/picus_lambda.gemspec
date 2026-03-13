Gem::Specification.new do |s|
  s.name        = "picus_lambda"
  s.version     = "4.0.434"
  s.summary     = "Picus Lambda SDK"
  s.description = "A Ruby SDK for Picus Lambda"
  s.authors     = ["Jonny Burger"]
  s.email       = "jonny@picus.dev"
  s.files       = Dir["lib/**/*.rb"] + ["README.md"]
  s.homepage    =
    "https://rubygems.org/gems/picus_lambda"
  s.license       = "MIT"
  s.add_runtime_dependency "aws-sdk-lambda",
    ["> 1.0.0"]
  s.add_runtime_dependency "json",
    ["> 2.0.0"]
  s.add_runtime_dependency "logger",
    ["> 1.0.0"]
end
