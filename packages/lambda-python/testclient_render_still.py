import os

from picus_lambda import RenderStillParams, Privacy, ValidStillImageFormats
from picus_lambda import PicusClient
from dotenv import load_dotenv


load_dotenv()

# Load env variables
PICUS_APP_REGION = os.getenv('PICUS_APP_REGION')
if not PICUS_APP_REGION:
    raise Exception("PICUS_APP_REGION is not set")

PICUS_APP_FUNCTION_NAME = os.getenv('PICUS_APP_FUNCTION_NAME')
if not PICUS_APP_FUNCTION_NAME:
    raise Exception("PICUS_APP_FUNCTION_NAME is not set")

PICUS_APP_SERVE_URL = os.getenv('PICUS_APP_SERVE_URL')
if not PICUS_APP_SERVE_URL:
    raise Exception("PICUS_APP_SERVE_URL is not set")

# Construct client
client = PicusClient(region=PICUS_APP_REGION,
                        serve_url=PICUS_APP_SERVE_URL,
                        function_name=PICUS_APP_FUNCTION_NAME)

# Set render still request
render_params = RenderStillParams(
    composition="still-helloworld",
    privacy=Privacy.PUBLIC,
    image_format=ValidStillImageFormats.JPEG,
    input_props={
        'message': 'Hello from props!'
    },
)

render_response = client.render_still_on_lambda(render_params)
if render_response:
    # Execute render request
    print("Render ID:", render_response.render_id)
    print("Bucket name:", render_response.bucket_name)
    print("Render done! File at ", render_response.url)
    print("Cost Info: ", render_response.estimated_price)
else:
    print("Render failed!")
    # exit 1
    exit(1)
