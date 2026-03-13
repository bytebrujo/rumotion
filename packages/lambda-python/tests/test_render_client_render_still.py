from unittest import TestCase

from picus_lambda.models import RenderStillParams
from picus_lambda.picusclient import PicusClient


class TestPicusClient(TestCase):
    def test_picus_construct_request(self):
        client = PicusClient(
            region="us-east-1", serve_url="testbed", function_name="picus-render"
        )
        render_still_params = RenderStillParams(
            composition="still-helloworld",
            input_props={'message': 'Hello from props!'},
        )

        self.assertEqual(client.region, "us-east-1")
        self.assertIsNotNone(render_still_params)
        self.assertIsNotNone(render_still_params.input_props)
        print(
            client.construct_render_request(
                render_params=render_still_params, render_type='still'
            )
        )
