from unittest import TestCase

from picus_lambda.models import RenderMediaParams, ShouldDownload, Webhook
from picus_lambda.picusclient import PicusClient
from picus_lambda.exception import PicusInvalidArgumentException

class TestPicusClient(TestCase):
    def test_picus_construct_request(self):
        client = PicusClient(
            region="us-east-1", serve_url="testbed", function_name="picus-render"
        )
        render_params = RenderMediaParams(
            composition="react-svg",
            input_props={'hi': 'there'},
            metadata={"Author": "Lunar"},
            download_behavior=ShouldDownload(type="download", fileName="hi"),
            webhook=Webhook(
                url="https://example.com", secret="abc", customData=dict(hi="there")
            ),
        )

        self.assertEqual(client.region, "us-east-1")
        self.assertIsNotNone(render_params)
        self.assertIsNotNone(render_params.input_props)
        print(
            client.construct_render_request(
                render_params=render_params, render_type="video-or-audio"
            )
        )

    def test_picus_construct_request_illegal_argument(self):
       with self.assertRaises(PicusInvalidArgumentException):
        client = PicusClient(
            region="us-east-1", serve_url="", function_name=""
        )
