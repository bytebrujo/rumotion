from unittest import TestCase

from picus_lambda.picusclient import PicusClient, CustomCredentials


class TestPicusClient(TestCase):
    def test_picusprogress_construct_request(self):
        client = PicusClient(
            region="us-east-1", serve_url="testbed", function_name="picus-render"
        )

        print(
            client.construct_render_progress_request(
                render_id="abcdef",
                bucket_name="picus-render",
                s3_output_provider=CustomCredentials(
                    endpoint="https://s3.us-east-1.amazonaws.com",
                    access_key_id="accessKeyId",
                    secret_access_key="secretAccessKey",
                    region="us-east-1",
                ),
            )
        )
