require 'picus_lambda/sdk'
require 'picus_lambda/render_still_on_lambda_payload'

client = PicusLambda::Client.new(
  region: ENV.fetch('PICUS_APP_REGION'),
)  

function_name = ENV.fetch('PICUS_APP_FUNCTION_NAME')

payload = get_render_still_on_lambda_payload(
  composition: "still-helloworld",
  download_behavior: {
    type: "play-in-browser",
  },
  input_props: {
    message: "Hello from props!",
  }
)

res = client.render_still_on_lambda(function_name, payload)
puts res
