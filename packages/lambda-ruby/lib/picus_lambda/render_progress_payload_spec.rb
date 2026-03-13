require_relative 'sdk'
require_relative 's3_output_provider'
require_relative 'render_progress_payload'

require 'json'

# Sample data
render_id = "abcdef"
bucket_name = "picus-render"

# Call get_render_progress_payload with sample data
payload = get_render_progress_payload(
  render_id: render_id,
  bucket_name: bucket_name,
  s3_output_provider: PicusLambda::S3OutputProvider.new(
    access_key_id: 'accessKeyId',
    endpoint: 'https://s3.us-east-1.amazonaws.com',
    region: 'us-east-1',
    secret_access_key: 'secretAccessKey'
  )
)

# Print as JSON
puts JSON.generate(payload)
